import  { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiData from "../../../api/apidata";
import axios from "axios";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
interface Movie {
  id: number;
  title: string;
  poster: string;
  releaseDate: string;
  rating: number;
  overview: string;
}
interface Shows{
    id:string
    prem_Price:number
    reg_Price:number
    showDate:string
    showStartTime:string
    showEndTime:string
    showName:string
    total_seat:number
}
const ShowsList = () => {
    const [shows, setShows] = useState<Shows[]>([]);
    const [theatre,setTheatre]=useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [movie, setMovie] = useState<Movie>();
    const navigate=useNavigate();
  
    const { movieId } = useParams();
    const { theatreId } = useParams();
    const fetchShow = async () => {
        setLoading(true);
        try {
            const res = await apiData.get(
                `/user/movies/${movieId}/theatres/${theatreId}/shows`,
            );
            if (res.data.success) {
                setShows(res.data.data);
                setMovie(res.data.movie);
                setTheatre(res.data.theatre);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Failed to fetch theatres");
                toast.error(err.response?.data?.message);
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchShow();
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return <Box>
        <Grid
            key={movie?.id}
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
        >
            <Card
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
        
            >
                <CardMedia
                    component="img"
                    image={
                        movie?.poster
                            ? `https://image.tmdb.org/t/p/w500${movie.poster}`
                            : "https://via.placeholder.com/500x750?text=No+Image"
                    }
                    sx={{
                        height: 380,
                        objectFit: "cover",
                    }}
                />
                <CardContent
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{fontWeight:"bold"}}
                    >
                        {movie?.title}
                    </Typography>
                    <Typography variant="body2">
                        🌟 {movie?.rating}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
            Release : {movie?.releaseDate}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Box>
            <Box sx={{ p: 4 }}>
                <Typography
                    variant="h4"
                    sx={{
                        mb: 3,
                        fontWeight: "bold",
                    }}
                >
                    Shows List
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                {shows.length === 0 ? (
                    <Typography>No Shows Found.</Typography>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        {shows.map((show) => (
                            <Paper
                                key={show.id}
                                elevation={3}
                                sx={{
                                    p: 3,
                                    borderRadius: 2,
                                    display:"flex"
                                }}
                            >
                                <Paper sx={{display:"flex",flexDirection:"column",flexGrow:3,padding:5}}>
                                    <Typography variant="h6" sx={{fontWeight:"bold"}}>
                                        {show.showName}
                                    </Typography>
                                    <Typography sx={{ mt: 1 }}>
                                        <strong>Longitude:</strong> {theatre}
                                    </Typography>
                                    <Typography sx={{ mt: 1 }}>
                                        <strong>Address:</strong> {show.showDate}
                                    </Typography>
                                    <Typography sx={{ mt: 1 }}>
                                        <strong>Latitude:</strong> {show.showStartTime}
                                    </Typography>
                                    <Typography sx={{ mt: 1 }}>
                                        <strong>Longitude:</strong> {show.showEndTime}
                                    </Typography>
                                    <Typography sx={{ mt: 1 }}>
                                        <strong>Longitude:</strong> {show.prem_Price}
                                    </Typography>
                                    <Typography sx={{ mt: 1 }}>
                                        <strong>Longitude:</strong> {show.reg_Price}
                                    </Typography>
                                </Paper>
                                <Paper sx={{display:"flex",justifyContent:"center",alignItems:"center",flexGrow:2,padding:5}}>
                                    <Button onClick={()=>navigate(`/shows/${show.id}/seats`)}
                                        variant="contained">Select Seat</Button>
                                </Paper>
                            </Paper>
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    </Box>;
};

export default ShowsList;
