import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import moment from "moment";

const CompletedCard = ({ completeTask, idx }) => {
  return (
    <div style={{ marginTop: "20px" }} key={idx}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: 20 }} gutterBottom>
              {completeTask.title}
            </Typography>
            <div style={{ color: "red" }}>Priority {completeTask.priority}</div>
          </div>

          <Typography variant="body2">
            {completeTask.description}
          </Typography>
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
            <div>Due Date:- {moment(completeTask.dueDate).format("MM-DD-YYYY")}</div>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default CompletedCard;
