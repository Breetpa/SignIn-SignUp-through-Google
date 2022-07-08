import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeAlert } from "../store/alert";

const MyAlert = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);

  const handleClose = () => {
    dispatch(closeAlert());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert severity={alert.type} color={alert.type}>
        {alert.text}
      </Alert>
    </Snackbar>
  );
};

export default MyAlert;
