import { useEffect, useState } from "react";
import axios from "axios";
import apiData from "../../../api/apidata";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MovieIcon from "@mui/icons-material/Movie";

interface DashboardData {
    name: string;
    totalBookings: number;
    totalSpent: number;
    upcomingShows: number;
}

const UserDashboard = () => {
    const [dashboard, setDashboard] = useState<DashboardData>({
        name: "",
        totalBookings: 0,
        totalSpent: 0,
        upcomingShows: 0,
    });

    const [loading, setLoading] = useState(false);

    const fetchDashboard = async () => {
        setLoading(true);
        try {
            const res = await apiData.get("/user/dashboard");

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
            title: "User",
            value: dashboard.name,
            icon: <AccountCircleIcon fontSize="large" />,
        },
        {
            title: "Total Bookings",
            value: dashboard.totalBookings,
            icon: <ConfirmationNumberIcon fontSize="large" />,
        },
        {
            title: "Total Spent",
            value: `₹${dashboard.totalSpent}`,
            icon: <CurrencyRupeeIcon fontSize="large"  />,
        },
        {
            title: "Upcoming Shows",
            value: dashboard.upcomingShows,
            icon: <MovieIcon fontSize="large" />,
        },
    ];

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{fontWeight:"bold"}}>
                Welcome, {dashboard.name} 
            </Typography>
            <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4 }}
            >
                    Your Recent activity.
            </Typography>
            <Grid container spacing={3}>
                {cards.map((card) => (
                    <Grid
                        key={card.title}
                        size={{ xs: 12, sm: 6, md: 3 }}
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
                                    variant="h5"
                                    sx={{ mt: 1,fontWeight:"bold" }}
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

export default UserDashboard;