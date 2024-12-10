import type { Todo } from '@/domain/todo';
import { createDnDBoardComponents } from '@/shared/ui/components/dnd';
import type { ReactNode } from 'react';

export const { DnDPanel, useDnDContext } = createDnDBoardComponents<Todo>();

type UpdateStatusBoardProps = {
  children: ReactNode;
};
export const UpdateStatusBoard = (props: UpdateStatusBoardProps) => {
  const { children } = props;

  const updateStatus = (origin: Todo, target: Todo) => {
    console.log(
      `${origin.getStatus()}에서 ${target.getStatus()}으로 상태 변경하기`,
    );
  };

  return <DnDPanel onDrop={updateStatus}>{children}</DnDPanel>;
};
