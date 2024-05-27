import {z} from 'zod';
import {REGEX} from '../constants/regex';
/*
 ** Validtaion schema for  email
 */
export const emailSchema = z.object({
  email: z.string().min(1, {message: 'Email required'}).email({message: 'Invalid email'}).toLowerCase(),
});
/*
 ** Validation schema for password
 */
export const passwordSchema = z.object({
  password: z.string().min(1, {message: 'Password required'}).regex(REGEX.password, {
    message: 'Invalid password it should on UpperCase, lowerCase, letter and one number',
  }),
});
/*
 ** Validation schema for confirmationCode
 */
export const confirmationCodeValidation = z.object({
  confirmationCode: z
    .string()
    .min(1, {message: 'Please enter a 6-digit OTP'})
    .length(6, {message: 'OTP must be exactly 6 characters'}),
});
/*
 ** Login form schema
 */
export const loginSchema = emailSchema.merge(passwordSchema);
/*
 ** Validation schema for firstName as well as for lastName
 */
export const namesSchema = z.object({
  firstName: z
    .string()
    .min(1, {message: 'firstName required'})
    .regex(REGEX.name, {
      message: 'Invalid firstName',
    })
    .max(30, 'firstName should be at least 30 characters')
    .refine(value => value.trim().length >= 3, {
      message: 'firstName too short',
    }),

  lastName: z
    .string()
    .min(1, {message: 'lastName required'})
    .regex(REGEX.name, {
      message: 'Invalid lastName',
    })
    .max(30, 'lastName should be at 30 characters')
    .refine(value => value.trim().length >= 3, {
      message: 'lastName too short',
    }),
});
/*
 ** Change password schema
 */
export const changePasswordSchema = z
  .object({
    password: z.string().regex(REGEX.password, {
      message: 'Invalid password it should on UpperCase, lowerCase, letter and one number',
    }),
    confirmPassword: z.string().regex(REGEX.password, {
      message: 'Inavlid password it should on UpperCase, lowerCase, letter and one number',
    }),
    oldPassword: z
      .string()
      .regex(REGEX.password, {
        message: 'Invalid password it should on UpperCase, lowerCase, letter and one number',
      })
      .optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  });
/*
 ** Validation schema for signup
 */
export const signupSchema = namesSchema.merge(loginSchema);
