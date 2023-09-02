import Logo from './ui/Logo';

const LoadingSpin = () => {
  return (
    <div role="status" className="container-height flex items-center justify-center">
      <span className=""></span>
      <Logo className="h-28 w-28 animate-bounce" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export { LoadingSpin };
