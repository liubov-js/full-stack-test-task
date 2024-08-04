import React, { FC, ReactNode } from 'react';
import classes from './Button.module.css';

interface ButtonProps {
  children: ReactNode;
  onClick: (e: React.MouseEvent) => void;
  [key: string]: any;
}

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} className={classes.btn}>
      {children}
    </button>
  );
}

export default Button;
