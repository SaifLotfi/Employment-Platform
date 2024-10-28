# Employment-Platform

## Overview
The platform allows software developers (employees) to register, showcase their skills, search for job vacancies, and apply for positions. Employers can post job openings, search for suitable candidates, and manage applications.

## Table of Contents
- [Overview](#overview)
- [Stakeholders](#stakeholders)
- [Functional Requirements](#functional-requirements)
- [Features](#features)
- [ER Diagram](#er-diagram)
- [Relational Data Model](#relational-data-model)
- [Use Case Diagram](#use-case-diagram)
- [Tech Stack](#tech-stack)
- [TODOs](#todos)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

## Stakeholders
- **Employees**: Search For Jobs and Apply For them.
- **Employers**: Post Jobs, Accept Job Applications, and Search for Employees.

## Functional Requirements
This platform provides the following capabilities for both Employees and Employers.

### Employee
- Sign up using email and set a password.
- Login using email & password.
- Search for jobs and filter them based on preference.
- Apply for a job.
- View profile information, including profile views.

### Employer
- Sign up using email and set a password.
- Login using email & password.
- Post jobs with detailed descriptions.
- Search for employees and filter by criteria.
- Accept or reject job applications.

### System
- Send acceptance or rejection emails to employees. (Not done yet)
- Suggest jobs to employees based on profile information.

## Features
- User Authentication (Signup and Login)
- Job Posting and Application Management
- Job Search with Filtering Capabilities
- Profile Management for Employees
- Suggested Job Recommendations

## ER Diagram
The ER Diagram visualizes the relationships between different entities in the system.

![ER Diagram](./docs/ER-Diagram.svg)

## Relational Data Model
The Relational Data Model maps the ER diagram into relational tables for database design.

![Relational Data Model](./docs/Relational-Data-Model.png)

## Use Case Diagram
This diagram highlights the core use cases for both Employees and Employers on the platform.

![Use Case Diagram](./docs/use-cases-diagram.jpg)

## Tech Stack
[![Technology Stack](https://skillicons.dev/icons?i=nodejs,express,ts,npm,postgres,prisma)](https://skillicons.dev)
![ejs](https://ejs.co/favicon.svg)
![zod](https://zod.dev/static/favicon.ico)

## TODOs
- [ ] Add Filter by Company
- [ ] Add Filter by Programming Languages
- [ ] Add Delete & Update Jobs Logic

## Installation

### Prerequisites
- Node.js & npm
- Git

### Environment Variables
Fill in [example.env](https://github.com/SaifLotfi/Employment-Platform/blob/main/example.env) with your credentials and rename it to `.env`.

### Steps
```bash
git clone https://github.com/SaifLotfi/Employment-Platform.git
cd Employment-Platform
npm install
npm start
```
### Usage
Access The Application on [localhost:3000](localhost:3000)
## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.
## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) for details
