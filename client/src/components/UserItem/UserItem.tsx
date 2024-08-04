import { FC } from 'react';
import { User } from '../../types';
import classes from './UserItem.module.css';

const UserItem: FC<User> = ({ email, number }) => {
  return (
    <div className={classes.user_item}>
      <div>email: {email}</div>
      <div>number: {number}</div>
    </div>
  );
}

export default UserItem;
