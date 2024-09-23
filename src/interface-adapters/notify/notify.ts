export type NotifyUserAdapterProps = {
  message: string;
  messageStatus: 'error' | 'warning' | 'success';
  configOptions?: {
    background?: string,
    fontSize?: string,
    width?: string,
    height?: string,
    margin?:string,
  };
}

export interface NotifyUserAdapter {
  notify: (params: NotifyUserAdapterProps) => void;
}