import { createContext, useEffect, useState } from "react";
import apiData from "../../api/apidata";
import { toast } from "react-toastify";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthResponse{
    success:boolean,
    message:string,
    data?:User
}
 
interface AuthContextType {
  user: User | null;
  loading: boolean;
  userLogin: (email: string, password: string) => Promise<AuthResponse>;
  adminLogin: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;

}
 
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({children}:{children:React.ReactNode}){
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    const fetchUser=async()=>{
        try {
            const res=await apiData.get("/get/me");
            if(res.data.success){
                setUser(res.data.data);
            }
        } catch (err) {
            setUser(null);
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message);
            }
        }finally{
            setLoading(false);
        }
    };
    useEffect(()=>{
        fetchUser();
    },[]);

    const userLogin = async (email:string, password:string) => {
        const res = await apiData.post("/user/login", { email, password });
        if (res.data.success){
            setUser(res.data.data);
            await fetchUser();
        }
        return res.data;
    };

    const adminLogin = async (email:string, password:string) => {
        const res = await apiData.post("/admin/login", { email, password });
        if (res.data.success){
            setUser(res.data.data);
            await fetchUser();
        };
        return res.data;
    };

    const logout = async () => {
        await apiData.post("/admin/logout"); 
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, userLogin, adminLogin, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}