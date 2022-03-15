import { validateRequest } from "@weibuddies/common"
import { signUpUser } from "../controller/userController";
import { Router } from 'express';
import { body } from "express-validator"

const router = Router();

router.post('/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 50 })
      .withMessage('Password must be between 4 and 50 characters')
  ],
  validateRequest,
  signUpUser
)

export { router as signUpRouter };