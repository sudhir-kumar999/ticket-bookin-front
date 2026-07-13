import { useEffect, useState } from "react";
import axios from "axios";
import apiData from "../../../api/apidata";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import MovieIcon from "@mui/icons-material/Movie";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PeopleIcon from "@mui/icons-material/People";
import WeekendIcon from "@mui/icons-material/Weekend";
interface Dashboard {
    totalMovies: number;
    totalTheatres: number;
    totalShows: number;
    totalBookings: number;
    totalCollection: number;
    totalUsers: number;
}

const AdminDashboard = () => {
    const [dashboard, setDashboard] = useState<Dashboard>({
        totalMovies: 0,
        totalTheatres: 0,
        totalShows: 0,
        totalBookings: 0,
        totalCollection: 0,
        totalUsers: 0,
    });

    const [loading, setLoading] = useState(false);

    const fetchDashboard = async () => {
        setLoading(true);
        try {
            const res = await apiData.get("/admin/dashboard");
            if (res.data.success) {
                setDashboard(res.data.data);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(
                    err.response?.data?.message || "Failed to load dashboard"
                );
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
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

    const cards = [
        {
            title: "Total Movies",
            value: dashboard.totalMovies,
            icon: <MovieIcon fontSize="large" />,
        },
        {
            title: "Total Theatres",
            value: dashboard.totalTheatres,
            icon: <TheaterComedyIcon  fontSize="large" />,
        },
        {
            title: "Total Shows",
            value: dashboard.totalShows,
            icon: <WeekendIcon fontSize="large" />,
        },
        {
            title: "Total Bookings",
            value: dashboard.totalBookings,
            icon: <ConfirmationNumberIcon fontSize="large" />,
        },
        {
            title: "Total Collection",
            value: `₹${dashboard.totalCollection}`,
            icon: <CurrencyRupeeIcon fontSize="large" />,
        },
        {
            title: "Total Users",
            value: dashboard.totalUsers,
            icon: <PeopleIcon fontSize="large" />,
        },
    ];

    return (
        <Box sx={{ p: 4 }}>
            <Typography
                variant="h4"
                sx={{ fontWeight: "bold", mb: 1 }}
            >
                Admin Dashboard
            </Typography>
            <Typography
                color="text.secondary"
                sx={{ fontWeight: "bold", mb: 4 }}
            >
                All Booking Activity
            </Typography>
            <Grid container spacing={3}>
                {cards.map((card) => (
                    <Grid
                        key={card.title}
                        size={{ xs: 12, sm: 6, md: 4 }}
                    >
                        <Card
                            sx={{
                                borderRadius: 3,
                                height: 170,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <CardContent sx={{ textAlign: "center" }}>
                                {card.icon}
                                <Typography variant="h6" sx={{ mt: 2 }}>
                                    {card.title}
                                </Typography>
                                <Typography
                                    variant="h4"
                                    sx={{ fontWeight: "bold", mt: 1 }}
                                >
                                    {card.value}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AdminDashboard;