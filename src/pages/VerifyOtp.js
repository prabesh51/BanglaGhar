import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
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
import { CognitoUser } from "amazon-cognito-identity-js";
import { userPool } from "../aws/CognitoConfig";

const VerifyOtpPaper = styled(Paper)(({ theme }) => ({
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

const VerifyOtp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOtpSubmit = (e) => {
    e.preventDefault();

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    // Only handle signup flow
    cognitoUser.confirmRegistration(otp, true, (err, result) => {
      if (err) {
        setError(err.message || JSON.stringify(err));
        return;
      }
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ py: 8 }}>
      <VerifyOtpPaper>
        <StyledAvatar>
          <LockOutlinedIcon fontSize="large" />
        </StyledAvatar>

        <Typography
          component="h1"
          variant="h4"
          sx={{ mb: 3, fontWeight: 700, color: "#2B7B8C" }}
        >
          {t("verify_otp")}
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          {t("otp_sent_to", { email })}
        </Typography>

        {error && (
          <Alert
            severity="error"
            sx={{ width: "100%", mb: 2, borderRadius: "8px" }}
          >
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleOtpSubmit} sx={{ width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label={t("enter_otp")}
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            sx={{ mb: 2 }}
          />

          <StyledButton type="submit" fullWidth variant="contained">
            {t("verify_otp")}
          </StyledButton>
        </Box>
      </VerifyOtpPaper>

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
          {t("otp_success")}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default VerifyOtp;
