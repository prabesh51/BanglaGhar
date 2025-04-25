import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  useMediaQuery,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
  LocationOn,
  Phone,
  Email,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#0B1F23",
        color: "#fff",
        mt: 8,
        position: "relative",
        pt: 6,
        pb: 3,
      }}
    >
      {/* "Back to Top" button */}
      <Box
        sx={{
          position: "absolute",
          top: -25,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
        }}
      >
        <IconButton
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          sx={{
            bgcolor: "#2B7B8C",
            color: "white",
            width: "48px",
            height: "48px",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              bgcolor: "#8FBFBF",
              transform: "translateY(-5px)",
            },
            boxShadow: "0 4px 10px rgba(43, 123, 140, 0.3)",
          }}
          aria-label="back to top"
        >
          <KeyboardArrowUp fontSize="medium" />
        </IconButton>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and About Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                background:
                  "linear-gradient(90deg, #2B7B8C 0%, #8FBFBF 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                mb: 2,
              }}
            >
              BanglaGhor
            </Typography>
            <Typography variant="body2" sx={{ color: "#BFBBB8" }}>
              Finding your dream home in Bangladesh has never been easier.
              Expert property solutions since 2020.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: "bold",
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  width: "40px",
                  height: "3px",
                  bgcolor: "#2B7B8C",
                },
              }}
            >
              Quick Links
            </Typography>
            <Box>
              <Link component={RouterLink} to="/" sx={{ color: "#BFBBB8" }}>
                Home
              </Link>
              <Link
                component={RouterLink}
                to="/properties/buy"
                sx={{ color: "#BFBBB8" }}
              >
                Buy
              </Link>
              <Link
                component={RouterLink}
                to="/properties/rent"
                sx={{ color: "#BFBBB8" }}
              >
                Rent
              </Link>
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: "bold",
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  width: "40px",
                  height: "3px",
                  bgcolor: "#2B7B8C",
                },
              }}
            >
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ color: "#BFBBB8" }}>
              House #42, Road #11, Banani, Dhaka 1213, Bangladesh
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
