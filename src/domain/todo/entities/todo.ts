import { Priority, Status, Title } from '../vo';

export default class Todo {
  private id: string;
  private title: Title;
  private status: Status;
  private priority: Priority;

  constructor(
    id: string,
    title: Title,
    status: Status = Status.NOT_STARTED,
    priority: Priority = Priority.NORMAL,
  ) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.priority = priority;
  }

  updateTitle(title: Title): Todo {
    this.title = title;
    return this;
  }

  updateStatus(status: Status): Todo {
    this.status = status;
    return this;
  }

  updatePriority(priority: Priority): Todo {
    this.priority = priority;
    return this;
  }

  getId(): string {
    return this.id;
  }

  getTitle(): Title {
    return this.title;
  }

  getStatus(): Status {
    return this.status;
  }

  getPriority(): Priority {
    return this.priority;
  }
}
