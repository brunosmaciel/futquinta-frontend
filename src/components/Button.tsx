import { HTMLAttributes } from 'react';

interface CustomButtonProps extends HTMLAttributes<HTMLButtonElement> {
  loadingClass: string;
}

export const Button = (props: CustomButtonProps) => {
  return <button className={props.loadingClass} {...props}></button>;
};
