import type { DeleteTodoUseCase } from '@/application/todo/useCases';
import { DI_TYPES, diContainer } from '@/shared/config';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/ui/components/alert-dialog';
import { Button } from '@/shared/ui/components/button';

type DeleteTodoButtonProps = {
  id: string;
};
export const DeleteTodo = (props: DeleteTodoButtonProps) => {
  const { id } = props;
  const deleteTodo = async () => {
    await diContainer
      .get<DeleteTodoUseCase>(DI_TYPES.DeleteTodoUseCase)
      .execute(id);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive">DELETE</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            todo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteTodo}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
