import { Test, TestingModule } from '@nestjs/testing';
import { AsteroidsService } from './asteroids.service';
import { NasaApiModule } from '../nasa-api/nasa-api.module';
import { NasaApiService } from '../nasa-api/nasa-api.service';
import { FeedQueryParams, SORT_BY, SORT_DIR } from './asteroids.params';
import { AsteroidsFeedResponse } from 'src/nasa-api/nasa-api.types';
import { AxiosHeaders } from 'axios';
import { pick } from 'lodash';

describe('AsteroidsService', () => {
  let service: AsteroidsService;
  let nasaApiService: NasaApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsteroidsService],
      imports: [NasaApiModule],
    }).compile();

    service = module.get<AsteroidsService>(AsteroidsService);
    nasaApiService = module.get<NasaApiService>(NasaApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('feed', () => {
    describe('when nasa-api call is successfull', () => {
      const sampleFeedResponse: AsteroidsFeedResponse = {
        links: {
          next: 'https://api.example.com/asteroids?page=2',
          previous: 'https://api.example.com/asteroids?page=1',
          self: 'https://api.example.com/asteroids',
        },
        element_count: 2,
        near_earth_objects: {
          '2023-05-20': [
            {
              links: {
                self: 'https://api.example.com/asteroids/123',
              },
              id: '123',
              neo_reference_id: '2023123',
              name: 'Asteroid 1',
              nasa_jpl_url: 'https://ssd.jpl.nasa.gov/sbdb.cgi?sstr=123',
              absolute_magnitude_h: 18.9,
              estimated_diameter: {
                kilometers: {
                  estimated_diameter_min: 0.2,
                  estimated_diameter_max: 0.5,
                },
                meters: {
                  estimated_diameter_min: 200,
                  estimated_diameter_max: 500,
                },
                miles: {
                  estimated_diameter_min: 0.1,
                  estimated_diameter_max: 0.3,
                },
                feet: {
                  estimated_diameter_min: 656,
                  estimated_diameter_max: 1640,
                },
              },
              is_potentially_hazardous_asteroid: false,
              close_approach_data: [
                {
                  close_approach_date: '2023-05-20',
                  close_approach_date_full: 'May 20, 2023',
                  epoch_date_close_approach: 172800,
                  relative_velocity: {
                    kilometers_per_second: '10',
                    kilometers_per_hour: '36000',
                    miles_per_hour: '22370',
                  },
                  miss_distance: {
                    astronomical: '0.002',
                    lunar: '0.8',
                    kilometers: '300000',
                    miles: '186400',
                  },
                  orbiting_body: 'Earth',
                },
              ],
              is_sentry_object: false,
            },
          ],
          '2023-05-21': [
            {
              links: {
                self: 'https://api.example.com/asteroids/456',
              },
              id: '456',
              neo_reference_id: '2023456',
              name: 'Asteroid 2',
              nasa_jpl_url: 'https://ssd.jpl.nasa.gov/sbdb.cgi?sstr=456',
              absolute_magnitude_h: 20.1,
              estimated_diameter: {
                kilometers: {
                  estimated_diameter_min: 0.1,
                  estimated_diameter_max: 0.3,
                },
                meters: {
                  estimated_diameter_min: 100,
                  estimated_diameter_max: 300,
                },
                miles: {
                  estimated_diameter_min: 0.06,
                  estimated_diameter_max: 0.18,
                },
                feet: {
                  estimated_diameter_min: 328,
                  estimated_diameter_max: 984,
                },
              },
              is_potentially_hazardous_asteroid: true,
              close_approach_data: [
                {
                  close_approach_date: '2023-05-21',
                  close_approach_date_full: 'May 21, 2023',
                  epoch_date_close_approach: 172900,
                  relative_velocity: {
                    kilometers_per_second: '15',
                    kilometers_per_hour: '54000',
                    miles_per_hour: '33550',
                  },
                  miss_distance: {
                    astronomical: '0.001',
                    lunar: '0.4',
                    kilometers: '150000',
                    miles: '93200',
                  },
                  orbiting_body: 'Earth',
                },
              ],
              is_sentry_object: false,
            },
          ],
        },
      };
      describe('when sorting by name ascending', () => {
        const queryParams: FeedQueryParams = {
          start_date: '2023-05-20',
          end_date: '2023-05-21',
          sort_by: SORT_BY.NAME,
          sort_dir: SORT_DIR.ASC,
        };

        it('should return corectly sorted and formatted asteroids feed', async () => {
          jest.spyOn(nasaApiService, 'feed').mockResolvedValue({
            data: sampleFeedResponse,
            status: 200,
            statusText: 'OK',
            headers: new AxiosHeaders(),
            config: { headers: new AxiosHeaders() },
          });

          const result = await service.feed(queryParams);

          expect(nasaApiService.feed).toHaveBeenCalledWith(
            pick(queryParams, ['start_date', 'end_date']),
          );
          expect(result.length).toEqual(2);

          expect(result[0].date).toEqual('2023-05-20');
          expect(result[0].name).toEqual('Asteroid 1');
          expect(result[1].date).toEqual('2023-05-21');
          expect(result[1].name).toEqual('Asteroid 2');
        });
      });

      describe('when sorting by name descending', () => {
        const queryParams: FeedQueryParams = {
          start_date: '2023-05-20',
          end_date: '2023-05-21',
          sort_by: SORT_BY.NAME,
          sort_dir: SORT_DIR.DESC,
        };

        it('should return corectly sorted and formatted asteroids feed', async () => {
          jest.spyOn(nasaApiService, 'feed').mockResolvedValue({
            data: sampleFeedResponse,
            status: 200,
            statusText: 'OK',
            headers: new AxiosHeaders(),
            config: { headers: new AxiosHeaders() },
          });

          const result = await service.feed(queryParams);

          expect(nasaApiService.feed).toHaveBeenCalledWith(
            pick(queryParams, ['start_date', 'end_date']),
          );
          expect(result.length).toEqual(2);

          expect(result[0].date).toEqual('2023-05-21');
          expect(result[0].name).toEqual('Asteroid 2');
          expect(result[1].date).toEqual('2023-05-20');
          expect(result[1].name).toEqual('Asteroid 1');
        });
      });
    });

    describe('when nasa-api service call fails', () => {
      const queryParams: FeedQueryParams = {
        start_date: '2023-05-20',
        end_date: '2023-05-21',
        sort_by: SORT_BY.NAME,
        sort_dir: SORT_DIR.ASC,
      };
      it('should rethrow error', async () => {
        const thrownMockError = new Error('kabooom');
        let thrownError;
        jest.spyOn(nasaApiService, 'feed').mockRejectedValue(thrownMockError);

        try {
          await service.feed(queryParams);
        } catch (err) {
          thrownError = err;
        }

        expect(nasaApiService.feed).toHaveBeenCalledWith(
          pick(queryParams, ['start_date', 'end_date']),
        );
        expect(thrownError).toEqual(thrownMockError);
      });
    });
  });

  describe('getById', () => {
    const sampleFullAsteroid = {
      links: {
        self: 'https://api.example.com/asteroids/123',
      },
      id: '123',
      neo_reference_id: '2023123',
      name: 'Asteroid 1',
      nasa_jpl_url: 'https://ssd.jpl.nasa.gov/sbdb.cgi?sstr=123',
      absolute_magnitude_h: 18.9,
      estimated_diameter: {
        kilometers: {
          estimated_diameter_min: 0.2,
          estimated_diameter_max: 0.5,
        },
        meters: {
          estimated_diameter_min: 200,
          estimated_diameter_max: 500,
        },
        miles: {
          estimated_diameter_min: 0.1,
          estimated_diameter_max: 0.3,
        },
        feet: {
          estimated_diameter_min: 656,
          estimated_diameter_max: 1640,
        },
      },
      is_potentially_hazardous_asteroid: false,
      close_approach_data: [
        {
          close_approach_date: '2023-05-20',
          close_approach_date_full: 'May 20, 2023',
          epoch_date_close_approach: 172800,
          relative_velocity: {
            kilometers_per_second: '10',
            kilometers_per_hour: '36000',
            miles_per_hour: '22370',
          },
          miss_distance: {
            astronomical: '0.002',
            lunar: '0.8',
            kilometers: '300000',
            miles: '186400',
          },
          orbiting_body: 'Earth',
        },
      ],
      is_sentry_object: false,
      orbital_data: {
        orbit_id: '123',
        orbit_determination_date: '2023-05-20',
        first_observation_date: '2023-05-10',
        last_observation_date: '2023-05-15',
        data_arc_in_days: 6,
        observations_used: 10,
        orbit_uncertainty: '0.123',
        minimum_orbit_intersection: '0.001',
        jupiter_tisserand_invariant: '3.456',
        epoch_osculation: '2023-05-20',
        eccentricity: '0.234',
        semi_major_axis: '2.345',
        inclination: '12.345',
        ascending_node_longitude: '123.456',
        orbital_period: '365.25',
        perihelion_distance: '1.234',
        perihelion_argument: '45.678',
        aphelion_distance: '3.456',
        perihelion_time: '2023-01-01',
        mean_anomaly: '234.567',
        mean_motion: '0.987',
        equinox: 'J2000',
        orbit_class: {
          orbit_class_type: 'APO',
          orbit_class_description: 'Apollo',
          orbit_class_range: '1.017 AU < q (perihelion) < 1.3 AU',
        },
      },
    };
    describe('when nasa-api call is successfull', () => {
      it('should return asteroid by ID', async () => {
        const asteroidId = '123';

        jest.spyOn(nasaApiService, 'getAsteroidById').mockResolvedValue({
          data: sampleFullAsteroid,
          status: 200,
          statusText: 'OK',
          headers: new AxiosHeaders(),
          config: { headers: new AxiosHeaders() },
        });

        const result = await service.getById(asteroidId);

        expect(nasaApiService.getAsteroidById).toHaveBeenCalledWith(asteroidId);
        expect(result).toEqual(sampleFullAsteroid);
      });
    });

    describe('when nasa-api service call fails', () => {
      const asteroidId = '123';
      it('should rethrow error', async () => {
        const thrownMockError = new Error('kabooom');
        let thrownError;
        jest
          .spyOn(nasaApiService, 'getAsteroidById')
          .mockRejectedValue(thrownMockError);

        try {
          await service.getById(asteroidId);
        } catch (err) {
          thrownError = err;
        }

        expect(nasaApiService.getAsteroidById).toHaveBeenCalledWith(asteroidId);
        expect(thrownError).toEqual(thrownMockError);
      });
    });
  });
});
