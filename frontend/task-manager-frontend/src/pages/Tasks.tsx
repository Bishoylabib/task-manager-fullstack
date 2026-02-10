import { useEffect, useState } from "react";
import { 
    Typography,
    Box,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    Checkbox,
    IconButton,
    AppBar,
    Toolbar,
 } from "@mui/material";
import DeleteIcon  from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"
import SaveIcon from "@mui/icons-material/Save";

import { taskService } from "../tasks/tasks.service";
import type { Task } from "../tasks/task.types";
import { authService } from "../auth/auth.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const Tasks = () => {
    const navigate = useNavigate();
    const { user, setUser} = useAuth();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [editingTask, setEditingTask] = useState<number | null>(null);
    const [creating, setCreating] = useState(false);
    const [updatingId, setUpdatingId] = useState<number | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            setLoading(true);
            const data = await taskService.getTasks();
            setTasks(data);
        } catch {
            setError("Failed to load tasks");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        authService.logout();
        setUser(null);
        navigate("/login");
    };

    const handleCreateTask = async() => {
        if(!newTitle.trim()) return;
        try{
            setCreating(true);
            const task = await taskService.createTask({
                title: newTitle,
                description: newDescription
            });
            setTasks((prev) => [...prev, task]);
            setNewTitle("");
            setNewDescription("");
        } catch{
            setError("Failed to create task");
        } finally{
            setCreating(false);
        }
    };

    if (loading) return <Typography>Loading tasks...</Typography>;

    return (
        // <Container maxWidth="lg">
        <Box
            sx={{
                minWidth: "100vw",
                minHeight: "100vh",
                background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pt: 6,
                pb: 6,
            }}
        >
            <AppBar
                position="fixed"
                sx={{
                    background: "rgba(15, 32, 39, 0.7)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    borderBottom: "1px solid rgba(255,255,255,0.2)"
                }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6" sx={{color: "#e6f4f7", fontWeight: 600}}>{user?.fullName} Tasks</Typography>
                    <Button
                        variant="contained"
                        onClick={handleLogout}
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            background: "linear-gradient(135deg, #38bdf8, #2dd4bf)",
                            color: "#0f2027",
                            boxShadow: '0 2px 10px rgba(56, 189, 248, 0.35)',
                            "&:hover": {
                                background: "linear-gradient(135deg, #7dd3fc, #5eead4)"
                            }
                        }}
                    >
                        Sign Out
                    </Button>
                </Toolbar>
            </AppBar>
            <Box 
                sx={{
                    mt: 10,
                    width: '100%',
                    maxWidth: 500,
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
                <Box display="flex" flexDirection="column" gap={2} mb={3}>
                    <TextField
                        label="Task Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        fullWidth
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
                        label="Description"
                        value={newDescription}
                        disabled={creating || !newTitle.trim()}
                        onChange={(e) => setNewDescription(e.target.value)}
                        fullWidth
                        multiline
                        rows={2}
                        sx={{

                            label: {
                            color: 'rgba(230, 244, 247, 0.65)',
                            '&.Mui-focused': {
                                color: '#7dd3fc',
                            },
                            },
                            '& textarea': {
                                color: '#e6f4f7', // fixes black text
                                fontWeight: 500,
                            },

                            '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            transition: 'all 0.2s ease',

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
                    <Button
                        variant="contained"
                        disabled={creating || !newTitle.trim()}
                        onClick={handleCreateTask}
                        sx={{
                            py: 1.2,
                            fontWeight: 600,
                            textTransform: "none",
                            color: "#0f2027",
                            background: "linear-gradient(135deg, #38bdf8, #2dd4bf)",
                            boxShadow: '0 2px 10px rgba(56, 189, 248, 0.35)',
                            "&:hover": {
                                background: "linear-gradient(135deg, #7dd3fc, #5eead4)",
                            },
                        }}
                    >
                        Add Task
                    </Button>
                </Box>
                <Box mt={3} pt={2} sx={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>


                {error && <Typography color="error" mb={2}>{error}</Typography>}

                <Box 
                sx={{
                    maxWidth: 500,
                    width: '100%',
                    p: 0,
                    borderRadius: 3,
                    background: 'rgba(15, 32, 39, 0.55)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
                }}
            >
                <List>
                    {tasks.length === 0 && (
                        <Typography 
                            mt={3}
                            textAlign="center"
                            sx={{
                                color: 'rgba(230, 244, 247, 0.75)',
                                fontSize: '1.0rem',
                            }}
                        >
                            No tasks yet? 👀
                        </Typography>
                    )}
                    {tasks.map((task) => (
                        <ListItem key={task.id} secondaryAction={
                            <Box display="flex" gap={1} sx={{pl:'4px', borderLeft: '1px solid rgba(255,255,255,0.1)'}} >
                                {editingTask === task.id ? (
                                    <IconButton
                                        edge="end"
                                        size="small"
                                        sx={{
                                                    color: '#7dd3fc',
                                                    '&:hover': { color: '#38bdf8', boxShadow: '0 0 8px 2px rgba(56,189,248,0.5)' },
                                                }}
                                        onClick={async () => {
                                            try {
                                                setUpdatingId(task.id);
                                                await taskService.updateTask(task.id, {
                                                    title: task.title,
                                                    description: task.description,
                                                    completed: task.completed,
                                                });
                                                setEditingTask(null);
                                            } catch {
                                                setError("Failed to update task");
                                            } finally {
                                                setUpdatingId(null);
                                            }
                                        }}
                                    >
                                        <SaveIcon fontSize="small" />
                                    </IconButton>
                                ) : (
                                    <IconButton

                                        edge="end"
                                        size="small"
                                        
                                        onClick={() => setEditingTask(task.id)}
                                        sx={{
                                            color: '#7dd3fc',
                                            '&:hover': { color: '#38bdf8', boxShadow: '0 0 8px 2px rgba(56,189,248,0.5)' },
                                        }}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                )}
                                <IconButton
                                    edge="end"
                                    size="small"
                                    sx={{
                                        color: '#f87171',
                                        '&:hover': { color: '#ef4444', boxShadow: '0 0 8px 2px rgba(248,113,113,0.5)' },
                                    }}
                                    disabled={deletingId === task.id}
                                    onClick={async () => {
                                        try {
                                            setDeletingId(task.id);
                                            await taskService.deleteTask(task.id);
                                            setTasks((prev) => prev.filter((t) => t.id !== task.id));
                                        } catch {
                                            setError("Failed to delete task");
                                        } finally {
                                            setDeletingId(null);
                                        }
                                    }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        }>
                            <Checkbox
                                edge="start"
                                checked={task.completed}
                                disabled={updatingId === task.id}
                            
                                sx={{
                                    color: '#7dd3fc',
                                    '&.Mui-checked': { color: '#38bdf8' },
                                    '&:hover': { backgroundColor: 'rgba(56,189,248,0.1)' },
                                }}
                                onChange={async () => {
                                    try {
                                        setUpdatingId(task.id);
                                        await taskService.updateTask(task.id, {
                                            completed: !task.completed,
                                        });
                                        setTasks((prev) =>
                                            prev.map((t) =>
                                                t.id === task.id ? { ...t, completed: !t.completed } : t
                                            )
                                        );
                                    } catch {
                                        setError("Failed to update task");
                                    } finally {
                                        setUpdatingId(null);
                                    }
                                }}
                            />
                            {editingTask === task.id ? (
                                <Box display="flex" flexDirection="column" width="100%">
                                    <TextField
                                        value={task.title}
                                        
                                        onChange={(e) => {
                                            const newTitle = e.target.value;
                                            setTasks((prev) =>
                                                prev.map((t) =>
                                                    t.id === task.id ? { ...t, title: newTitle } : t
                                                )
                                            );
                                        }}
                                        sx={{ 
                                            
                                            mb: 1,
                                            mr:6,
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
                                        value={task.description || ""}
                                        onChange={(e) => {
                                            const newDesc = e.target.value;
                                            setTasks((prev) =>
                                                prev.map((t) =>
                                                    t.id === task.id ? { ...t, description: newDesc } : t
                                                )
                                            );
                                        }}
                                        multiline
                                        rows={2}
                                        sx={{
                                            mr: 6,
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                                transition: 'all 0.2s ease',
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
                                                '& textarea': {
                                                    color: '#e6f4f7',
                                                    fontSize:14,
                                                    fontWeight: 500,
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'rgba(230, 244, 247, 0.65)',
                                                '&.Mui-focused': {
                                                    color: '#7dd3fc',
                                                },
                                            },
                                        }}
                                    />
                                </Box>
                            ) : (
                                <ListItemText
                                    primary={task.title}
                                    sx={{
                                        textDecoration: task.completed ? "line-through" : "none",
                                        color: '#e6f4f7',
                                    
                                    }}
                                />
                            )}
                        </ListItem>
                    ))}
                </List>
                </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Tasks;
