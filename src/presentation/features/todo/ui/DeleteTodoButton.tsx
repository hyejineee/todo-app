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
import type { Interpolation, Theme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useDeleteTodo } from '../api';

type DeleteTodoButtonProps = {
  id: string;
  styled?: {
    trigger?: Interpolation<Theme>;
  };
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
      <AlertDialogTrigger css={props?.styled?.trigger}>
        <Button variant="destructive" css={props?.styled?.trigger}>
          DELETE
        </Button>
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
