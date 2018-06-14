export interface CourseInterface {
  id: number;
  creationDate: number;   // Unix epoch, seconds
  title: string;
  durationMin?: number;
  description?: string;
}
