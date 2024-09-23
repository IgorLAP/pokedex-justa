import { NotifyUserAdapter } from "~/interface-adapters/notify";
import { NotifyUserProps, NotifyUserUseCase } from "../use-cases";

export class NotifyUserAppl implements NotifyUserUseCase {
  
  constructor(
    private readonly notifyUserAdapter: NotifyUserAdapter,
  ) {}

  notify (params: NotifyUserProps)  {
    this.notifyUserAdapter.notify({
      message: params.message,
      messageStatus: params.messageStatus,
    });
  };
}