import { useState } from 'react';

const useButtonLoading = () => {
  const [loadingClass, setLoadingClass] = useState<'loading' | 'not_loading'>('not_loading');

  const setButtonLoading = (state: boolean) => {
    if (state === true) {
      setLoadingClass('loading');
    }
    if (state === false) {
      setLoadingClass('not_loading');
    }
    return;
  };
  const isButtonLoading = loadingClass === 'loading' ? true : false;
  return { setButtonLoading, loadingClass, isButtonLoading };
};

export { useButtonLoading };
