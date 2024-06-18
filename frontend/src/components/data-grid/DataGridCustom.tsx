import * as React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { StyledBox } from "./styles";
import { Typography } from "@mui/material";

interface Props {
  rows: GridRowsProp;
  columns: GridColDef[];
  pageSize?: number;
}

const DataGridCustom = ({ rows, columns, pageSize = 20 }: Props) => {
  return (
    <StyledBox>
      {!rows || !rows.length ? (
        <Typography sx={{ textAlign: "center" }}>No rows</Typography>
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
