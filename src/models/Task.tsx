import { TaskStatus } from "./TaskStatus"

export interface ITask {

    id?: number // Not required to create a instance
    name: string
    status: TaskStatus
    description?: string // Not required field
    createdAt?: string // Not required field
    updatedAt?: string // Not required field

}

export class Task implements ITask {

    id?: number
    name: string
    status: TaskStatus
    description?: string
    createdAt?: string
    updatedAt?: string

    constructor();
    constructor(params: ITask = {} as ITask){
        let { id = 0, name = "", status = TaskStatus.NOVA, description = "", createdAt = "",  updatedAt} = params;
        this.id = id;
        this.name = name;
        this.status = status;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}

export type ITaskList = Array<ITask>;