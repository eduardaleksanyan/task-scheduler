import * as React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { StyledBox } from "./styles";
import Alert from "@mui/material/Alert";

interface Props {
  rows: GridRowsProp;
  columns: GridColDef[];
  pageSize?: number;
}

const DataGridCustom = ({ rows, columns, pageSize = 20 }: Props) => {
  return (
    <StyledBox>
      {!rows || !rows.length ? (
        <Alert severity="info">No rows</Alert>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: pageSize,
              },
            },
          }}
          pageSizeOptions={[pageSize]}
          disableRowSelectionOnClick
        />
      )}
    </StyledBox>
  );
};

export default React.memo(DataGridCustom);
