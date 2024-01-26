import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { useMoveToComplete } from "../api/task/taskHook";

const PendingCard = ({ pendingTask, idx }) => {
  //hooks
  const { movetoCompleteMutate, isCompleteMutateLoading } = useMoveToComplete();

  //handlers
  const handleComplete = (id) => {
    movetoCompleteMutate({
      taskId: id,
    });
  };

  //jsx
  return (
    <div style={{ marginTop: "20px" }} key={idx}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: 20 }} gutterBottom>
              {pendingTask.title}
            </Typography>
            <div style={{ color: "red" }}>Priority {pendingTask.priority}</div>
          </div>
          <Typography variant="body2">{pendingTask.description}</Typography>
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
            <LoadingButton
              size="small"
              variant="outlined"
              color="success"
              onClick={() => handleComplete(pendingTask._id)}
              loading={isCompleteMutateLoading}
              disabled={isCompleteMutateLoading}
            >
              Complete
            </LoadingButton>
            <div style={{ color: "red" }}>
              Due Date:- {moment(pendingTask.dueDate).format("MM-DD-YYYY")}
            </div>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default PendingCard;
