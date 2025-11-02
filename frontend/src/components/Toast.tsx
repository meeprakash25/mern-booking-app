import { useEffect, useState } from 'react'

type ToastMessageType = {
  message: string
  type: "SUCCESS" | "ERROR",
  onClose: () => void
}


const Toast = ({ message, type, onClose }: ToastMessageType) => {
  const [isVisible, setIsVisible] = useState(false); // initially hidden
  useEffect(() => {
    // trigger fade-in after mount
    const inTimeout = setTimeout(() => setIsVisible(true), 10); // short delay for transition to apply
    // trigger fade-out after duration
    const outTimeout = setTimeout(() => {
      setIsVisible(false); // trigger fade-out
      setTimeout(() => {
        onClose();
      }, 600); // fade-out duration increased
    }, 3000);
    return () => {
      clearTimeout(inTimeout);
      clearTimeout(outTimeout);
    };
  }, [onClose]);

  const styles =
    (type === 'SUCCESS'
      ? 'bg-green-800 '
      : 'bg-red-800 ') + 'fixed bottom-4 right-4 z-50 px-4 py-2 rounded-md text-white max-w-md toast-transition '
      + (isVisible ? 'toast-fade-in' : 'toast-fade-out');

  function closeToast(): void {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 600); // fade out manually if user clicks
  }

  return (
    <div onClick={closeToast} className={`${styles} cursor-pointer`}>
      <div className="flex justify-center items-center">
        <div className="text-lg font-normal">
          {message}
        </div>
      </div>
    </div>
  );
}

export default Toast