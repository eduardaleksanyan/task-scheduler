export interface Task {
  _id: string,
  name: string,
  type: string,
  date?: string,
  cron?: string,
  isActive: boolean
}

export interface FormFields extends Omit<Task, '_id'> {
  _id?: string;
}