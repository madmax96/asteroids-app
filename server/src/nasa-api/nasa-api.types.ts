import { ApiProperty } from '@nestjs/swagger';

class EstimatedDiameterProperties {
  @ApiProperty()
  estimated_diameter_min: number;

  @ApiProperty()
  estimated_diameter_max: number;
}
class EstimatedDiameter {
  @ApiProperty()
  kilometers: EstimatedDiameterProperties;

  @ApiProperty()
  meters: EstimatedDiameterProperties;

  @ApiProperty()
  miles: EstimatedDiameterProperties;

  @ApiProperty()
  feet: EstimatedDiameterProperties;
}

class MissDistance {
  @ApiProperty()
  astronomical: string;

  @ApiProperty()
  lunar: string;

  @ApiProperty()
  kilometers: string;

  @ApiProperty()
  miles: string;
}

class RelativeVelocity {
  @ApiProperty()
  kilometers_per_second: string;

  @ApiProperty()
  kilometers_per_hour: string;

  @ApiProperty()
  miles_per_hour: string;
}
class CloseApproachData {
  @ApiProperty()
  close_approach_date: string;

  @ApiProperty()
  close_approach_date_full: string;

  @ApiProperty()
  epoch_date_close_approach: number;

  @ApiProperty()
  relative_velocity: RelativeVelocity;

  @ApiProperty()
  miss_distance: MissDistance;

  @ApiProperty()
  orbiting_body: string;
}

export class AsteroidSimple {
  links: {
    self: string;
  };
  @ApiProperty()
  id: string;

  @ApiProperty()
  neo_reference_id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  nasa_jpl_url: string;

  @ApiProperty()
  absolute_magnitude_h: number;

  @ApiProperty()
  estimated_diameter: EstimatedDiameter;

  @ApiProperty()
  is_potentially_hazardous_asteroid: boolean;

  @ApiProperty({ isArray: true, type: CloseApproachData })
  close_approach_data: CloseApproachData[];

  @ApiProperty()
  is_sentry_object: boolean;
}

class OrbitClass {
  @ApiProperty()
  orbit_class_type: string;

  @ApiProperty()
  orbit_class_description: string;

  @ApiProperty()
  orbit_class_range: string;
}

class OrbitalData {
  @ApiProperty()
  orbit_id: string;

  @ApiProperty()
  orbit_determination_date: string;

  @ApiProperty()
  first_observation_date: string;

  @ApiProperty()
  last_observation_date: string;

  @ApiProperty()
  data_arc_in_days: number;

  @ApiProperty()
  observations_used: number;

  @ApiProperty()
  orbit_uncertainty: string;

  @ApiProperty()
  minimum_orbit_intersection: string;

  @ApiProperty()
  jupiter_tisserand_invariant: string;

  @ApiProperty()
  epoch_osculation: string;

  @ApiProperty()
  eccentricity: string;

  @ApiProperty()
  semi_major_axis: string;

  @ApiProperty()
  inclination: string;

  @ApiProperty()
  ascending_node_longitude: string;

  @ApiProperty()
  orbital_period: string;

  @ApiProperty()
  perihelion_distance: string;

  @ApiProperty()
  perihelion_argument: string;

  @ApiProperty()
  aphelion_distance: string;

  @ApiProperty()
  perihelion_time: string;

  @ApiProperty()
  mean_anomaly: string;

  @ApiProperty()
  mean_motion: string;

  @ApiProperty()
  equinox: string;

  @ApiProperty()
  orbit_class: OrbitClass;
}

export class AsteroidFull extends AsteroidSimple {
  @ApiProperty()
  orbital_data: OrbitalData;
}

export type AsteroidsFeedResponse = {
  links: {
    next: string;
    previous: string;
    self: string;
  };
  element_count: number;
  near_earth_objects: Record<string, AsteroidSimple[]>;
};
