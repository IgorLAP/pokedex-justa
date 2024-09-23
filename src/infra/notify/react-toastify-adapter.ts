import { NotifyUserAdapter, NotifyUserAdapterProps } from "~/interface-adapters/notify";

import { toast } from "react-toastify";


export class ReactToastifyAdapter implements NotifyUserAdapter {
  
  constructor() {}

  notify (params: NotifyUserAdapterProps)  {
    toast[params.messageStatus](params.message, {
      theme: "colored",
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      rtl: false,
      pauseOnHover: true,
      pauseOnFocusLoss: true,
      draggable: true,
      style: {
        background: params.configOptions?.background ?? "",
        fontSize: params.configOptions?.fontSize ?? "",
        width: params.configOptions?.width ?? "",
        height: params.configOptions?.height ?? "",
        margin: params.configOptions?.margin ?? "",
      },
    })
  }
}