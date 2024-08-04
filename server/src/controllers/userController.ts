import fs from 'fs';
import { Request, Response } from 'express';
import { User } from '../types';

interface QueryParams {
  email: string;
  number: string;
}

export function getUsers(req: Request<{}, {}, {}, QueryParams>, res: Response) {
  const { email, number } = req.query;
  
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Error getting data',
      });
    }

    try {
      const users: User[] = JSON.parse(data);
      const filteredUsers = users.filter(
        (user) => user.email === email && user.number.toString().includes(number)
      );

      setTimeout(() => res.json(filteredUsers), 5000);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Error parsing data',
      });
    }
  });
};
