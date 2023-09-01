import { useState } from 'react';

const useButtonLoading = () => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const setButtonLoading = (state: boolean) => {
    setIsButtonLoading(state);
  };

  return { setButtonLoading, isButtonLoading };
};

export { useButtonLoading };
