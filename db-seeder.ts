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
    {
      "name": "Lily Thompson",
      "email": "lthompson@example.com",
      "password": "password123",
      "nationalId": "1112131415",
      "city": "Portland",
      "expLevel": "Junior",
      "title": "Junior Data Analyst",
      "bio": "Analytical mindset with a focus on data visualization and reporting."
    },
    {
      "name": "Jack White",
      "email": "jwhite@example.com",
      "password": "password123",
      "nationalId": "1213141516",
      "city": "Atlanta",
      "expLevel": "Senior",
      "title": "Data Engineer",
      "bio": "Experienced in data pipelines, ETL processes, and database management."
    },
    {
      "name": "Grace Baker",
      "email": "gbaker@example.com",
      "password": "password123",
      "nationalId": "1314151617",
      "city": "Orlando",
      "expLevel": "Lead",
      "title": "UI/UX Designer",
      "bio": "Focuses on user-centered design for enhanced user experience."
    },
    {
      "name": "Lucas Perez",
      "email": "lperez@example.com",
      "password": "password123",
      "nationalId": "1415161718",
      "city": "Philadelphia",
      "expLevel": "MidLevel",
      "title": "Database Administrator",
      "bio": "Expert in database optimization and query tuning."
    },
    {
      "name": "Ella Rivera",
      "email": "erivera@example.com",
      "password": "password123",
      "nationalId": "1516171819",
      "city": "Charlotte",
      "expLevel": "Intern",
      "title": "Junior Software Engineer",
      "bio": "Recent graduate eager to start a career in software development."
    },
    {
      "name": "Liam Murphy",
      "email": "lmurphy@example.com",
      "password": "password123",
      "nationalId": "1617181920",
      "city": "Detroit",
      "expLevel": "Senior",
      "title": "System Analyst",
      "bio": "Experienced in system optimization and process improvement."
    },
    {
      "name": "Zoe Carter",
      "email": "zcarter@example.com",
      "password": "password123",
      "nationalId": "1718192021",
      "city": "Nashville",
      "expLevel": "Junior",
      "title": "Frontend Engineer",
      "bio": "Focused on delivering clean and responsive web interfaces."
    },
    {
      "name": "Ryan Foster",
      "email": "rfoster@example.com",
      "password": "password123",
      "nationalId": "1819202122",
      "city": "Columbus",
      "expLevel": "MidLevel",
      "title": "Cybersecurity Specialist",
      "bio": "Expert in securing systems and preventing security breaches."
    },
    {
      "name": "Harper Collins",
      "email": "hcollins@example.com",
      "password": "password123",
      "nationalId": "1920212223",
      "city": "Las Vegas",
      "expLevel": "Architect",
      "title": "Solutions Architect",
      "bio": "Designs scalable and efficient tech solutions for complex problems."
    },
    {
      "name": "Mason Reed",
      "email": "mreed@example.com",
      "password": "password123",
      "nationalId": "2021222324",
      "city": "Kansas City",
      "expLevel": "Lead",
      "title": "QA Lead",
      "bio": "Specializes in quality assurance and testing automation."
    },
    {
      "name": "Isabella Cooper",
      "email": "icooper@example.com",
      "password": "password123",
      "nationalId": "2021222325",
      "city": "Dallas",
      "expLevel": "Junior",
      "title": "Content Strategist",
      "bio": "Adept at creating engaging content and digital marketing strategies."
    },
    {
      "name": "Nathaniel Hughes",
      "email": "nhughes@example.com",
      "password": "password123",
      "nationalId": "2122232426",
      "city": "Indianapolis",
      "expLevel": "Senior",
      "title": "Cloud Engineer",
      "bio": "Specializes in cloud infrastructure and service integration."
    },
    {
      "name": "Maya Ramirez",
      "email": "mramirez@example.com",
      "password": "password123",
      "nationalId": "2223242527",
      "city": "San Jose",
      "expLevel": "Lead",
      "title": "Product Manager",
      "bio": "Experienced in leading cross-functional teams to deliver products."
    },
    {
      "name": "Jackson Bell",
      "email": "jbell@example.com",
      "password": "password123",
      "nationalId": "2324252628",
      "city": "Salt Lake City",
      "expLevel": "MidLevel",
      "title": "IT Support Specialist",
      "bio": "Provides technical support and IT solutions to optimize workflows."
    },
    {
      "name": "Ruby Flores",
      "email": "rflores@example.com",
      "password": "password123",
      "nationalId": "2425262729",
      "city": "Omaha",
      "expLevel": "Junior",
      "title": "SEO Specialist",
      "bio": "Focused on improving search rankings through SEO best practices."
    },
    {
      "name": "Evan Butler",
      "email": "ebutler@example.com",
      "password": "password123",
      "nationalId": "2526272830",
      "city": "Tucson",
      "expLevel": "MidLevel",
      "title": "Network Engineer",
      "bio": "Expertise in network design and troubleshooting."
    },
    {
      "name": "Savannah Ross",
      "email": "sross@example.com",
      "password": "password123",
      "nationalId": "2627282931",
      "city": "Cleveland",
      "expLevel": "Architect",
      "title": "Infrastructure Architect",
      "bio": "Designs and implements resilient infrastructure systems."
    },
    {
      "name": "Carter Mitchell",
      "email": "cmitchell@example.com",
      "password": "password123",
      "nationalId": "2728293032",
      "city": "Buffalo",
      "expLevel": "Lead",
      "title": "Scrum Master",
      "bio": "Ensures agile processes are followed for team efficiency."
    },
    {
      "name": "Penelope Edwards",
      "email": "pedwards@example.com",
      "password": "password123",
      "nationalId": "2829303133",
      "city": "Raleigh",
      "expLevel": "Senior",
      "title": "Web Developer",
      "bio": "Experienced in building responsive web applications."
    },
    {
      "name": "Oliver Ward",
      "email": "oward@example.com",
      "password": "password123",
      "nationalId": "2930313234",
      "city": "Tampa",
      "expLevel": "Junior",
      "title": "Digital Marketing Associate",
      "bio": "Assists with marketing campaigns and social media management."
    },
    {
      "name": "Madelyn Wood",
      "email": "mwood@example.com",
      "password": "password123",
      "nationalId": "3031323335",
      "city": "Sacramento",
      "expLevel": "Intern",
      "title": "Data Science Intern",
      "bio": "Exploring data-driven solutions in AI and machine learning."
    },
    {
      "name": "Henry Brooks",
      "email": "hbrooks@example.com",
      "password": "password123",
      "nationalId": "3132333436",
      "city": "Long Beach",
      "expLevel": "MidLevel",
      "title": "Systems Engineer",
      "bio": "Focuses on systems integration and performance tuning."
    },
    {
      "name": "Sofia James",
      "email": "sjames@example.com",
      "password": "password123",
      "nationalId": "3233343537",
      "city": "New Orleans",
      "expLevel": "Senior",
      "title": "Backend Developer",
      "bio": "Specializes in server-side development and API design."
    },
    {
      "name": "Aiden Turner",
      "email": "aturner@example.com",
      "password": "password123",
      "nationalId": "3334353638",
      "city": "Louisville",
      "expLevel": "Junior",
      "title": "UX Researcher",
      "bio": "Conducts user research to improve usability and accessibility."
    },
    {
      "name": "Addison King",
      "email": "aking@example.com",
      "password": "password123",
      "nationalId": "3435363739",
      "city": "Albuquerque",
      "expLevel": "MidLevel",
      "title": "Blockchain Developer",
      "bio": "Develops decentralized applications and smart contracts."
    },
    {
      "name": "Leo Bennett",
      "email": "lbennett@example.com",
      "password": "password123",
      "nationalId": "3536373840",
      "city": "Milwaukee",
      "expLevel": "Lead",
      "title": "Application Support Lead",
      "bio": "Ensures application reliability and user satisfaction."
    },
    {
      "name": "Brooklyn Rivera",
      "email": "brivera@example.com",
      "password": "password123",
      "nationalId": "3637383941",
      "city": "Virginia Beach",
      "expLevel": "Senior",
      "title": "Embedded Systems Engineer",
      "bio": "Experienced in firmware development for embedded systems."
    },
    {
      "name": "Lincoln Lee",
      "email": "llee@example.com",
      "password": "password123",
      "nationalId": "3738394042",
      "city": "Oakland",
      "expLevel": "Junior",
      "title": "Social Media Coordinator",
      "bio": "Focused on increasing brand awareness through social media."
    },
    {
      "name": "Scarlett Young",
      "email": "syoung@example.com",
      "password": "password123",
      "nationalId": "3839404143",
      "city": "Memphis",
      "expLevel": "Architect",
      "title": "Software Solutions Architect",
      "bio": "Designs complex software solutions to meet customer needs."
    },
    {
      "name": "Elijah Collins",
      "email": "ecollins@example.com",
      "password": "password123",
      "nationalId": "3940414244",
      "city": "Richmond",
      "expLevel": "Intern",
      "title": "DevOps Intern",
      "bio": "Learning CI/CD, automation, and infrastructure management."
    },
    {
      "name": "Ariana Scott",
      "email": "ascott@example.com",
      "password": "password123",
      "nationalId": "4041424345",
      "city": "Louisville",
      "expLevel": "Junior",
      "title": "Business Analyst",
      "bio": "Assists with data-driven decision-making and process improvements."
    },
    {
      "name": "Julian Morris",
      "email": "jmorris@example.com",
      "password": "password123",
      "nationalId": "4142434446",
      "city": "St. Louis",
      "expLevel": "MidLevel",
      "title": "AI Engineer",
      "bio": "Develops algorithms and models for AI and machine learning."
    },
    {
      "name": "Stella Wright",
      "email": "swright@example.com",
      "password": "password123",
      "nationalId": "4243444547",
      "city": "Oklahoma City",
      "expLevel": "Senior",
      "title": "Software Developer",
      "bio": "Experienced in building high-quality software applications."
    }
  ];

  for (const employeeData of employeesData) {
    await createEmployee(employeeData);
  }
};

(async () => {
  await seedEmployees();
})();
