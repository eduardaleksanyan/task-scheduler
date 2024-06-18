import { GridColDef } from "@mui/x-data-grid";
import { Chip, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Task } from "../../types/Tasks";
import { TaskType } from "../../constants/Constants";
import { viewDate } from "../../utils/utils";

interface Props {
  handleEdit: (row: Task) => void;
  handleDelete: (id: string) => void;
}
const Columns = ({ handleEdit, handleDelete }: Props): GridColDef[] => {
  return [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      renderCell: (params) => {
        const variant =
          params.row.type === TaskType.ONE_TIME ? "outlined" : undefined;
        return (
          <Chip label={params.row.type} color="primary" variant={variant} />
        );
      },
    },
    {
      field: "isActive",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        return (
          <Chip
            label={params.row.isActive ? "Active" : "Disabled"}
            color={params.row.isActive ? "success" : "default"}
          />
        );
      },
    },
    {
      field: "cron",
      headerName: "Cron",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {params.row.cron ? (
              <Chip variant="outlined" label={params.row.cron} />
            ) : (
              "-"
            )}
          </>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => {
        return params.row.date ? viewDate(params.row.date) : '-';
      }
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <IconButton onClick={() => handleEdit(params.row)}>
              <Tooltip title="Edit" placement="top">
                <EditIcon />
              </Tooltip>
            </IconButton>
            <IconButton onClick={() => handleDelete(`${params.row._id}`)}>
              <Tooltip title="Delete" placement="top">
                <DeleteIcon />
              </Tooltip>
            </IconButton>
          </>
        );
      },
    },
  ];
};

export default Columns;
