import { GridColDef } from "@mui/x-data-grid";
import { viewDate } from "../../utils/utils";

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
      renderCell: (params) => {
        return params.row.timestamp ? viewDate(params.row.timestamp) : '-';
      }
    },
  ];
};

export default Columns;
