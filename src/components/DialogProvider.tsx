import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDialogStore, getDialogIcon } from "@/hooks/useDialog";

export const DialogProvider = () => {
  const { isOpen, type, title, message, confirmText, cancelText, onConfirm, onCancel, hideDialog } = useDialogStore();

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      hideDialog();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      hideDialog();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && hideDialog()}>
      <AlertDialogContent className="max-w-md rounded-3xl border-border/50 shadow-2xl">
        <AlertDialogHeader className="space-y-4">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              {getDialogIcon(type)}
            </div>
          </div>
          
          {/* Title */}
          <AlertDialogTitle className="text-center text-2xl font-display font-bold text-foreground">
            {title}
          </AlertDialogTitle>
          
          {/* Message */}
          <AlertDialogDescription className="text-center text-base text-muted-foreground leading-relaxed">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter className="flex-col sm:flex-row gap-3 mt-2">
          {type === 'confirm' && (
            <AlertDialogCancel 
              onClick={handleCancel}
              className="w-full sm:w-auto h-12 rounded-xl font-semibold hover:bg-muted transition-colors"
            >
              {cancelText}
            </AlertDialogCancel>
          )}
          <AlertDialogAction 
            onClick={handleConfirm}
            className={`w-full sm:w-auto h-12 rounded-xl font-semibold shadow-lg transition-all hover:scale-105 ${
              type === 'error' 
                ? 'bg-red-500 hover:bg-red-600' 
                : type === 'success' 
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-primary hover:bg-primary/90'
            }`}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
