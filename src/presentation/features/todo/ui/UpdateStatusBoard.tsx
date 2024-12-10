import { Status, type Todo } from '@/domain/todo';
import type { StatusType } from '@/domain/todo/vo/status';
import { createDnDBoardComponents } from '@/shared/ui/components/dnd';
import type { ReactNode } from 'react';
import { useUpdateTodo } from '../api';

export const { DnDPanel, useDnDContext } = createDnDBoardComponents<
  Todo,
  StatusType
>();

type UpdateStatusBoardProps = {
  children: ReactNode;
};
export const UpdateStatusBoard = (props: UpdateStatusBoardProps) => {
  const { children } = props;
  const { mutateAsync: updateStatusRequest } = useUpdateTodo();

  const updateStatus = async (origin: Todo, target: StatusType) => {
    const targetStatus = Status.create(target);
    if (!targetStatus.isSuccess) return;
    const updated = origin.updateStatus(targetStatus.value);

    await updateStatusRequest(updated);
  };

  return <DnDPanel onDrop={updateStatus}>{children}</DnDPanel>;
};
