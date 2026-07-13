import axios from "axios";
import apiData from "../../../api/apidata";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
interface Seats {
  id: string;
  heldByMe: boolean;
  price: number;
  row: string;
  seatNumber: string;
  seatType: string;
  status: string;
}
interface Shows{
    id:string
    prem_Price:number
    reg_Price:number
    showDate:string
    showStartTime:string
    showEndTime:string
    showName:string
    total_seat:number
    isCancel: boolean;
}
interface Booking{
    createdAt:string
    heldUntil:string
    id:string
    paymentId?:string
    seat:Seats
    show:Shows
    status:string
    paymentStatus:string|null
}
const MyBooking = () => {
    const [booked,setBooked]=useState<Booking[]>([]);
    const[loading,setLoading]=useState(false);
    const navigate=useNavigate();
    async function myBooking(){
        try {
            setLoading(true);
            const res = await apiData.get("/user/booking/history");
            if (res.data.success) {
                setBooked(res.data.data);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message);
            } else {
                toast.error("something went wrong");
            }
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        myBooking();
    },[]);

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
        <Box>
            <Typography variant="h3">My Bookings</Typography>
            <Box>
                {booked.length==0 && 
                <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",minHeight:"80vh",gap:2}}>
                    <Typography>
                        No Booking Found
                    </Typography>
                    <Button variant="contained" onClick={()=>navigate("/user/movie-list")}>Book Now</Button>
                </Box>
                }
                {booked.length>0 && booked.map((ele)=>(
                    <Box>
                        <Card
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                padding: 5,
                                margin: 2,
                            }}
                        >
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <Typography>
                                    <strong>Show Name:</strong> {ele?.show?.showName}
                                </Typography>
                                <Typography>
                                    <strong>Show Date:</strong> {ele.show.showDate}
                                </Typography>
                                <Typography>
                                    <strong>Show Start Time:</strong> {ele.show.showStartTime}
                                </Typography>
                                <Typography>
                                    <strong>Seat Row:</strong> {ele.seat.row}
                                </Typography>
                                <Typography>
                                    <strong>Seat Number:</strong> {ele.seat.seatNumber}
                                </Typography>
                                <Typography>
                                    <strong>Seat Type:</strong> {ele.seat.seatType}
                                </Typography>
                                <Typography>
                                    <strong>Payment Status:</strong>{" "}
                                    <span
                                        style={{
                                            color: ele.paymentStatus === "paid" ? "green" : "red",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {ele.paymentStatus === "paid" ? "Booked" : "Payment Failed"}
                                    </span>
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    fontWeight: "bold",
                                    color: ele.show.isCancel ? "red" : "green",
                                }}
                            >       
                                {ele.show.isCancel ? "Cancelled" : "Active"}
                            </Box>
                        </Card>
                    </Box>
                ))
                }
            </Box>
        </Box>
    );
};

export default MyBooking;
