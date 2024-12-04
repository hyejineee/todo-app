export interface TodoDto {
  id: string;
  title: string;
  content: string;
  priority: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
export interface TodosResponseDto<T> {
  data: T;
}
