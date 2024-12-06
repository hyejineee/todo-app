import type { PriorityType } from '@/domain/todo/vo/priority';
import type { StatusType } from '@/domain/todo/vo/status';

export interface TodoFilter {
  priorityFilter: PriorityType;
  statusFilter: StatusType;
}
