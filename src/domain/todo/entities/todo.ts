import { Status, Title } from '../vo';

export default class Todo {
  private id: string;
  private title: Title;
  private status: Status;

  constructor(id: string, title: Title, status: Status = Status.NOT_STARTED) {
    this.id = id;
    this.title = title;
    this.status = status;
  }

  updateTitle(title: Title): void {
    this.title = title;
  }

  updateStatus(status: Status): void {
    this.status = status;
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
}
