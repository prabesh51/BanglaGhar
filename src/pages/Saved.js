import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { useAuth } from "./AuthContext";
import axios from "axios";

const Saved = () => {
  const { t } = useTranslation();
  const { isLoggedIn, user } = useAuth();
  const [savedProperties, setSavedProperties] = useState([]);

  useEffect(() => {
    if (isLoggedIn && user) {
      axios
        .get(`http://localhost:5001/api/users/${user}/wishlist`)
        .then((response) => {
          setSavedProperties(response.data.wishlist);
        });
    }
  }, [isLoggedIn, user]);

  if (!isLoggedIn) {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 4 }}>
          {t("login_to_view_saved")}
        </Typography>
      </Container>
    );
  }

  const removeFromWishlist = async (propertyId) => {
    try {
      await axios.delete(`http://localhost:5001/api/users/${user}/wishlist`, {
        data: { propertyId },
      });
      setSavedProperties((prev) => prev.filter((p) => p._id !== propertyId));
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        {t("saved_properties")}
      </Typography>
      <Grid container spacing={3}>
        {savedProperties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={
                  property.images && property.images[0]
                    ? `/pictures/${property.images[0]}`
                    : "/pictures/placeholder.png"
                }
                alt={property.title}
              />
              <CardContent>
                <Typography variant="h6">{property.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {property.location}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  ৳{property.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() =>
                    (window.location.href = `/properties/${property._id}`)
                  }
                >
                  {t("view_details")}
                </Button>
                <Button //remove from saved properties
                  variant="outlined"
                  color="secondary"
                  sx={{ mt: 2, ml: 1 }}
                  onClick={() => removeFromWishlist(property._id)}
                >
                  {t("remove")}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Saved;
