import { FC } from "react";
import { useParams } from "react-router-dom";
import { useAsteroid } from "../services/asteroids";
import { Alert, Box, CircularProgress, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Asteroid from "../components/AsteroidFull";

const AsteroidPage: FC = () => {
  const params = useParams();
  const { asteroid, isLoading, error } = useAsteroid(params.id!);

  return (
    <Box textAlign="center" overflow="auto" maxWidth="100%">
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        startIcon={<ArrowBackIcon />}
      >
        Back to Asteroids Feed
      </Button>
      <Box mb={2} />
      {error ? (
        <Alert severity="error">
          {error.payload?.message.toString() || error.message}
        </Alert>
      ) : isLoading ? (
        <CircularProgress />
      ) : (
        <Asteroid {...asteroid!} />
      )}
    </Box>
  );
};

export default AsteroidPage;
