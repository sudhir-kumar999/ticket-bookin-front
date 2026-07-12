import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiData from "../../../api/apidata";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import { toast } from "react-toastify";

interface Seats {
  id: string;
  heldByMe: boolean;
  price: number;
  row: string;
  seatNumber: string;
  seatType: string;
  status: string;
}

const SeatList = () => {
    const { showId } = useParams();
    const [loading, setLoading] = useState(true);
    const [seat, setSeat] = useState<Seats[]>([]);
    const fetchSeat = async () => {
        try {
            setLoading(true);
            const res = await apiData.get(`/user/shows/${showId}/seats`);
            if (res.data.success) {
                setSeat(res.data.data);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message);
            } else {
                toast.error("something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSeat();
    }, []);

    async function handleSeatClick(seatId: string) {
        try {
            const res = await apiData.post(`/user/shows/${showId}/toggle-seat`, {
                seatId,
            });
            if (res.data.success) {
                fetchSeat();
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message);
            } else {
                toast.error("something went wrong");
            }
        }
    }
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
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    width: "80vw",
                    backgroundColor: "gray",
                    borderTopLeftRadius: "25px",
                    borderTopRightRadius: "25px",
                    marginBottom: "80px",
                }}
            >
        .
            </Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
        Premium Seats
            </Typography>

            <Grid container spacing={2} sx={{ maxWidth: "70vw" }}>
                {seat
                    .filter((s) => s.seatType === "Premium")
                    .map((ele: Seats) => (
                        <Grid key={ele.id}>
                            <Card
                                sx={{
                                    width: "100px",
                                    p: 2,
                                    backgroundColor:
                                    ele.heldByMe
                                        ? "green"
                                        : ele.status === "booked"
                                            ? "gray"
                                            : ele.status === "held"
                                                ? "yellow"
                                                : "white",
                                    color:
                                    ele.heldByMe || ele.status === "booked"
                                        ? "white"
                                        : "black",
                                    cursor: "pointer",
                                }}
                                onClick={() => handleSeatClick(ele.id)}
                            >
                                <Typography>{ele.seatNumber}</Typography>
                                <Typography>₹ {ele.price}</Typography>
                                <Typography>{ele.status}</Typography>
                            </Card>
                        </Grid>
                    ))}
            </Grid>

            <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Regular Seats
            </Typography>
            {seat.length === 0 ? (
                <Typography>No Movie Found.</Typography>
            ) : (
                <Grid container spacing={2} sx={{ maxWidth: "70vw" }}>
                    {seat
                        .filter((s) => s.seatType === "Regular")
                        .map((ele) => (
                            <Grid key={ele.id}>
                                <Card
                                    sx={{
                                        width: "100px",
                                        p: 2,
                                        backgroundColor:
                                        ele.status === "available"
                                            ? "white"
                                            : ele.status === "booked"
                                                ? "gray"
                                                : "orange",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        handleSeatClick(ele.id);
                                    }}
                                >
                                    <Typography>{ele.seatNumber}</Typography>
                                    <Typography>₹ {ele.price}</Typography>
                                    <Typography>{ele.status}</Typography>
                                </Card>
                            </Grid>
                        ))}
                </Grid>
            )}
            <Box sx={{ "& > :not(style)": { m: 1 } }}>
                <Fab
                    variant="extended"
                    color="primary"
                    sx={{
                        position: "fixed",
                        bottom: 16,
                        right: 16,
                    }}
                >
                    Extended
                </Fab>
            </Box>
        </Box>
    );
};

export default SeatList;
