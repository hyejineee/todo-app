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
import { useNavigate } from 'react-router-dom';
import { useDeleteTodo } from '../api';

type DeleteTodoButtonProps = {
  id: string;
};
export const DeleteTodo = (props: DeleteTodoButtonProps) => {
  const { id } = props;
  const navigate = useNavigate();
  const { mutateAsync: deleteTodoRequest } = useDeleteTodo();
  const deleteTodo = async () => {
    await deleteTodoRequest(id);
    navigate('/todos', { replace: true });
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
