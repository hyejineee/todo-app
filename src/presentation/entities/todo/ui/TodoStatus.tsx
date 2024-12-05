import type { Priority, Status } from '@/domain/todo';
import { Row } from '@/shared/ui';
import { Badge } from '@/shared/ui/components/badge';
import type { Interpolation, Theme } from '@emotion/react';

type TodoStatusProps = {
  priority: Priority;
  status: Status;
  styled?: Interpolation<Theme>;
};
export const TodoStatus = (props: TodoStatusProps) => {
  const { priority, status, styled } = props;

  return (
    <Row css={[styled, { gap: 4 }]}>
      <Badge>{priority.getValue()}</Badge>
      <Badge variant={'secondary'}>{status.getValue()}</Badge>
    </Row>
  );
};
