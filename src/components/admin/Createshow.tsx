import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import apiData from "../../../api/apidata";
import axios from "axios";
import { toast } from "react-toastify";

interface Movie {
  id: string;
  title: string;
}

interface Theatre {
  id: string;
  name: string;
}

function Createshow() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [theatres, setTheatres] = useState<Theatre[]>([]);
    const [movieId, setMovieId] = useState("");
    const [theatreId, setTheatreId] = useState("");
    const [name, setName] = useState("");
    const [showDate, setShowDate] = useState("");
    const [showStartTime, setShowStartTime] = useState("");
    const [showEndTime, setShowEndTime] = useState("");
    const [regPrice, setRegPrice] = useState("");
    const [premPrice, setPremPrice] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchMovies();
        fetchTheatres();
    }, []);
    async function fetchMovies() {
        try {
            const res = await apiData.get("/admin/get-movie");
            if (res.data.success) {
                setMovies(res.data.data);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Login failed");
            } else {
                setError("Something went wrong");
            }
        }
    }
    async function fetchTheatres() {
        try {
            const res = await apiData.get("/admin/theatre-list");
            if (res.data.success) {
                setTheatres(res.data.data);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Failed to fetch theatres");
            }
        }
    }
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const res = await apiData.post("/admin/create-show", {
                movieId,
                theatreId,
                name,
                showDate,
                showStartTime,
                showEndTime,
                reg_Price: Number(regPrice),
                prem_Price: Number(premPrice),
            });
            toast.success(res.data.message);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message);
            }
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                mt: 4,
            }}
        >
            <Paper
                sx={{
                    width: 700,
                    p: 4,
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        mb: 3,
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    Create Show
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                    }}
                >
                    <Typography sx={{color:"red"}}>{error}</Typography>
                    <TextField
                        select
                        label="Select Movie"
                        value={movieId}
                        onChange={(e) => setMovieId(e.target.value)}
                        fullWidth
                    >
                        {movies.map((movie) => (
                            <MenuItem key={movie.id} value={movie.id}>
                                {movie.title}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        label="Select Theatre"
                        value={theatreId}
                        onChange={(e) => setTheatreId(e.target.value)}
                        fullWidth
                    >
                        {theatres.map((theatre) => (
                            <MenuItem key={theatre.id} value={theatre.id}>
                                {theatre.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Show Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        type="date"
                        label="Show Date"
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                        value={showDate}
                        onChange={(e) => setShowDate(e.target.value)}
                        fullWidth
                    />
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                        }}
                    >
                        <TextField
                            type="time"
                            label="Start Time"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            value={showStartTime}
                            onChange={(e) => setShowStartTime(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            type="time"
                            label="End Time"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            value={showEndTime}
                            onChange={(e) => setShowEndTime(e.target.value)}
                            fullWidth
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                        }}
                    >
                        <TextField
                            type="number"
                            label="Regular Price"
                            value={regPrice}
                            onChange={(e) => setRegPrice(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            type="number"
                            label="Premium Price"
                            value={premPrice}
                            onChange={(e) => setPremPrice(e.target.value)}
                            fullWidth
                        />
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                    >
                        Create Show
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default Createshow;