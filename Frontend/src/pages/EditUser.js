import {
  TextField,
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import validator from "validator";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPasword] = useState("");

  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  const onConfirmClicked = () => {
    if (firstName == "" || lastName == "") {
      setAlert(true);
      setAlertText("Please input the name correctly.");
    } else if (!validator.isEmail(email)) {
      setAlert(true);
      setAlertText("Please input the email correctly.");
    } else if (password == "") {
      setAlert(true);
      setAlertText("Please input the password.");
    }
    if (password !== repeatPassword) {
      setAlert(true);
      setAlertText("Passwords not match.");
      setRepeatPasword("");
    }
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
  };

  const onCancelClicked = () => {};

  const handleClose = (event, reason) => {
    setAlert(false);
  };

  return (
    <Box
      display="flex"
      justifyContent={"center"}
      textAlign="center"
      marginTop={10}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alert}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity="error" color="error">
          {alertText}
        </Alert>
      </Snackbar>
      <Card sx={{ minWidth: 800 }}>
        <CardContent>
          <Typography variant="h3" color={"skyblue"}>
            Edit User data
          </Typography>
          <Box marginY={3}>
            <TextField
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              label="First Name"
            ></TextField>
          </Box>
          <Box marginY={3}>
            <TextField
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              label="Last Name"
            ></TextField>
          </Box>
          <Box marginY={3}>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              type={"email"}
              fullWidth
              label="Email"
            ></TextField>
          </Box>
          <Box marginY={3}>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              type={"password"}
              fullWidth
              label="Password"
            ></TextField>
          </Box>
          <Box marginY={3}>
            <TextField
              value={repeatPassword}
              onChange={(e) => setRepeatPasword(e.target.value)}
              type={"password"}
              fullWidth
              label="Repeat password"
            ></TextField>
          </Box>
          <Box display={"flex"} flexDirection="row">
            <Button fullWidth variant="outlined" onClick={onConfirmClicked}>
              Confirm
            </Button>
            <Box marginX={2}></Box>
            <Button fullWidth variant="outlined" onClick={onCancelClicked}>
              Cancel
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUp;
