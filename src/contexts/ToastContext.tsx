import { createContext, useState } from 'react';

type ToastType = {
  OpenToast: () => JSX.Element;
  isVisible: boolean;
  setVisibility: () => void;
};

const ToastContext = createContext({} as ToastType);

const ToastProvider = ({ children }: any) => {
  const [isVisible, setIsVisible] = useState(false);

  function setVisibility() {
    if (isVisible) {
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return;
    }

    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  }
  function OpenToast() {
    return (
      <>
        <div className="toast toast-top toast-start">
          <div className="alert alert-info">
            <div>
              <span>New message arrived.</span>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <ToastContext.Provider value={{ OpenToast, setVisibility, isVisible }}>
      {children}
    </ToastContext.Provider>
  );
};

export { ToastProvider, ToastContext };
