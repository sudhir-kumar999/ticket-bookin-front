import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import apiData from "../../../api/apidata";
import axios from "axios";

interface Theatre {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

const TheatreList = () => {
    const [theatres, setTheatres] = useState<Theatre[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const fetchTheatres = async () => {
        try {
            const res = await apiData.get("/admin/theatre-list");
            if (res.data.success) {
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
                    mt: 10,
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
                            }}
                        >
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
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default TheatreList;