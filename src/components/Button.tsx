import { ComponentProps, HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

interface IButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean;
}

export const Button = ({ isLoading, className, ...props }: IButtonProps) => {
  return <button className={cn(className, isLoading && 'loading')} {...props}></button>;
};
