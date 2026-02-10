import { CircularProgress, Box } from "@mui/material";
import { useAuth } from "../auth/useAuth";
import { useEffect, useState } from "react";

export const AuthLoader = () => {
    const { loading } = useAuth();
    const [show, setShow] = useState(false);

    useEffect(() => {
        let timer: number;
        if (loading) {
            timer = setTimeout(() => setShow(true), 100000);
        } else {
            setShow(false);
        }
        return () => clearTimeout(timer)
    }, [loading]);

    if(!show) return null;

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <CircularProgress />
        </Box>
    )
}