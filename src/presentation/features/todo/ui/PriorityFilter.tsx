import type { PriorityType } from '@/domain/todo/vo/priority';

type PriorityFilterProps = {
  defaultValue?: PriorityType;
  value?: PriorityType;
  onFilterChange: (filter: PriorityType) => void;
};

export const PriorityFilter = (props: PriorityFilterProps) => {
  const { value, defaultValue, onFilterChange } = props;
  return <>필터</>;
};
