import { z } from 'zod';

export const employeeSchema = z.object({
  name: z.string().min(1, 'Name cannot be empty'),
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(64, 'Password must be at most 64 characters long'),
  nationalId: z
    .string()
    .transform(val => Number(val))
    .refine(val => !isNaN(val) && (String(val).startsWith('2') || String(val).startsWith('3')), {
      message: 'Invalid Id',
    }),
  city: z.string().min(1, 'City cannot be empty'),
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  bio: z.string().min(3, 'Bio must be at least 3 characters long'),
  expLevel: z.enum(['Intern', 'Junior', 'MidLevel', 'Senior', 'Lead', 'Architect']),
});
