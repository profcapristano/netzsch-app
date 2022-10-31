import { ITask, ITaskList } from "../../models/Task";

function getTaskList(): ITaskList {
  const strTaskList = window.localStorage.getItem('taskList');
  const taskList: ITaskList = JSON.parse(strTaskList || "[]")
  return taskList;
}

function getNewId(taskList: ITaskList): number {
  const taskMaxId = taskList.reduce((before, now) => {
    const nowId = now.id || 0
    const beforeId = before.id || 0
    if(nowId > beforeId) {
      return now
    } else {
      return before
    }
  }, {} as ITask);
  return ((!taskMaxId.id ? 0 : taskMaxId.id)! + 1);
}

//Mock functions to mimic making an async request for data
export function getAll() {
  return new Promise<{ data: any }>((resolve) => {
    setTimeout(() => resolve({ data: getTaskList() }), 500)
  });
}

export function add(task: ITask) {
  return new Promise<{ data: ITask }>((resolve) => {
    const taskList: ITaskList = getTaskList()
    task.id = getNewId(taskList);
    taskList.push(task)
    window.localStorage.setItem('taskList', JSON.stringify(taskList));
    setTimeout(() => resolve({ data: task }), 500)
  });
}

export function deleteTask(id: number) {
  return new Promise<void>((resolve) => {
    let taskList: ITaskList = getTaskList()
    taskList = taskList.filter(task => task.id !== id)
    window.localStorage.setItem('taskList', JSON.stringify(taskList));
    setTimeout(() => resolve(), 500)
  });
}

export function update(newTask: ITask) {
  return new Promise<{ data: ITask }>((resolve) => {
    let taskList: ITaskList = getTaskList()
    taskList = taskList.map(task => {
      if(task.id !== newTask.id)
        return task
      return newTask
    })
    window.localStorage.setItem('taskList', JSON.stringify(taskList));
    setTimeout(() => resolve({ data: newTask }), 500)
  });
}
