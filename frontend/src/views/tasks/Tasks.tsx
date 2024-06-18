import React, { useCallback, useMemo, useState } from "react";
import { useGetTasksQuery } from "../../api/Tasks";
import DataGridCustom from "../../components/data-grid/DataGridCustom";
import Columns from "../../components/tasks/Columns";
import AddTask from "../../components/tasks/AddTask";
import EditTask from "../../components/tasks/EditTask";
import { Task } from "../../types/Tasks";
import DeleteTask from "../../components/tasks/DeleteTask";
import MainContainer from "../../components/container/MainContainer";

export default function Tasks() {
  const [task, setTask] = useState<Task | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleEdit = useCallback((row: Task) => {
    if (row) {
      setOpenEditModal(true);
      setTask(row);
    }
  }, []);

  const handleDelete = useCallback((id: string) => {
    if (id) {
      setOpenDeleteModal(true);
      setDeleteId(id);
    }
  }, []);

  const { data } = useGetTasksQuery();

  const rows = useMemo(() => data ?? [], [data]);
  const columns = useMemo(
    () => Columns({ handleEdit, handleDelete }),
    [handleEdit, handleDelete],
  );

  return (
    <MainContainer title={"Tasks"}>
      <AddTask />
      <DataGridCustom rows={rows} columns={columns} />
      {openEditModal && task && (
        <EditTask
          task={task}
          open={openEditModal}
          handleClose={() => setOpenEditModal(false)}
        />
      )}
      {openDeleteModal && deleteId && (
        <DeleteTask
          open={openDeleteModal}
          handleClose={() => setOpenDeleteModal(false)}
          id={deleteId}
        />
      )}
    </MainContainer>
  );
}
