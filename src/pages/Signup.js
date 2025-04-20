import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Snackbar,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuth } from "../pages/AuthContext";

const SignupPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  boxShadow: "0 8px 24px rgba(43, 123, 140, 0.12)",
  borderRadius: "16px",
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  width: 56,
  height: 56,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  padding: theme.spacing(1.5),
  borderRadius: "8px",
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: 600,
  backgroundColor: theme.palette.primary.main,
  boxShadow: "0 4px 10px rgba(43, 123, 140, 0.2)",
  "&:hover": {
    backgroundColor: "#236C7D",
    boxShadow: "0 6px 14px rgba(43, 123, 140, 0.3)",
    transform: "translateY(-2px)",
  },
}));

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signup } = useAuth(); // Use signup from AuthContext
  const [useremail, setUseremail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Password validation states
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecial, setHasSpecial] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);

  const validatePassword = (pwd) => {
    setHasNumber(/\d/.test(pwd));
    setHasSpecial(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd));
    setHasUppercase(/[A-Z]/.test(pwd));
    setHasLowercase(/[a-z]/.test(pwd));
    setHasMinLength(pwd.length >= 8);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signup(useremail, username, password); // Call centralized signup
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/verify-otp", { state: { email: useremail } });
      }, 1500);
    } catch (err) {
      setError(err.message || "Signup failed"); // Use error from catch
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Check if password meets all requirements
  const isPasswordValid =
    hasNumber && hasSpecial && hasUppercase && hasLowercase && hasMinLength;

  return (
    <Container component="main" maxWidth="xs" sx={{ py: 8 }}>
      <SignupPaper>
        <StyledAvatar>
          <LockOutlinedIcon fontSize="large" />
        </StyledAvatar>

        <Typography
          component="h1"
          variant="h4"
          sx={{ mb: 3, fontWeight: 700, color: "#2B7B8C" }}
        >
          {t("sign_up")}
        </Typography>

        {error && (
          <Alert
            severity="error"
            sx={{ width: "100%", mb: 2, borderRadius: "8px" }}
          >
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSignup} sx={{ width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label={t("email")}
            autoFocus
            variant="outlined"
            value={useremail}
            onChange={(e) => setUseremail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label={t("name")}
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label={t("password")}
            type="password"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            sx={{ mb: 1 }}
            helperText={
              <Typography
                variant="caption"
                sx={{
                  color: hasMinLength ? "green" : "#2B7B8C",
                  lineHeight: 1.2,
                }}
              >
                {t("password_requirement")}
              </Typography>
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label={t("confirm_password")}
            type="password"
            variant="outlined"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            sx={{ mb: 2 }}
          />
          <StyledButton type="submit" fullWidth variant="contained">
            {t("sign_up")}
          </StyledButton>
        </Box>

        <Typography variant="body2" sx={{ mt: 2 }}>
          {t("already_have_account")}{" "}
          <Link to="/login" style={{ color: "#2B7B8C" }}>
            {t("login")}
          </Link>
        </Typography>
      </SignupPaper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ borderRadius: "8px" }}
        >
          {t("signup_success")}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Signup;
