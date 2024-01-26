import {
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import {
  useDeleteTodoTask,
  useMoveToComplete,
  useMoveToPending,
} from "../api/task/taskHook";
import { LoadingButton } from "@mui/lab";

const TodoCard = ({ todoTask, idx }) => {
  //hooks
  const { mutate, isLoading, isSuccess, error } = useDeleteTodoTask();
  const { movetoPendingMutate, isPendingMutateLoading } = useMoveToPending();
  const { movetoCompleteMutate, isCompleteMutateLoading } = useMoveToComplete();

  //useState
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  //handlers
  const handleOpen = (todoTask) => {
    setSelectedTask(todoTask);
  };
  const handleClose = () => {
    setSelectedTask(null);
    setOpen(false);
  };
  const handleRemove = (id) => {
    mutate({
      taskId: id,
    });
  };
  const handleMoveToPending = (id) => {
    movetoPendingMutate({
      taskId: id,
    });
  };
  const handleComplete = (id) => {
    movetoCompleteMutate({
      taskId: id,
    });
  };

  //useEffects
  useEffect(() => {
    if (selectedTask !== null) setOpen(true);
  }, [selectedTask]);

  //jsx
  return (
    <div style={{ marginTop: "20px" }} key={idx}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: 20 }} gutterBottom>
              {todoTask.title}
            </Typography>
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ color: "red" }}>Priority {todoTask.priority}</div>
              <div
                style={{
                  textDecoration: "undeline",
                  color: "blue",
                  cursor: "pointer",
                  pointerEvents: `${isLoading ? "none" : ""}`,
                }}
                onClick={() => handleRemove(todoTask._id)}
              >
                {isLoading ? "Loading.." : "Remove"}
              </div>
            </div>
          </div>

          <Typography variant="body2">{todoTask.description}</Typography>
        </CardContent>
        <CardActions>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              {moment(todoTask.dueDate).isAfter(moment(new Date())) ? (
                <LoadingButton
                  size="small"
                  variant="contained"
                  color="success"
                  sx={{ fontSize: "10px" }}
                  onClick={() => handleComplete(todoTask._id)}
                  loading={isCompleteMutateLoading}
                  disabled={isCompleteMutateLoading}
                >
                  Complete
                </LoadingButton>
              ) : (
                <LoadingButton
                  size="small"
                  variant="contained"
                  color="error"
                  sx={{ fontSize: "10px" }}
                  onClick={() => handleMoveToPending(todoTask._id)}
                  loading={isPendingMutateLoading}
                  disabled={isPendingMutateLoading}
                >
                  Move to pending
                </LoadingButton>
              )}

              <Button
                size="small"
                variant="outlined"
                sx={{ fontSize: "10px" }}
                onClick={() => handleOpen(todoTask)}
              >
                Edit
              </Button>
            </div>
            <div
              style={{
                fontSize: "14px",
                color: `${
                  moment(todoTask.dueDate).isAfter(moment(new Date()))
                    ? "green"
                    : "red"
                }`,
              }}
            >
              Due Date:- {moment(todoTask.dueDate).format("MM-DD-YYYY")}
            </div>
          </div>
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddTask handleClose={handleClose} selectedTask={selectedTask} />
      </Modal>
    </div>
  );
};

export default TodoCard;
