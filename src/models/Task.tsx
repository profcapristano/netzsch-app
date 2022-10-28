import { TaskStatus } from "./TaskStatus"

export class Task {
    id: number | undefined
    name: string
    status: TaskStatus
    description: string
    createdAt: Date | undefined
    updatedAt: Date | undefined
  
    constructor(name: string, status: TaskStatus, description: string){
        this.name = name;
        this.status = status;
        this.description = description;
    }
}

export type TaskList = Array<Task>;