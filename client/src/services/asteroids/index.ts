import { useState } from "react";
import { Dayjs } from "dayjs";
import useSWR from "swr";
import { API_URL_BASE, FetcherError, fetcher, getQueryString } from "../common";
import { Asteroid, AsteroidFeed } from "./types";

const DATE_FORMAT = "YYYY-MM-DD";
const API_URL = `${API_URL_BASE}/asteroids`;
enum SORT_BY {
  NAME = "name",
}
enum SORT_DIR {
  ASC = "asc",
  DESC = "desc",
}

type UseAsteroidsFeedParams = {
  startDate: Dayjs;
  endDate: Dayjs;
  sortBy?: SORT_BY;
  sortDir?: SORT_DIR;
};

export function useAsteroidsFeed({
  startDate,
  endDate,
  sortBy,
  sortDir,
}: UseAsteroidsFeedParams) {
  const query = getQueryString({
    start_date: startDate.format(DATE_FORMAT),
    end_date: endDate.format(DATE_FORMAT),
    ...(sortBy && { sort_by: sortBy }),
    ...(sortDir && { sort_dir: sortDir }),
  });

  const { data, error, isLoading } = useSWR<AsteroidFeed[], FetcherError>(
    `${API_URL}/?${query}`,
    fetcher
  );

  return {
    asteroids: data,
    isLoading,
    error,
  };
}

export function useAsteroid(id: string) {
  const { data, error, isLoading } = useSWR<Asteroid, FetcherError>(
    `${API_URL}/${id}`,
    fetcher
  );

  return {
    asteroid: data,
    isLoading,
    error,
  };
}

let favouriteAsteroids = JSON.parse(
  localStorage.getItem("favouriteAsteroids") ?? "[]"
) as AsteroidFeed[];

const favouriteAsteroidsIdsSet = new Set(
  favouriteAsteroids.map(({ id }) => id)
);

export function getFavouriteAsteroids() {
  return favouriteAsteroids;
}

function saveFavouriteAsteroids() {
  localStorage.setItem(
    "favouriteAsteroids",
    JSON.stringify(favouriteAsteroids)
  );
}

function addFavouriteAsteroid(asteroid: AsteroidFeed) {
  favouriteAsteroids = [...favouriteAsteroids, asteroid];
  favouriteAsteroidsIdsSet.add(asteroid.id);
  saveFavouriteAsteroids();
}

function removeFavouriteAsteroid(asteroidToRemove: AsteroidFeed) {
  favouriteAsteroids = favouriteAsteroids.filter(
    ({ id }) => id !== asteroidToRemove.id
  );
  favouriteAsteroidsIdsSet.delete(asteroidToRemove.id);
  saveFavouriteAsteroids();
}

export function isFavourite(asteroid: AsteroidFeed) {
  return favouriteAsteroidsIdsSet.has(asteroid.id);
}

export function useIsFavouriteAsteroid(
  asteroid: AsteroidFeed
): [boolean, () => void] {
  const [isFavouriteState, setIsFavourite] = useState<boolean>(
    isFavourite(asteroid)
  );

  function toggleIsFavourite() {
    setIsFavourite((currentIsFavourite) => {
      const newIsFavouriteState = !currentIsFavourite;

      if (newIsFavouriteState) {
        addFavouriteAsteroid(asteroid);
      } else {
        removeFavouriteAsteroid(asteroid);
      }
      return newIsFavouriteState;
    });
  }

  return [isFavouriteState, toggleIsFavourite];
}
