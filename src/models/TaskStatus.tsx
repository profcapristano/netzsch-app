export enum TaskStatus {
  NOVA = "NOVA",
  ANDAMENTO = "ANDAMENTO",
  CONCLUIDA = "CONCLUIDA",
}

export interface ITaskStatus {
    value: TaskStatus,
    label: string
}

export const ITaskStatusList: ITaskStatus[] = [
    { value: TaskStatus.NOVA, label: 'Nova' },
    { value: TaskStatus.ANDAMENTO, label: 'Andamento' },
    { value: TaskStatus.CONCLUIDA, label: 'Concluída' },
]