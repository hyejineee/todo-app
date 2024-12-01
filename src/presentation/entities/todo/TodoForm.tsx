import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@shared/ui/components/form';
import { RadioGroupItem } from '@shared/ui/components/radio-group';
import { useForm } from 'react-hook-form';

export const TodoForm = () => {
  const form = useForm();
  return (
    <Form {...form}>
      <FormField
        name="priority"
        render={() => (
          <FormItem>
            <FormLabel>우선순위</FormLabel>
            <FormControl>
              <FormItem>
                <FormControl>
                  <RadioGroupItem value="urgent" />
                </FormControl>
                <FormLabel>urgent</FormLabel>
              </FormItem>
            </FormControl>
          </FormItem>
        )}
      />
    </Form>
  );
};
