import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../providers/authProvider";
import { useRegisterUser } from "../api/auth/authHook";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { emailValidator } from "../utils";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp({ setAuthState }) {
  //hooks
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const { mutate, isLoading, isSuccess, registeruserData, error } =
    useRegisterUser();

  //useStates
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [emailValidatorText, setEmailValidatorText] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  //handlers
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name);
    mutate({
      name: name,
      email: email,
      password: password,
    });
  };

  //useEffect
  useEffect(() => {
    if (!emailValidator(email)) {
      setEmailValidatorText(
        "Please enter a valid email id ( ex: Dory@gmail.com)"
      );
    } else {
      setEmailValidatorText("");
    }
  }, [email]);
  useEffect(() => {
    if (isSuccess) {
      console.log("registeruserData", registeruserData);
      setToken(registeruserData.token);
      localStorage.setItem("token", registeruserData.token);
      navigate("/");
    }
    console.log("error", error);
  }, [isSuccess, error]);

  console.log("isLoading", isLoading)

  //jsx
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Name"
                  value={name}
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  error={emailValidatorText}
                  helperText={emailValidatorText}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password *
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    error={password.length <= 6 && password !== ""}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  {password.length <= 6 && password !== "" && (
                    <FormHelperText error id="accountId-error">
                      Password Must be greater than 6 digit
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isLoading}
              disabled={
                emailValidatorText ||
                name === "" ||
                password === "" ||
                password.length <= 6
              }
            >
              Sign Up
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <div
                  style={{
                    textDecoration: "underline",
                    color: "blue",
                    cursor: "pointer",
                  }}
                  onClick={() => setAuthState((prev) => !prev)}
                >
                  Already have an account? Sign in
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
