import React, { useEffect, useState } from "react";
import { Button, MenuItem, Stack } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormFields, Task } from "../../types/Tasks";
import RHFTextField from "../hook-form/RHFTextField";
import FormProvider from "../hook-form/FormProvider";
import { RHFSelect } from "../hook-form/RHFSelect";
import { TaskType } from "../../constants/Constants";
import { RHFCheckbox } from "../hook-form/RHFCheckbox";
import RHFDateTimePickerControl from "../hook-form/RHFDateTimePickerControl";
import { useCreateTaskMutation, useUpdateTaskMutation } from "../../api/Tasks";
import { useSnackbar } from "notistack";
import { CRON_REGEX } from "../../utils/regex";
import DialogCustom from "../dialog/DialogCustom";

interface Props {
  open: boolean;
  handleClose: () => void;
  task?: Task;
}

const defaultValues: FormFields = {
  name: "",
  date: "",
  cron: "",
  type: TaskType.ONE_TIME,
  isActive: false,
};

const validationFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  type: yup.string().required("Type is required"),
  date: yup
    .string()
    .test("conditional-required", "Date is required", function (value) {
      const { type } = this.parent;
      return type === TaskType.ONE_TIME ? !!value : true;
    }),
  cron: yup
    .string()
    .test("conditional-required", "Cron is required", function (value) {
      const { type } = this.parent;
      return type === TaskType.RECURRING ? !!value : true;
    })
    .test(
      "conditional-cron-match",
      "Cron expression is invalid",
      function (value) {
        const { type } = this.parent;
        return type === TaskType.RECURRING
          ? CRON_REGEX.test(value as string)
          : true;
      },
    ),
  isActive: yup.boolean().required(),
});

export default function DialogSave({ open, handleClose, task }: Props) {
  const [initialValues, setInitialValues] = useState(defaultValues);
  const { enqueueSnackbar } = useSnackbar();
  const [createTask, { isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] =
    useCreateTaskMutation();
  const [updateTask, { isLoading: isLoadingEdit, isSuccess: isSuccessEdit }] =
    useUpdateTaskMutation();

  const methods = useForm<FormFields>({
    resolver: yupResolver(validationFormSchema),
    defaultValues: initialValues,
  });

  const { handleSubmit, control, setValue, reset } = methods;

  const selectedType = useWatch({
    control,
    name: "type",
  });

  useEffect(() => {
    if (task) {
      setInitialValues({ ...defaultValues, ...task });
    }
  }, [task]);

  useEffect(() => {
    if (open && !task) {
      reset();
    }
  }, [open, task]);

  useEffect(() => {
    if (task) {
      Object.keys(defaultValues).forEach((key) => {
        if (key in task) {
          const taskKey = key as keyof typeof defaultValues;
          setValue(taskKey, task[taskKey] || defaultValues[taskKey]);
        }
      });
    }
  }, [task, setValue]);

  useEffect(() => {
    if (isSuccessEdit || isSuccessAdd) {
      enqueueSnackbar(
        `Task successfully ${isSuccessAdd ? "Added" : "Edited"}`,
        { variant: "success" },
      );
      handleClose();
    }
  }, [isSuccessEdit, isSuccessAdd]);

  const onSubmitForm = async (data: FormFields) => {
    if (task) {
      updateTask({ ...task, ...data });
    } else {
      createTask({ ...data });
    }
  };

  const disabled = isLoadingAdd || isLoadingEdit;

  return (
    <>
      <DialogCustom open={open} handleClose={handleClose}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitForm)}>
          <DialogTitle id="alert-dialog-title">{"Manage Task"}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <RHFTextField label={`Name`} name={"name"} disabled={disabled} />
              <RHFSelect
                name={"type"}
                label={`Type`}
                sx={{ flex: 1 }}
                disabled={disabled}
              >
                {Object.values(TaskType).map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </RHFSelect>
              {selectedType === TaskType.RECURRING && (
                <RHFTextField
                  label={`Cron`}
                  name={"cron"}
                  disabled={disabled}
                />
              )}
              {selectedType === TaskType.ONE_TIME && (
                <RHFDateTimePickerControl
                  name={"date"}
                  label={"Date"}
                  minDate={new Date()}
                  disabled={disabled}
                  readOnly={true}
                />
              )}
              <RHFCheckbox
                name={"isActive"}
                label={"Is Active"}
                disabled={disabled}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={disabled}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={disabled}>
              Save
            </Button>
          </DialogActions>
        </FormProvider>
      </DialogCustom>
    </>
  );
}
