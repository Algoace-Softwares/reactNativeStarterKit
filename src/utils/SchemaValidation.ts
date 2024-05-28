import {z} from 'zod';
import {REGEX} from '../constants/regex';
import {MESSAGES} from '../labels';
/*
 ** Validtaion schema for  email
 */
export const emailSchema = z.object({
  email: z.string().min(1, {message: MESSAGES.emailRequired}).email({message: MESSAGES.emailInvalid}).toLowerCase(),
});
/*
 ** Validation schema for password
 */
export const passwordSchema = z.object({
  password: z.string().min(1, {message: MESSAGES.passwordRequired}).regex(REGEX.password, {
    message: MESSAGES.passwordLength,
  }),
});
/*
 ** Validation schema for confirmationCode
 */
export const confirmationCodeValidation = z.object({
  confirmationCode: z.string().min(1, {message: MESSAGES.otpRequired}).length(6, {message: MESSAGES.otpLength}),
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
    .min(1, {message: MESSAGES.firstNameRequired})
    .regex(REGEX.name, {
      message: MESSAGES.firstNameInvalid,
    })
    .max(30, MESSAGES.firstNameLessLength)
    .refine(value => value.trim().length >= 3, {
      message: MESSAGES.firstNameShort,
    }),

  lastName: z
    .string()
    .min(1, {message: MESSAGES.lastNameRequired})
    .regex(REGEX.name, {
      message: MESSAGES.lastNameInvalid,
    })
    .max(30, MESSAGES.lastNameLessLength)
    .refine(value => value.trim().length >= 3, {
      message: MESSAGES.lastNameShort,
    }),
});
/*
 ** Change password schema
 */
export const changePasswordSchema = z
  .object({
    password: z.string().regex(REGEX.password, {
      message: MESSAGES.passwordLength,
    }),
    confirmPassword: z.string().regex(REGEX.password, {
      message: MESSAGES.passwordLength,
    }),
    oldPassword: z
      .string()
      .regex(REGEX.password, {
        message: MESSAGES.passwordLength,
      })
      .optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: MESSAGES.passwordNotMatch,
    path: ['confirmPassword'],
  });
/*
 ** Validation schema for signup
 */
export const signupSchema = namesSchema.merge(loginSchema);
