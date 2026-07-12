import { useEffect, useState } from "react";
import apiData from "../../../api/apidata";
import { useNavigate, useParams } from "react-router-dom";
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
interface Theatre {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

const MovieDetaiols = () => {
    const [movie, setMovie] = useState<Movie>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [theatres, setTheatres] = useState<Theatre[]>([]);

    const { movieId } = useParams();
    const navigate=useNavigate();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                setLoading(true);
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                try {
                    const res = await apiData.get(`/user/movies/${movieId}`, {
                        params: {
                            lat,
                            long,
                        },
                    });
                    if (res.data.success) {
                        setMovie(res.data.movie);
                        setTheatres(res.data.data);
                    }
                } catch (err) {
                    if (axios.isAxiosError(err)) {
                        setError(err.response?.data?.message || "Failed to fetch theatres");
                    } else {
                        setError("Something went wrong");
                    }
                } finally {
                    setLoading(false);
                }
            },
            async () => {
                setLoading(true);
                try {
                    const res = await apiData.get(`/user/movies/${movieId}`);
                    if (res.data.success) {
                        setMovie(res.data.movie);
                        setTheatres(res.data.data);
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
            }
        );
    }, [movieId]);
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
    return (
        <div>
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
            <Box sx={{ p: 4 }}>
                <Typography
                    variant="h4"
                    sx={{
                        mb: 3,
                        fontWeight: "bold",
                    }}
                >
                    Theatre List
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                {theatres.length === 0 ? (
                    <Typography>No Theatre Found.</Typography>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        {theatres.map((theatre) => (
                            <Paper
                                key={theatre.id}
                                elevation={3}
                                sx={{
                                    p: 3,
                                    borderRadius: 2,
                                    display:"flex"
                                }}
                            >
                                <Paper sx={{width:"full",display:"flex", flexDirection:"column",flexGrow:3,padding:5}}>
                                    <Typography variant="h6" sx={{fontWeight:"bold"}}>
                                        {theatre.name}
                                    </Typography>
                                    <Typography sx={{ mt: 1 }}>
                                        <strong>Address:</strong> {theatre.address}
                                    </Typography>
                                    <Typography sx={{ mt: 1 }}>
                                        <strong>Latitude:</strong> {theatre.latitude}
                                    </Typography>
                                    <Typography sx={{ mt: 1 }}>
                                        <strong>Longitude:</strong> {theatre.longitude}
                                    </Typography>
                                </Paper>
                                <Paper sx={{display:"flex",justifyContent:"center",alignItems:"center",flexGrow:2,padding:5}}>
                                    <Button variant='contained'
                                        onClick={() =>
                                            navigate(`/movies/${movieId}/theatres/${theatre.id}/shows`)}
                                    >Book Slots</Button>
                                </Paper>
                            </Paper>
                        ))}
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default MovieDetaiols;
