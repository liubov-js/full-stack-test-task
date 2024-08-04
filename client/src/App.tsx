import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { InputMask } from '@react-input/mask';
import Button from './components/UI/button/Button';
import Input from './components/UI/input/Input';
import UserItem from './components/UserItem/UserItem';
import { User } from './types';
import main from './App.module.css';
import classes from './components/UI/input/Input.module.css';
import { NOT_VALID_EMAIL, NOT_VALID_NUMBER } from './constants';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [emailDirty, setEmailDirty] = useState<boolean>(false);
  const [numberDirty, setNumberDirty] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>('');
  const [numberError, setNumberError] = useState<string>('');
  const [formValid, setFormValid] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (email && !emailError && !numberError) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [emailError, numberError, email]);

  const searchUser = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const newAbortController = new AbortController();
    abortControllerRef.current = newAbortController;

    try {
      const users = await axios.get<User[]>(`http://localhost:3001/users?email=${email}&number=${number}`, {
        signal: newAbortController.signal,
      });
      setUsers(users.data);
    } catch(e) {
      console.log(e);
    }
  };

  const emailHandler = (e: string) => {
    setEmail(e);
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (!regex.test(String(e).toLowerCase())) {
      setEmailError(NOT_VALID_EMAIL);
    } else {
      setEmailError('');
    }
  }

  const numberHandler = (e: string) => {
    const number = e.split('-').join('');
    setNumber(number);
    
    if (number.length === 6 || number.length === 0) {
      setNumberError('');
    } else {
      setNumberError(NOT_VALID_NUMBER);
    }
  }

  const blurHandler = (type: 'email' | 'number') => {
    switch (type) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'number':
        setNumberDirty(true);
        break;
      default:
        return;
    }
  }
  
  return (
    <div className={main.app}>
      <form>
        <span>Email (required):</span>
        {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}
        <Input 
          type="email" 
          value={email} 
          onBlur={_ => blurHandler('email')}
          placeholder="example@mail.com"
          onChange={(e) => emailHandler(e.target.value)} 
        />
        <div>Number (optional):</div>
        {(numberDirty && numberError) && <div style={{color: 'red'}}>{numberError}</div>}
        <InputMask 
          mask="__-__-__" 
          replacement={{ _: /\d/ }} 
          placeholder="12-34-56" 
          className={classes.input} 
          onBlur={(_: React.FocusEvent<HTMLInputElement, Element>) => blurHandler('number')}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => numberHandler(e.target.value)} 
        />
        <Button onClick={(e) => searchUser(e)} disabled={!formValid}>submit</Button>
      </form>
      {users.map((user, i) => (
        <UserItem key={i} email={user.email} number={user.number} />
      ))}
    </div>
  );
}

export default App;
