import { query } from "express-validator";

export const validateQueryParams = [
  query('email').isEmail().withMessage('Email is required and must be valid'),
  query('number')
    .optional()
    .custom((value) => {
      if (!value) {
        return true;
      } else {
        return /^[0-9]{6}$/.test(value);
      }
    })
    .withMessage('Number must be 6 digits'),
];
