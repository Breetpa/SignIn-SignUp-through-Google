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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { openAlert } from "../store/alert";
import { signIn } from "../store/auth";

const SignIn = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignInClicked = () => {
    if (!validator.isEmail(email)) {
      dispatch(
        openAlert({ type: "error", text: "Please input the email correctly." })
      );
    } else if (password == "") {
      dispatch(
        openAlert({ type: "error", text: "Please input the password." })
      );
    }
    const user = {
      email: email,
      password: password,
    };
    dispatch(signIn({ user: user }));
  };

  if (isAuthenticated) {
    navigate("/");
  }

  return (
    <Box
      display="flex"
      justifyContent={"center"}
      textAlign="center"
      marginTop={10}
    >
      <Card sx={{ minWidth: 400 }}>
        <CardContent>
          <Typography variant="h3" color={"skyblue"}>
            SignIn
          </Typography>
          <Box marginY={3}>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type={"email"}
              fullWidth
              label="Email"
            ></TextField>
          </Box>
          <Box marginY={3}>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={"password"}
              fullWidth
              label="Password"
            ></TextField>
          </Box>
          <hr />
          <Button
            sx={{ marginY: 2 }}
            fullWidth
            variant="outlined"
            onClick={onSignInClicked}
          >
            SignIn
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignIn;
