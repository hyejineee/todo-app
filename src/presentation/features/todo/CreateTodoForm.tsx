import { TodoForm } from '@/presentation/entities/todo';
import { Column } from '@/shared/ui';
import { Button } from '@/shared/ui/components/button';

export const CreateTodoForm = () => {
  return (
    <Column>
      <Button>생성하기</Button>
      <TodoForm />
    </Column>
  );
};
