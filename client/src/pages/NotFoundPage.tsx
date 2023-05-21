import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

const NotFoundPage: FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h1" mb={2} fontSize="4rem" fontWeight="bold">
        404
      </Typography>
      <Typography variant="h4" marginBottom={2} fontSize="1.5rem">
        Page not found
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Go back to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
