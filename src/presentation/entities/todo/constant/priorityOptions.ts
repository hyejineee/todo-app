import type { PriorityType } from '@/domain/todo/vo/priority';

export const priorityLabel: Record<PriorityType, string> = {
  normal: 'normal',
  urgent: 'urgent',
  row: 'row',
};
export const priorityOptions: { value: PriorityType; label: string }[] = [
  {
    value: 'urgent',
    label: priorityLabel['urgent'],
  },
  {
    value: 'normal',
    label: priorityLabel['normal'],
  },
  {
    value: 'row',
    label: priorityLabel['row'],
  },
];
