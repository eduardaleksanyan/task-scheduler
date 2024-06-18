import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  Controller,
  ControllerProps,
  Path,
  useFormContext,
} from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { CalendarOrClockPickerView } from "@mui/x-date-pickers/internals/models";

export declare type ParseableDate<TDate> =
  | string
  | number
  | Date
  | null
  | undefined
  | TDate;

export type DatePickerElementProps<
  T extends FieldValues,
  TInputDate,
  TDate = TInputDate,
> = Omit<
  DatePickerProps<TInputDate, TDate>,
  "value" | "onChange" | "renderInput"
> & {
  name: Path<T>;
  required?: boolean;
  errors?: any;
  onChange?: (value: TDate, keyboardInputValue?: string) => void;
  validation?: ControllerProps["rules"];
  parseDate?: (value: TDate, keyboardInputValue?: string) => TDate;
  inputProps?: TextFieldProps;
  helperText?: TextFieldProps["helperText"];
  defaultDate?: any;
  inputFormat?: string;
  ampm?: boolean;
  label?: string | boolean;
  className?: string;
  minDate?: any;
  viewsFormat?: string[];
  onKeyDown?: (e?: any) => void;
};

export default function RHFDateTimePickerControl<
  TFieldValues extends FieldValues,
>({
  name,
  required,
  parseDate,
  validation = {},
  inputProps,
  defaultDate,
  label,
  className = "",
  ampm = true,
  helperText = "",
  minDate = "",
  viewsFormat = [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onKeyDown = () => {},
  ...rest
}: DatePickerElementProps<TFieldValues, any, any>): JSX.Element {
  if (required && !validation.required) {
    validation.required = "This field is required";
  }
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      rules={validation}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            value={defaultDate || value || ""}
            ampm={ampm}
            minDate={minDate}
            inputFormat={rest?.inputFormat || "dd.MM.yyyy HH:mm"}
            onChange={(value, keyboardInputValue) => {
              let newValue = undefined;
              if (keyboardInputValue) {
                if (typeof parseDate === "function") {
                  newValue = parseDate(value, keyboardInputValue);
                } else {
                  newValue = keyboardInputValue;
                }
              } else {
                if (typeof parseDate === "function") {
                  newValue = parseDate(value);
                } else {
                  newValue = value;
                }
              }
              onChange(newValue, keyboardInputValue);
              if (typeof rest.onChange === "function") {
                rest.onChange(newValue, keyboardInputValue);
              }
            }}
            {...(viewsFormat && viewsFormat.length > 0
              ? { views: viewsFormat as CalendarOrClockPickerView[] }
              : {})}
            renderInput={(params) => (
              <TextField
                variant={!label ? "standard" : "outlined"}
                {...params}
                inputProps={{
                  ...params?.inputProps,
                  ...(!value && {
                    value: "",
                  }),
                }}
                {...inputProps}
                className={`${className}`}
                required={!!required}
                error={!!error}
                helperText={error ? error?.message : helperText}
                onKeyDown={onKeyDown}
                sx={{ width: "100%" }}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
}
