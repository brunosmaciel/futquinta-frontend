type WrapperProps = {
  children: React.ReactNode;
  hasBadge: boolean;
  text: string;
};
export const Wrapper = ({ children, hasBadge, text }: WrapperProps) => {
  return (
    <>
      {children ? (
        <>
          <div className="divider"></div>
          <div className="mx-2">
            {hasBadge ? (
              <h1 className="font-bold my-2">
                {text}{' '}
                <span className="indicator-item badge badge-primary bg-green-800 border-green-500 ">
                  Ao vivo
                </span>{' '}
              </h1>
            ) : (
              <h1 className="font-bold my-2">{text} </h1>
            )}
            <div className="flex flex-col gap-4">{children}</div>
          </div>
        </>
      ) : null}
    </>
  );
};
