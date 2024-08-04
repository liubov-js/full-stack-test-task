import { FC, InputHTMLAttributes } from 'react';
import classes from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
}

const Input: FC<InputProps> = (props) => {
  return (
    <input {...props} className={classes.input} />
  );
};

export default Input;
