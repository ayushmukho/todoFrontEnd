import { Box, Grid, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import moment from "moment";
import { useAddTodoTask } from "../api/task/taskHook";

const AddTask = ({ handleClose, selectedTask }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //hooks
  const { mutate, isLoading, isSuccess, error } = useAddTodoTask();

  //useState
  const [date, setDate] = useState(
    selectedTask?.dueDate
      ? moment(selectedTask?.dueDate).format("MM-DD-YYYY")
      : moment(new Date()).format("MM-DD-YYYY")
  );
  const [priority, setPriority] = useState(
    selectedTask?.priority ? selectedTask?.priority : 1
  );
  const [title, setTitle] = useState(
    selectedTask?.title ? selectedTask?.title : ""
  );
  const [description, setDescription] = useState(
    selectedTask?.description ? selectedTask?.description : ""
  );
  
  //handlers
  const handleSubmitTask = () => {
    mutate({
      priority: +priority,
      description: description,
      title: title,
      taskId: selectedTask?._id ? selectedTask?._id : "",
      dueDate: moment(date).format("YYYY-MM-DD"),
    });
    handleClose();
  };

  //jsx
  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Add a Todo task
      </Typography>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-priotiy"
            name="priority"
            required
            fullWidth
            id="priority"
            label="Priority"
            type="number"
            value={priority}
            InputProps={{
              inputProps: {
                max: 3,
                min: 1,
              },
            }}
            autoFocus
            onChange={(e) => setPriority(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <DatePicker
            format={"MM-DD-YYYY"}
            value={moment(date)}
            onChange={(newValue) => setDate(newValue)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoComplete="given-title"
            name="title"
            required
            fullWidth
            id="title"
            label="Title"
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} fullWidth>
          <TextField
            value={description}
            rows={5}
            fullWidth
            multiline
            onChange={(e) => setDescription(e.target.value)}
            aria-label="empty textarea"
            placeholder="Description"
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            variant="contained"
            color="success"
            disabled={title === "" || description === ""}
            loading={isLoading}
            onClick={handleSubmitTask}
          >
            Submit
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddTask;
