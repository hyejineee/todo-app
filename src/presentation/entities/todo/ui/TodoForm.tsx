import { Content, Priority, Status, Title } from '@domain/todo';
import type { Interpolation, Theme } from '@emotion/react';
import { Button, type ButtonProps } from '@shared/ui/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRadioGroup,
} from '@shared/ui/components/form';
import { Input } from '@shared/ui/components/input';
import { Textarea } from '@shared/ui/components/textarea';
import { createResolver } from '@shared/utils';
import type { ReactNode } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { priorityOptions, statusOptions } from '../constant';

export type TodoFormVOType = {
  status: Status;
  title: Title;
  content: Content;
  priority: Priority;
};

type TodoFormProps = {
  defaultValue?: Record<keyof TodoFormVOType, string>;
  children?: ReactNode;
};

const todoResolver = createResolver<TodoFormVOType>({
  title: Title,
  content: Content,
  priority: Priority,
  status: Status,
});

const TodoFormProvider = (props: TodoFormProps) => {
  const { defaultValue, children } = props;
  const form = useForm<TodoFormVOType>({
    mode: 'onChange',
    resolver: todoResolver,
    ...(defaultValue && { defaultValues: defaultValue }),
  });

  return (
    <FormProvider {...form}>
      <Form {...form}>{children}</Form>
    </FormProvider>
  );
};

type FormFieldStyledProps = {
  item?: Interpolation<Theme>;
  label?: Interpolation<Theme>;
  field?: Interpolation<Theme>;
};
const PriorityField = (props: FormFieldStyledProps) => {
  return (
    <FormField
      name="priority"
      render={({ field }) => (
        <FormItem css={[props?.item]}>
          <FormLabel css={[props?.label]}>Priority</FormLabel>
          <FormRadioGroup
            options={priorityOptions}
            onValueChange={field.onChange}
            value={field.value}
            css={[props?.field, { display: 'flex', gap: 40 }]}
          />
        </FormItem>
      )}
    />
  );
};

const StatusField = (props: FormFieldStyledProps) => {
  return (
    <FormField
      name="status"
      render={({ field }) => (
        <FormItem css={[props?.item]}>
          <FormLabel css={[props?.label]}>Status</FormLabel>
          <FormRadioGroup
            options={statusOptions}
            onValueChange={field.onChange}
            value={field.value}
            css={[props?.field, { display: 'flex', gap: 40 }]}
          />
        </FormItem>
      )}
    />
  );
};

const TitleField = (props: FormFieldStyledProps) => {
  return (
    <FormField
      name="title"
      render={({ field }) => (
        <FormItem css={props?.item}>
          <FormLabel css={props?.label}>Title</FormLabel>
          <FormControl>
            <Input css={props?.field} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const ContentField = (props: FormFieldStyledProps) => {
  return (
    <FormField
      name="content"
      render={({ field }) => (
        <FormItem css={{ height: '100%' }}>
          <FormLabel>Content</FormLabel>
          <FormControl>
            <Textarea css={{ height: 200 }} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const Submit = (
  props: {
    children: ReactNode;
    buttonStyle?: Interpolation<Theme>;
    onSubmit: (formValue: TodoFormVOType) => void;
  } & ButtonProps,
) => {
  const { onSubmit, children, buttonStyle } = props;
  const form = useFormContext<TodoFormVOType>();

  return (
    <Button onClick={form.handleSubmit(onSubmit)} css={[buttonStyle]}>
      {children}
    </Button>
  );
};

export const TodoForm = Object.assign(TodoFormProvider, {
  PriorityField,
  StatusField,
  TitleField,
  ContentField,
  Submit,
});

// export const TodoForm = Object.assign(
//   (props: TodoFormProps) => {
//     const { onSubmit, defaultValue, buttonText } = props;

//     const form = useForm<TodoFormVOType>({
//       mode: 'onChange',
//       resolver: todoResolver,
//       ...(defaultValue && { defaultValues: defaultValue }),
//     });

//     const handleSubmit = (formValue: TodoFormVOType) => {
//       const resolved = formValue as unknown as TodoFormVOType;
//       onSubmit(resolved);
//     };

//     return (
//       <Form {...form}>
//         <Column css={{ gap: 28 }}></Column>
//       </Form>
//     );
//   },
//   { displayName: 'TodoForm' },
// );
