import { useFormContext, Controller } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Props = TextFieldProps & {
  name: string;
  type?: string;
};

export default function RHFTextField(props: Props) {
  const { name, helperText, type, ...other } = props;
  const { control, watch } = useFormContext();
  const fieldValue = watch(name);
  const [fieldHasValue, setFieldHasValue] = useState(false);
  const [fieldFocused, setFieldFocused] = useState(false);

  const hasValue = (value: any) => value !== '';

  useEffect(() => {
    setFieldHasValue(hasValue(fieldValue));
  }, [fieldValue]);

  // Detect mui autofill event and let component know if field has value
  const makeAnimationStartHandler =
    (stateSetter: Dispatch<SetStateAction<boolean>>) => (e: any) => {
      const autofilled = !!e.target?.matches('*:-webkit-autofill');
      if (e.animationName === 'mui-auto-fill') {
        stateSetter(autofilled);
      }

      if (e.animationName === 'mui-auto-fill-cancel') {
        stateSetter(autofilled);
      }
    };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, onChange, onBlur, ...field }, fieldState: { error } }) => (
        <TextField
          type={type}
          {...field}
          inputRef={ref}
          fullWidth
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
          inputProps={{
            ...other.inputProps,
            onAnimationStart: makeAnimationStartHandler(setFieldHasValue),
          }}
          InputLabelProps={{
            ...other.InputLabelProps,
            shrink:
              !!field?.value || fieldHasValue || fieldFocused || other.defaultValue !== undefined,
          }}
          onFocus={(e) => {
            other?.onFocus?.(e);
            setFieldFocused(true);
          }}
          onBlur={(e) => {
            onBlur?.();
            other?.onBlur?.(e);
            setFieldFocused(false);
          }}
          onChange={(e) => {
            onChange?.(e);
            other?.onChange?.(e);
            setFieldHasValue(hasValue(e.target.value));
          }}
          {...(type === 'hidden' && {
            sx: { '& > :not(style)': { m: 1, display: 'none' }, label: '' },
          })}
        />
      )}
    />
  );
}
