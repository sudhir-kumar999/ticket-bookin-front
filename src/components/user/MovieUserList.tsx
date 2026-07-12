import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import apiData from "../../../api/apidata";
import axios from "axios";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
interface Movie {
  id: number;
  title: string;
  poster: string;
  releaseDate: string;
  rating: number;
  overview: string;
}

const MovieUserList = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate=useNavigate();
    const fetchTheatres = async () => {
        try {
            setLoading(true);
            const res = await apiData.get("/user/movie-list");
            if (res.data.success) {
                setMovies(res.data.data);
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
        fetchTheatres();
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
    return (
        <Box sx={{ p: 4 }}>
            <Typography
                variant="h4"
                sx={{
                    mb: 3,
                    fontWeight: "bold",
                }}
            >
        Movie List
            </Typography>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            {movies.length === 0 ? (
                <Typography>No Movie Found.</Typography>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <Grid container spacing={3}>
                        {movies.map((movie) => (
                            <Grid
                                key={movie.id}
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
                                            movie.poster
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
                                            {movie.title}
                                        </Typography>
                                        <Typography variant="body2">
                                          🌟 {movie.rating}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                          Release : {movie.releaseDate}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            onClick={() => navigate(`/movies/${movie.id}`)}
                                        >
                                          Book Ticket
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Box>
    );
};

export default MovieUserList;