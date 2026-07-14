import axios from "axios";
import apiData from "../../../api/apidata";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
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
    user:User
}
const AllBookings = () => {
    const [booked,setBooked]=useState<Booking[]>([]);
    const[loading,setLoading]=useState(false);
    async function myBooking(){
        try {
            setLoading(true);
            const res = await apiData.get("/admin/all-bookings/");
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
            <Typography variant="h3">All Bookings Data</Typography>
            <Box>
                {booked.length==0 && 
                <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",minHeight:"80vh",gap:2}}>
                    <Typography>
                        No Booking Found
                    </Typography>
                </Box>
                }
                {booked.length>0 && booked.map((ele)=>(
                    <Box key={ele.id}>
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
                                    <strong>User Email:</strong> {ele?.user.email}
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
                            <Box>
                                Active
                            </Box>
                        </Card>
                    </Box>
                ))
                }
            </Box>
        </Box>
    );
};

export default AllBookings;
