import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Alert,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import dayjs, { type Dayjs } from "dayjs";
import Box from "@mui/material/Box";
import AsteroidsDataTable from "../components/AsteroidsDataTable";
import { getFavouriteAsteroids, useAsteroidsFeed } from "../services/asteroids";

const CURRENT_DATE = dayjs();

const HomePage = () => {
  const [startDate, setStartDate] = useState<Dayjs>(CURRENT_DATE);
  const [endDate, setEndDate] = useState<Dayjs>(startDate.add(7, "days"));
  const [showAllFavourites, setShowAllFavourites] = useState<boolean>(false);

  const handleStartDateChange = (date: Dayjs | null) => {
    const newDate = date ?? CURRENT_DATE;

    if (newDate.isValid()) {
      const currentDifferenceInDays = endDate.diff(startDate, "days");
      setStartDate(newDate);
      setEndDate(newDate.add(currentDifferenceInDays, "days"));
    }
  };

  const handleEndDateChange = (date: Dayjs | null) => {
    const newDate = date ?? startDate.add(7, "days");
    if (newDate.isValid()) {
      setEndDate(newDate);
    }
  };

  const { asteroids, isLoading, error } = useAsteroidsFeed({
    startDate,
    endDate,
  });

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <DatePicker<Dayjs>
            label="Start Date"
            format="YYYY-MM-DD"
            value={startDate}
            onChange={handleStartDateChange}
            disabled={showAllFavourites}
          />
        </Grid>
        <Grid item>
          <DatePicker<Dayjs>
            label="End Date"
            format="YYYY-MM-DD"
            value={endDate}
            onChange={handleEndDateChange}
            minDate={startDate}
            maxDate={startDate.add(7, "days")}
            disabled={showAllFavourites}
          />
        </Grid>
      </Grid>
      <Typography variant="h3" component="h3" align="center" mt={2}>
        Asteroids
      </Typography>
      <FormControlLabel
        control={
          <Switch
            color="primary"
            checked={showAllFavourites}
            disabled={isLoading}
            onChange={() =>
              setShowAllFavourites((showAllFavourites) => !showAllFavourites)
            }
          />
        }
        label="Show All Favourites"
      />
      <Box mt={2} sx={{ width: "100%" }}>
        {error && !showAllFavourites ? (
          <Alert severity="error">
            {error.payload?.message?.toString() || error.message}
          </Alert>
        ) : (
          <AsteroidsDataTable
            data={showAllFavourites ? getFavouriteAsteroids() : asteroids}
            isLoading={isLoading}
          />
        )}
      </Box>
    </>
  );
};

export default HomePage;
