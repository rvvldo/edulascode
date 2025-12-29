import { create } from 'zustand';
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react';

type DialogType = 'alert' | 'confirm' | 'success' | 'error' | 'info';

interface DialogState {
  isOpen: boolean;
  type: DialogType;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface DialogStore extends DialogState {
  showDialog: (config: Omit<DialogState, 'isOpen'>) => void;
  hideDialog: () => void;
  confirm: (message: string, title?: string) => Promise<boolean>;
  alert: (message: string, title?: string, type?: 'success' | 'error' | 'info') => Promise<void>;
}

export const useDialogStore = create<DialogStore>((set, get) => ({
  isOpen: false,
  type: 'alert',
  title: '',
  message: '',
  confirmText: 'OK',
  cancelText: 'Batal',
  
  showDialog: (config) => {
    set({
      isOpen: true,
      ...config,
    });
  },
  
  hideDialog: () => {
    set({ isOpen: false });
  },
  
  confirm: (message: string, title: string = 'Konfirmasi') => {
    return new Promise<boolean>((resolve) => {
      set({
        isOpen: true,
        type: 'confirm',
        title,
        message,
        confirmText: 'Ya',
        cancelText: 'Tidak',
        onConfirm: () => {
          get().hideDialog();
          resolve(true);
        },
        onCancel: () => {
          get().hideDialog();
          resolve(false);
        },
      });
    });
  },
  
  alert: (message: string, title: string = 'Pemberitahuan', type: 'success' | 'error' | 'info' = 'info') => {
    return new Promise<void>((resolve) => {
      set({
        isOpen: true,
        type: type as DialogType,
        title,
        message,
        confirmText: 'OK',
        onConfirm: () => {
          get().hideDialog();
          resolve();
        },
      });
    });
  },
}));

export const getDialogIcon = (type: DialogType) => {
  switch (type) {
    case 'success':
      return <CheckCircle2 className="w-12 h-12 text-green-500" />;
    case 'error':
      return <XCircle className="w-12 h-12 text-red-500" />;
    case 'info':
      return <Info className="w-12 h-12 text-blue-500" />;
    case 'confirm':
      return <AlertCircle className="w-12 h-12 text-amber-500" />;
    default:
      return <Info className="w-12 h-12 text-primary" />;
  }
};
