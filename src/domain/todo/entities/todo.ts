import { Priority, Status, Title } from '../vo';
import type Content from '../vo/content';

export default class Todo {
  private readonly id: string;
  private title: Title;
  private status: Status;
  private content: Content;
  private priority: Priority;

  constructor(
    id: string,
    title: Title,
    content: Content,
    status: Status = Status.NOT_STARTED,
    priority: Priority = Priority.NORMAL,
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
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

  updateContent(content: Content): Todo {
    this.content = content;
    return this;
  }

  getId(): string {
    return this.id;
  }

  getTitle(): Title {
    return this.title;
  }

  getContent(): Content {
    return this.content;
  }

  getStatus(): Status {
    return this.status;
  }

  getPriority(): Priority {
    return this.priority;
  }
}
