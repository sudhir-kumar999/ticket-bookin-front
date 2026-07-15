import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiData from "../../../api/apidata";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
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
    const [seat, setSeat] = useState<Seats[]>([]);
    const [amount,setAmount]=useState(0);
    const [seatId,setSeatId]=useState<Seats[]>([]);
    const navigate=useNavigate();

    const fetchSeat = async () => {
        try {
            const res = await apiData.get(`/user/shows/${showId}/seats`);
            if (res.data.success) {
                setSeat(res.data.data);
                const seats=res.data.data;
                const totalAmount=seats.reduce((total:number,seat:Seats)=>{
                    if(seat.heldByMe){
                        return total+seat.price;
                    }
                    return total;
                },0);
                setAmount(totalAmount);
                const heldSeats=seats.filter((ele:Seats) => ele.heldByMe);
                setSeatId(heldSeats);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message);
            } else {
                toast.error("something went wrong");
            }
        }
    };

    useEffect(() => {
        fetchSeat();
    }, []);

    async function handleSeatClick(e: React.MouseEvent<HTMLDivElement>) {
        const target = e.target as HTMLElement;
        const card = target.closest("[data-seat]");
        if (!card) return;
        const seatId = card.getAttribute("data-seat");
        if (!seatId) return;
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
    function handleProceed(){
        navigate("/payment",{
            state:{
                seats:seatId,
                amount,
                showId
            }
        });
    }
    const groupedSeats: Record<string, Seats[]> = {};

    seat.forEach((ele) => {
        if (!groupedSeats[ele.row]) {
            groupedSeats[ele.row] = [];
        }
        groupedSeats[ele.row].push(ele);
    });

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
    Seats
            </Typography>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateRows: `repeat(${Math.min(seat.length, 5)}, 1fr)`,
                    gap: 2,
                }}
            >
                {Object.keys(groupedSeats).map((row) => (
                    <Box key={row} sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
    Row {row}
                        </Typography>
                        <Grid
                            container
                            spacing={2}
                            sx={{ maxWidth: "70vw" }}
                            onClick={handleSeatClick}
                        >
                            {groupedSeats[row].map((ele) => (
                                <Grid key={ele.id}>
                                    <Card
                                        data-seat={ele.id}
                                        sx={{
                                            width: "100px",
                                            p: 2,
                                            backgroundColor: ele.heldByMe
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
                                    >
                                        <Typography>{ele.seatNumber}</Typography>
                                        <Typography>₹ {ele.price}</Typography>
                                        <Typography>{ele.status}</Typography>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ))}
            </Box>
            <Box sx={{ "& > :not(style)": { m: 1 } }}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        position: "fixed",
                        bottom: 16,
                        right: 16,
                    }}
                    disabled={amount<=0}
                    onClick={handleProceed}
                >
                    Proceed To Booking {amount} <ArrowForwardIcon/>
                </Button>
            </Box>
        </Box>
    );
};

export default SeatList;
