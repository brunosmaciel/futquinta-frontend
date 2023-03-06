type ContainerProps = {
  children: React.ReactNode;
};
export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="container mx-auto min-h-screen flex flex-col justify-between">{children}</div>
  );
};
