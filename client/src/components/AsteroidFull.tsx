import { FC } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import FavouriteToggle from "./FavouriteToggle";
import { AsteroidFeed, type Asteroid } from "../services/asteroids/types";

const AsteroidTable: FC<Asteroid> = (asteroid) => {
  const { orbital_data, ...restOfAsteroid } = asteroid;

  const asteroidFeed: AsteroidFeed = {
    ...restOfAsteroid,
    date: restOfAsteroid.close_approach_data[0].close_approach_date,
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Property</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>{asteroid.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Favourite</TableCell>
            <TableCell>
              <FavouriteToggle {...asteroidFeed} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Neo Reference ID</TableCell>
            <TableCell>{asteroid.neo_reference_id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>{asteroid.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Designation</TableCell>
            <TableCell>{asteroid.designation}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>NASA JPL URL</TableCell>
            <TableCell>
              <a href={asteroid.nasa_jpl_url} target="_blank">
                {asteroid.nasa_jpl_url}
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Absolute Magnitude (H)</TableCell>
            <TableCell>{asteroid.absolute_magnitude_h}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Estimated Diameter (Kilometers)</TableCell>
            <TableCell>
              Min:{" "}
              {asteroid.estimated_diameter.kilometers.estimated_diameter_min}
              <br />
              Max:{" "}
              {asteroid.estimated_diameter.kilometers.estimated_diameter_max}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Estimated Diameter (Meters)</TableCell>
            <TableCell>
              Min: {asteroid.estimated_diameter.meters.estimated_diameter_min}
              <br />
              Max: {asteroid.estimated_diameter.meters.estimated_diameter_max}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Estimated Diameter (Miles)</TableCell>
            <TableCell>
              Min: {asteroid.estimated_diameter.miles.estimated_diameter_min}
              <br />
              Max: {asteroid.estimated_diameter.miles.estimated_diameter_max}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Estimated Diameter (Feet)</TableCell>
            <TableCell>
              Min: {asteroid.estimated_diameter.feet.estimated_diameter_min}
              <br />
              Max: {asteroid.estimated_diameter.feet.estimated_diameter_max}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Is Potentially Hazardous Asteroid</TableCell>
            <TableCell>
              {asteroid.is_potentially_hazardous_asteroid ? "Yes" : "No"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Close Approach Data</TableCell>
            <TableCell>
              {asteroid.close_approach_data.map((approach) => (
                <div key={approach.epoch_date_close_approach}>
                  <strong>Date:</strong> {approach.close_approach_date_full}
                  <br />
                  <strong>Relative Velocity (km/h):</strong>{" "}
                  {approach.relative_velocity.kilometers_per_hour}
                  <br />
                  <strong>Miss Distance (kilometers):</strong>{" "}
                  {approach.miss_distance.kilometers}
                  <br />
                  <strong>Orbiting Body:</strong> {approach.orbiting_body}
                  <br />
                  <br />
                </div>
              ))}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Orbital Data</TableCell>
            <TableCell>
              <strong>Orbit ID:</strong> {orbital_data.orbit_id}
              <br />
              <strong>Orbit Determination Date:</strong>{" "}
              {orbital_data.orbit_determination_date}
              <br />
              <strong>First Observation Date:</strong>{" "}
              {orbital_data.first_observation_date}
              <br />
              <strong>Last Observation Date:</strong>{" "}
              {orbital_data.last_observation_date}
              <br />
              <strong>Data Arc in Days:</strong> {orbital_data.data_arc_in_days}
              <br />
              <strong>Observations Used:</strong>{" "}
              {orbital_data.observations_used}
              <br />
              <strong>Orbit Uncertainty:</strong>{" "}
              {orbital_data.orbit_uncertainty}
              <br />
              <strong>Minimum Orbit Intersection:</strong>{" "}
              {orbital_data.minimum_orbit_intersection}
              <br />
              <strong>Jupiter Tisserand Invariant:</strong>{" "}
              {orbital_data.jupiter_tisserand_invariant}
              <br />
              <strong>Epoch Osculation:</strong> {orbital_data.epoch_osculation}
              <br />
              <strong>Eccentricity:</strong> {orbital_data.eccentricity}
              <br />
              <strong>Semi Major Axis:</strong> {orbital_data.semi_major_axis}
              <br />
              <strong>Inclination:</strong> {orbital_data.inclination}
              <br />
              <strong>Ascending Node Longitude:</strong>{" "}
              {orbital_data.ascending_node_longitude}
              <br />
              <strong>Orbital Period:</strong> {orbital_data.orbital_period}
              <br />
              <strong>Perihelion Distance:</strong>{" "}
              {orbital_data.perihelion_distance}
              <br />
              <strong>Perihelion Argument:</strong>{" "}
              {orbital_data.perihelion_argument}
              <br />
              <strong>Aphelion Distance:</strong>{" "}
              {orbital_data.aphelion_distance}
              <br />
              <strong>Perihelion Time:</strong> {orbital_data.perihelion_time}
              <br />
              <strong>Mean Anomaly:</strong> {orbital_data.mean_anomaly}
              <br />
              <strong>Mean Motion:</strong> {orbital_data.mean_motion}
              <br />
              <strong>Equinox:</strong> {orbital_data.equinox}
              <br />
              <strong>Orbit Class:</strong>{" "}
              {orbital_data.orbit_class.orbit_class_type}
              <br />
              <strong>Orbit Class Description:</strong>{" "}
              {orbital_data.orbit_class.orbit_class_description}
              <br />
              <strong>Orbit Class Range:</strong>{" "}
              {orbital_data.orbit_class.orbit_class_range}
              <br />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Is Sentry Object</TableCell>
            <TableCell>{asteroid.is_sentry_object ? "Yes" : "No"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Asteroid: FC<Asteroid> = (asteroid) => {
  return (
    <Box mt={2}>
      <AsteroidTable {...asteroid} />
    </Box>
  );
};

export default Asteroid;
