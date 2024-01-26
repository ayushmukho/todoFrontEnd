import React, { useEffect, useMemo, useState } from "react";
import { usseGetAlltasks } from "../api/task/taskHook";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import TodoCard from "../components/TodoCard";
import PendingCard from "../components/PendingCard";
import CompletedCard from "../components/CompletedCard";
import AddTask from "../components/AddTask";
import { useAuth } from "../providers/authProvider";

const Home = () => {
  const [toDotask, pendingTask, completedTask] = usseGetAlltasks();
  const [event, setEvent] = useState("");
  const [todoData, setTodoData] = useState();
  const handleChange = (event) => {
    setEvent(event.target.value);
  };
  const { setToken } = useAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (toDotask && !toDotask?.isLoading) {
      setTodoData(toDotask?.data?.getTodoTasks?.todoTasks);
    }
  }, [toDotask]);

  const sortedTodoData = useMemo(() => {
    if (!todoData) return [];
    switch (event) {
      case 1: // Sort by Priority
        return [...todoData].sort((a, b) => b.priority - a.priority);
      case 2:
        return  [...todoData].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      case 3:
        return  [...todoData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return todoData;
    }
  }, [event, todoData]);

  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="h2">
          TASK MANAGER
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            setToken(null);
            localStorage.removeItem("token");
          }}
        >
          Logout
        </Button>
      </div>
      <Grid container spacing={2} mt={3} p={3}>
        <Grid item xs={12} md={4} p={10}>
          <div style={{ width: "40%", marginBottom: "10px" }}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={event}
                label="SORT"
                onChange={handleChange}
              >
                <MenuItem value={1}>Priority</MenuItem>
                <MenuItem value={2}>Due task</MenuItem>
                <MenuItem value={3}>Creation Date</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              gap: "10px",
            }}
          >
            <div>
              <Typography variant="h5" component="h2">
                Todo Task
              </Typography>
            </div>

            <Button variant="contained" color="success" onClick={handleOpen}>
              Add task +
            </Button>
          </div>
          {toDotask?.isLoading ? (
            <div>Loading</div>
          ) : (
            sortedTodoData.map((todoTask, idx) => (
              <TodoCard key={idx} todoTask={todoTask} idx={idx} />
            ))
          )}
        </Grid>
        <Grid item xs={12} md={4} p={10}>
          <Typography variant="h5" component="h2" mb={3}>
            Pending Task
          </Typography>
          {pendingTask?.isLoading ? (
            <div>Loading</div>
          ) : (
            pendingTask?.data?.getPendingTasks?.pendingTasks.map(
              (pendingTask, idx) => (
                <PendingCard key={idx} pendingTask={pendingTask} idx={idx} />
              )
            )
          )}
        </Grid>
        <Grid item xs={12} md={4} p={10}>
          <Typography variant="h5" component="h2" mb={3}>
            Completed Task
          </Typography>
          {completedTask?.isLoading ? (
            <div>Loading</div>
          ) : (
            completedTask?.data?.getCompletedTask?.completedTasks.map(
              (completeTask, idx) => (
                <CompletedCard
                  key={idx}
                  completeTask={completeTask}
                  idx={idx}
                />
              )
            )
          )}
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddTask handleClose={handleClose} />
      </Modal>
    </div>
  );
};

export default Home;
