import { useState, useEffect } from "react";
import { useNavigate , Link as RouterLink} from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { authService } from "../auth/auth.service";
import { TextField, Button, Typography, Box } from "@mui/material";

const Login = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
            if(user) navigate("/tasks");
        }, [user, navigate] );

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try{
            const data = await authService.login({ email, password});
            setUser(data.user);
            navigate("/tasks");
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth:'100vw',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
            }}
        >
            <Box 
                sx={{
                    maxWidth: 420,
                    width: '100%',
                    p: 4,
                    borderRadius: 3,
                    // glass effect
                    background: 'rgba(15, 32, 39, 0.55)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    // subtle border + shadow
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
                }}
            >
                <Typography 
                    variant="h4"
                    mb={3}
                    textAlign="center"
                    sx={{
                        fontWeight: 600,
                        color: '#e6f4f7',
                        letterSpacing: 0.5,
                    }}
                >
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        // variant="filled"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                        sx={{
                            // input text
                            input: {
                            color: '#e6f4f7',
                            fontWeight: 500,
                            },

                            // label default + focused
                            label: {
                            color: 'rgba(230, 244, 247, 0.65)',
                            '&.Mui-focused': {
                                color: '#7dd3fc',
                            },
                            },

                            '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            transition: 'all 0.2s ease',

                            // subtle inner depth
                            backgroundColor: 'rgba(15, 32, 39, 0.35)',

                            '& fieldset': {
                                borderColor: 'rgba(230, 244, 247, 0.25)',
                            },

                            '&:hover fieldset': {
                                borderColor: '#7dd3fc',
                            },

                            '&.Mui-focused fieldset': {
                                borderColor: '#38bdf8',
                                boxShadow: '0 0 8px 1px rgba(56, 189, 248, 0.6)', // subtle glow
                            },
                            },
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                        sx={{
                            // input text
                            input: {
                            color: '#e6f4f7',
                            fontWeight: 500,
                            },

                            // label default + focused
                            label: {
                            color: 'rgba(230, 244, 247, 0.65)',
                            '&.Mui-focused': {
                                color: '#7dd3fc',
                            },
                            },

                            '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            transition: 'all 0.2s ease',

                            // subtle inner depth
                            backgroundColor: 'rgba(15, 32, 39, 0.35)',

                            '& fieldset': {
                                borderColor: 'rgba(230, 244, 247, 0.25)',
                            },

                            '&:hover fieldset': {
                                borderColor: '#7dd3fc',
                            },

                            '&.Mui-focused fieldset': {
                                borderColor: '#38bdf8',
                                boxShadow: '0 0 8px 1px rgba(56, 189, 248, 0.6)', // subtle glow
                            },
                            },
                        }}
                    />

                    {error && <Typography color="error" mt={1}>{error}</Typography>}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                        sx={{
                            mt: 2,
                            py: 1.2,
                            fontWeight: 600,
                            textTransform: 'none',
                            color: '#0f2027',
                            background: 'linear-gradient(135deg, #38bdf8, #2dd4bf)',
                            boxShadow: '0 4px 20px rgba(56, 189, 248, 0.35)',
                            '&:hover': {
                            background: 'linear-gradient(135deg, #7dd3fc, #5eead4)',
                            },
                        }}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                    <Box mt={3} pt={1} sx={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <Typography
                            mt={3}
                            textAlign="center"
                            sx={{
                                color: 'rgba(230, 244, 247, 0.75)',
                                fontSize: '0.9rem',
                            }}
                            >
                            New here?{" "}
                            <Typography
                                component={RouterLink}
                                to="/signup"
                                sx={{
                                    color: '#38bdf8',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    ml: 0.5,
                                    transition: '0.2s',
                                    '&:hover': {
                                        color: '#7dd3fc',
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                Sign up
                            </Typography>
                        </Typography>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default Login;