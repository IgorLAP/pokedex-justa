export type NotifyUserProps = {
  message: string, 
  messageStatus: 'success' | 'warning' | 'error',
}

export interface NotifyUserUseCase {
  notify: (params: NotifyUserProps) => void;
}