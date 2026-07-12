import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import apiData from "../../../api/apidata";
import axios from "axios";

interface Shows {
  id: string;
  name:string
  prem_Price: number;
  reg_Price: number;
showDate:string
showName:string
showStartTime:string
showEndTime:string
total_seat:number
}

const AllShow = () => {
    const [shows, setShows] = useState<Shows[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchTheatres = async () => {
        try {
            const res = await apiData.get("/admin/show-list");
            if (res.data.success) {
                setShows(res.data.data);
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
            {shows.length === 0 ? (
                <Typography>No Theatre Found.</Typography>
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
                            }}
                        >
                            <Typography variant="h6" sx={{fontWeight:"bold"}}>
                                {show.showName}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                                <strong>Regular Price:</strong> {show.reg_Price}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                                <strong>Premium Price:</strong> {show.prem_Price}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                                <strong>Show Date:</strong> {show.showDate}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                                <strong>Show Start Time:</strong> {show.showStartTime}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                                <strong>Show End Time:</strong> {show.showEndTime}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                                <strong>Total Seat:</strong> {show.total_seat}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default AllShow;