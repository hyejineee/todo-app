import type { PriorityType } from '@/domain/todo/vo/priority';
import { priorityOptions } from '@/presentation/entities/todo/constant';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/components/select';

type PriorityFilterProps = {
  defaultValue?: PriorityType | 'all';
  value?: PriorityType | 'all';
  onFilterChange: (filter: PriorityType | 'all') => void;
};

export const PriorityFilter = (props: PriorityFilterProps) => {
  const { value, defaultValue, onFilterChange } = props;

  return (
    <Select
      defaultValue={defaultValue}
      value={value}
      onValueChange={onFilterChange}
    >
      <SelectTrigger css={{ width: '100%' }}>
        <SelectValue placeholder="Priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={'all'}>all</SelectItem>

        {priorityOptions.map(({ value, label }) => (
          <SelectItem value={value}>{label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
