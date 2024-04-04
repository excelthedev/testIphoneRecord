/* eslint-disable @typescript-eslint/no-explicit-any */
import { FORM_ACTION } from "../utils/helpers";
/* eslint-disable @typescript-eslint/no-namespace */
export namespace State {
  export interface AppState {
    selectedWordMeaning?: string;
    selectedLanguage?: string;
    request: any;
    response: any;
    selectUrl?: string;
    record: any;
    action?: FORM_ACTION;
    postUrl: string;
    getUrl: string;
    updateUrl: string;
    uploadUrl?: string;
    getPostUrl?: string;
    deleteUrl: string;
    userId?: string;
    currentStep: number;
  }
  export class ModalProps {
    openModal?: boolean;
    handleCancel?: any;
    modalTitle?: string;
    modalFooter?: any;
    onOk?: any;
    children?: any;
    cancelText?: string;
    okText?: any;
    modalWith?: string;
    centered?: boolean;
    maskClosable?: boolean;
    closable?: boolean;
    closeIcon?: any;
    className?: string;
  }
}
