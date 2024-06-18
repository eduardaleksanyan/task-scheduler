import { FormProvider as Form, UseFormReturn } from 'react-hook-form';
import { Box } from '@mui/material';

type Props = {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  onChange?: VoidFunction;
  marginTop?: number;
  ref?: string;
};

export default function FormProvider({
  children,
  onSubmit,
  onChange,
  methods,
  marginTop = 0,
  ref,
}: Props) {
  return (
    <Form {...methods}>
      <Box sx={{ marginTop }}>
        <form ref={ref} onSubmit={onSubmit} onChange={onChange}>
          {children}
        </form>
      </Box>
    </Form>
  );
}
