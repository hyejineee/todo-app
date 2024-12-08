import { Content, Priority, Status, Title } from '@domain/todo';
import { Column } from '@shared/ui';
import { Button } from '@shared/ui/components/button';
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
import { useForm } from 'react-hook-form';
import { priorityOptions, statusOptions } from '../constant';

export type TodoFormVOType = {
  status: Status;
  title: Title;
  content: Content;
  priority: Priority;
};

type TodoFormProps = {
  onSubmit: (formValue: TodoFormVOType) => void;
  defaultValue?: Record<keyof TodoFormVOType, string>;
  buttonText: string;
};

const todoResolver = createResolver<TodoFormVOType>({
  title: Title,
  content: Content,
  priority: Priority,
  status: Status,
});

export const TodoForm = Object.assign(
  (props: TodoFormProps) => {
    const { onSubmit, defaultValue, buttonText } = props;

    const form = useForm<TodoFormVOType>({
      mode: 'onChange',
      resolver: todoResolver,
      ...(defaultValue && { defaultValues: defaultValue }),
    });

    const handleSubmit = (formValue: TodoFormVOType) => {
      const resolved = formValue as unknown as TodoFormVOType;
      onSubmit(resolved);
    };

    return (
      <Form {...form}>
        <Column css={{ gap: 28 }}>
          <FormField
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <FormRadioGroup
                  options={priorityOptions}
                  onValueChange={field.onChange}
                  value={field.value}
                  css={{ display: 'flex', gap: 40 }}
                />
              </FormItem>
            )}
          />

          <FormField
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormRadioGroup
                  options={statusOptions}
                  onValueChange={field.onChange}
                  value={field.value}
                  css={{ display: 'flex', gap: 40 }}
                />
              </FormItem>
            )}
          />

          <FormField
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <Button
            onClick={form.handleSubmit(handleSubmit)}
            css={{ marginTop: 40 }}
          >
            {buttonText}
          </Button>
        </Column>
      </Form>
    );
  },
  { displayName: 'TodoForm' },
);
