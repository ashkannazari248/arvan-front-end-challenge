export enum ToastEnum{
    info='info',
    success='success',
    warning='warning',
    error='danger',
}

export interface ToastFace {
    message: string;
    type: ToastEnum;
    show: boolean
}