import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import apiData from "../../../api/apidata";
import { toast } from "react-toastify";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
}

const SearchMovie = () => {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const handleSearch = async () => {
        if (!query.trim()) return;
        try {
            setLoading(true);
            const res = await apiData.get("/admin/search-movie", {
                params: {
                    query,
                },
            });
            setMovies(res.data.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message);
            }
        } finally {
            setLoading(false);
        }
    };

    async function addMovie(tmdbId:string){
        try {
            if(!tmdbId) return;
            setLoading(true);
            const res=await apiData.post("/admin/add-movie",{tmdbId});
            if(res.data.success){
                toast.success("res.data.message");
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: "bold",
                    mb: 3,
                }}
            >
        Search Movie
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    mb: 4,
                }}
            >
                <TextField
                    fullWidth
                    label="Search Movie"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                    variant="contained"
                    onClick={handleSearch}
                    startIcon={<SearchIcon />}
                >
                    Search
                </Button>
            </Box>
            {loading && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 5,
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
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
                                    movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
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
                                    🌟 {movie.vote_average}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    Release : {movie.release_date}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        flexGrow: 1,
                                    }}
                                >
                                    {movie.overview.length > 120
                                        ? movie.overview.slice(0, 120) + "..."
                                        : movie.overview}
                                </Typography>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    onClick={() => addMovie(String(movie.id))}
                                >
                                    Add Movie
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SearchMovie;