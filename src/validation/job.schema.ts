import { z } from 'zod';

export const jobSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty'),
  salary: z
    .string()
    .transform(val => Number(val))
    .refine(val => !isNaN(val) && val >= 0, { message: 'Salary must be a positive number' }),
  description: z.string().min(3, 'Description must be at least 3 characters long'),
  expLevel: z.enum(['Intern', 'Junior', 'MidLevel', 'Senior', 'Lead', 'Architect']),
});
