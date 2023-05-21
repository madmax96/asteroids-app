import { FC } from "react";
import { Link } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { isFavourite } from "../services/asteroids";
import { AsteroidFeed } from "../services/asteroids/types";
import FavouriteToggle from "./FavouriteToggle";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
    valueGetter: ({ value }) => +value,
    renderCell({ value }) {
      return <Link to={`/asteroids/${value}`}>{value}</Link>;
    },
    minWidth: 100,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 3,
    minWidth: 100,
  },
  {
    field: "absolute_magnitude_h",
    headerName: "Magnitude",
    flex: 1,
    minWidth: 60,
  },
  {
    field: "estimated_diameter_min",
    headerName: "Estimated Diameter Min (Meters)",
    flex: 2,
    minWidth: 100,
    valueGetter: ({ row }) =>
      Math.round(
        (row as AsteroidFeed).estimated_diameter.meters.estimated_diameter_min
      ),
  },
  {
    field: "estimated_diameter_max",
    headerName: "Estimated Diameter Max (Meters)",
    flex: 2,
    minWidth: 100,
    valueGetter: ({ row }) =>
      Math.round(
        (row as AsteroidFeed).estimated_diameter.meters.estimated_diameter_max
      ),
  },
  {
    field: "is_potentially_hazardous_asteroid",
    headerName: "Is Hazardous",
    renderCell({ value }) {
      return value ? (
        <DoneIcon fontSize="medium" color="warning" />
      ) : (
        <ClearIcon fontSize="medium" color="success" />
      );
    },
  },
  {
    field: "isFavourite",
    headerName: "Favourite",
    renderCell({ row }) {
      return <FavouriteToggle {...row} />;
    },
    valueGetter: ({ row }) => isFavourite(row),
  },
];

type AsteroidsTableParams = {
  data?: AsteroidFeed[];
  isLoading: boolean;
};
const AsteroidsTable: FC<AsteroidsTableParams> = ({ data, isLoading }) => {
  const rows = data ?? [];
  return (
    <DataGrid
      autoHeight
      columns={columns}
      rows={rows}
      loading={isLoading}
      initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
      pageSizeOptions={[10, 20, 50, 100]}
    />
  );
};

export default AsteroidsTable;
