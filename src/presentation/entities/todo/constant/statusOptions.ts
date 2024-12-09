import type { StatusType } from '@/domain/todo/vo/status';

export const statusLabel: Record<StatusType, string> = {
  done: 'done',
  notStarted: 'not started',
  inProgress: 'in progress',
};
export const statusOptions: { value: StatusType; label: string }[] = [
  {
    value: 'notStarted',
    label: statusLabel['notStarted'],
  },
  {
    value: 'inProgress',
    label: statusLabel['inProgress'],
  },
  {
    value: 'done',
    label: statusLabel['done'],
  },
];
