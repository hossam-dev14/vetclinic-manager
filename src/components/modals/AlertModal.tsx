import { Button } from '../ui/Button';
import { Modal } from './Modal';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export function AlertModal({ isOpen, onClose, title, message }: AlertModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={message}
      className="max-w-sm"
    >
      <div className="mt-6 flex justify-end">
        <Button onClick={onClose}>OK</Button>
      </div>
    </Modal>
  );
}
