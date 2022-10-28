import { Task, TaskList } from "../../models/Task";

export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

function getTaskList(): TaskList {
  const strTaskList = window.localStorage.getItem('taskList');
  const taskList: TaskList = JSON.parse(strTaskList || "[]")
  return taskList;
}

function getNewId(taskList: TaskList): number {
  const taskMaxId = taskList.reduce((before, now) => {
    if(now.id! > before.id!) {
      return now
    } else {
      return before
    }
  });
  return (!taskMaxId ? 0 : taskMaxId.id)! + 1;
}

//Mock functions to mimic making an async request for data
export function getAll() {
  return new Promise<{ data: any }>((resolve) => {
    setTimeout(() => resolve({ data: getTaskList() }), 500)
  });
}

export function add(task: Task) {
  return new Promise<{ data: Task }>((resolve) => {
    const taskList: TaskList = getTaskList()
    task.id = getNewId(taskList);
    taskList.push(task)
    window.localStorage.setItem('taskList', JSON.stringify(taskList));
    setTimeout(() => resolve({ data: task }), 500)
  });
}

export function deleteTask(id: number) {
  return new Promise<void>((resolve) => {
    let taskList: TaskList = getTaskList()
    taskList = taskList.filter(task => task.id !== id)
    window.localStorage.setItem('taskList', JSON.stringify(taskList));
    setTimeout(() => resolve(), 500)
  });
}

export function update(newTask: Task) {
  return new Promise<{ data: Task }>((resolve) => {
    let taskList: TaskList = getTaskList()
    taskList = taskList.map(task => {
      if(task.id !== newTask.id)
        return task
      return newTask
    })
    window.localStorage.setItem('taskList', JSON.stringify(taskList));
    setTimeout(() => resolve({ data: newTask }), 500)
  });
}
