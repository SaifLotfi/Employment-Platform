import { prisma } from './src/libs/prisma.config';
import { CreateEmployeeDTO } from './src/types/dto/employee.dto';
import { hashPassword } from './src/utils/hash-password';

// Function to create an employee
const createEmployee = async (employeeData: CreateEmployeeDTO) => {
  const { name, email, password, nationalId, city, expLevel, title, bio } = employeeData;
  const employee = await prisma.employee.create({
    data: {
      name,
      email,
      password: await hashPassword(password),
      nationalId,
      city,
      expLevel,
      title,
      bio,
    },
  });
  return employee;
};

const seedEmployees = async () => {
  const employeesData: CreateEmployeeDTO[] = [
    {
      name: 'Tom Jackson',
      email: 'tjackson@example.com',
      password: 'password123',
      nationalId: '1234567890',
      city: 'New York',
      expLevel: 'Senior',
      title: 'Senior Developer',
      bio: 'Experienced developer in finance',
    },
    {
      name: 'Mary Clark',
      email: 'mclark@example.com',
      password: 'password123',
      nationalId: '0987654321',
      city: 'San Francisco',
      expLevel: 'Junior',
      title: 'Junior Developer',
      bio: 'Passionate about green technology',
    },
    {
      name: 'Anna Williams',
      email: 'awilliams@example.com',
      password: 'password123',
      nationalId: '1122334455',
      city: 'Chicago',
      expLevel: 'MidLevel',
      title: 'Backend Developer',
      bio: 'Specializes in building scalable server architectures',
    },
    {
      name: 'David Brown',
      email: 'dbrown@example.com',
      password: 'password123',
      nationalId: '2233445566',
      city: 'Los Angeles',
      expLevel: 'Lead',
      title: 'Tech Lead',
      bio: 'Experienced in leading cross-functional teams in tech projects',
    },
    {
      name: 'Emily Taylor',
      email: 'etaylor@example.com',
      password: 'password123',
      nationalId: '3344556677',
      city: 'Austin',
      expLevel: 'Senior',
      title: 'Full-Stack Developer',
      bio: 'Proficient in both frontend and backend development',
    },
    {
      name: 'Michael Lee',
      email: 'mlee@example.com',
      password: 'password123',
      nationalId: '4455667788',
      city: 'Seattle',
      expLevel: 'Junior',
      title: 'Frontend Developer',
      bio: 'Focused on creating responsive and interactive UI designs',
    },
    {
      name: 'Sarah Miller',
      email: 'smiller@example.com',
      password: 'password123',
      nationalId: '5566778899',
      city: 'Miami',
      expLevel: 'Intern',
      title: 'Software Engineering Intern',
      bio: 'Keen to learn and grow in the software development field',
    },
    {
      name: 'James Anderson',
      email: 'janderson@example.com',
      password: 'password123',
      nationalId: '6677889900',
      city: 'Boston',
      expLevel: 'MidLevel',
      title: 'DevOps Engineer',
      bio: 'Passionate about CI/CD and cloud infrastructure',
    },
    {
      name: 'Olivia Martinez',
      email: 'omartinez@example.com',
      password: 'password123',
      nationalId: '7788990011',
      city: 'Denver',
      expLevel: 'Architect',
      title: 'Software Architect',
      bio: 'Skilled in designing and overseeing complex system architectures',
    },
    {
      name: 'Ethan Davis',
      email: 'edavis@example.com',
      password: 'password123',
      nationalId: '8899001122',
      city: 'San Diego',
      expLevel: 'Senior',
      title: 'Data Scientist',
      bio: 'Expert in data analysis, machine learning, and AI development',
    },
    {
      name: 'Sophia Wilson',
      email: 'swilson@example.com',
      password: 'password123',
      nationalId: '9900112233',
      city: 'Phoenix',
      expLevel: 'Lead',
      title: 'Project Manager',
      bio: 'Extensive experience managing software development projects',
    },
    {
      name: 'Daniel Hernandez',
      email: 'dhernandez@example.com',
      password: 'password123',
      nationalId: '1011121314',
      city: 'Houston',
      expLevel: 'MidLevel',
      title: 'Mobile Developer',
      bio: 'Specialized in building iOS and Android mobile applications',
    },
  ];

  for (const employeeData of employeesData) {
    await createEmployee(employeeData);
  }
};

(async () => {
  await seedEmployees();
})();
