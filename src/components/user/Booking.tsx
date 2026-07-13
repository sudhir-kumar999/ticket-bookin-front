import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import apiData from "../../../api/apidata";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
const razor_key = import.meta.env.VITE_RAZORPAY_KEY_ID;
interface Seats {
  id: string;
  heldByMe: boolean;
  price: number;
  row: string;
  seatNumber: string;
  seatType: string;
  status: string;
}
interface Payment{
    razorpay_payment_id:string
    razorpay_order_id:string
    razorpay_signature:string
}
const Booking = () => {
    const {state}=useLocation();
    const navigate=useNavigate();
    const [seatId,setSeatId]=useState<string[]>([]);
    if(!state||!state.seats||state.seats.length==0){
        return (
            <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",minHeight:"90vh",gap:2}}>
                <Typography>No Seat selected</Typography>
                <Button onClick={()=>navigate("/user/movie-list")} variant="contained">Go To Movie List</Button>
            </Box>
        );
    }
    const {seats,amount,showId}=state;
    useEffect(()=>{
        if(state.seats.length){
            const ids=state.seats.map((ele:Seats)=>ele.id);
            setSeatId(ids);
        }
    },[]);
    const verifyPayment = async (paymentDetails: Payment) => {
        const response = await apiData.post("/user/verify-payment",{
            paymentDetails
        });
        if(response.data.success){
            toast.success(response.data.message);
            navigate("/booking/history");
        }
    };
    async function handlePayment(){
        try {
            const res = await apiData.post("/user/booking/confirm", {
                seatId,showId,amount
            });
            if (res.data.success) {
                const order=res.data.order;
                const options={
                    key: razor_key,
                    amount:order.amount,
                    currency:order.currency,
                    order_id:order.id,
                    handler:(response: Payment)=>{
                        verifyPayment(response);
                    }
                };
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const rzp = new (window as any).Razorpay(options);
                rzp.open();
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message);
            } else {
                toast.error("something went wrong");
            }
        }
    }
    return (
        <Box>
            <Box>
                {!seats && <Typography>No seat selected</Typography>}
            </Box>
            <Box>
                {seats?.map((ele:Seats)=>(
                    <Card sx={{display:"flex",padding:5,justifyContent:"space-around"}} key={ele.id}>
                        <Box >
                            <Typography >
                                {ele.seatNumber}
                            </Typography>
                            <Typography >
                                {ele.seatType}
                            </Typography>
                        </Box>
                        <Box >
                            <Typography>
                                {ele.price}
                            </Typography>
                        </Box>
                    </Card>
                ))}
            </Box>
            <Box sx={{display:"flex",justifyContent:"center",marginTop:5}}>
                <Button variant="contained" onClick={handlePayment}>Proceed for Payment ₹{amount}</Button>
            </Box>
        </Box>
    );
};

export default Booking;
