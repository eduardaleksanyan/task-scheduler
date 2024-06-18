import React, { useMemo } from "react";
import DataGridCustom from "../../components/data-grid/DataGridCustom";
import Columns from "../../components/logs/Columns";
import { useGetLogsQuery } from "../../api/Logs";
import MainContainer from "../../components/container/MainContainer";

export default function Logs() {
  const { data } = useGetLogsQuery();
  const rows = useMemo(() => data ?? [], [data]);
  const columns = useMemo(() => Columns(), []);

  return (
    <MainContainer title={"Logs"}>
      <DataGridCustom rows={rows} columns={columns} />
    </MainContainer>
  );
}
