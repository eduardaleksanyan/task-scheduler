import { GridColDef } from "@mui/x-data-grid";

const Columns = (): GridColDef[] => {
  return [
    {
      field: "level",
      headerName: "Level",
      width: 150,
    },
    {
      field: "message",
      headerName: "Message",
      flex: 1,
    },
    {
      field: "timestamp",
      headerName: "Date",
      width: 250,
    },
  ];
};

export default Columns;
