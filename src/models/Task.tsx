import { TaskStatus } from "./TaskStatus"

export class Task {
    id?: number
    name: string
    status: TaskStatus
    description?: string
    createdAt?: string
    updatedAt?: string
  
    constructor(name: string, status: TaskStatus, description: string){
        this.name = name;
        this.status = status;
        this.description = description;
    }
}

export type TaskList = Array<Task>;