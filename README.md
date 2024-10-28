# Employment-Platform

## Overview:
The platform allows software developers (employees) to register, showcase their skills, search for job vacancies, and apply for positions. Employers can post job openings, search for suitable candidates, and manage applications.

## Stakeholders:
- Employees: Search For Jobs and Apply For them.
- Employers: Post Jobs, Accept Job Applications, and Search for Employees

## Functional Requirements:
- The Employee/Employer shall be able to sign up using his email and set a password..
- The Employee/Employer shall be able to login using his email & password.
- The Employer shall be able to  post jobs and provide details. 
- The Employer shall be able to  search for Employees and filter them based on his preference 
- The Employer shall be able to Accept or Reject The Employees applications 
- The System shall send Acceptance or Rejection Emails to Employees
- The System shall suggest Jobs to Employees based on their information.
- The Employee shall search for jobs and filter them based on his preference.
- The Employee shall apply for a job.
- The System shall allow the Employee to view his profile information and the number of views of his profile.

## ER Diagram:
![ER Diagram](./docs/ER-Diagram.svg)

## Relational Data Model :
![Relational Data Model](./docs/Relational-Data-Model.png)

## Use Case Diagram:
![Use Case Diagram](./docs/use-cases-diagram.jpg)

## Tech Stack:
[![Technology Stack](https://skillicons.dev/icons?i=nodejs,express,ts,npm,prisma)](https://skillicons.dev)

## Installation:

### Requirements

- Node.js & Npm
- git

### Environment Variables

Fill in [exmaple.env](https://github.com/SaadMu7ammad/subul/blob/main/example.env) with your credentials and rename it to `.env`.

### Steps

```bash
git clone https://github.com/SaifLotfi/Employment-Platform.git
cd Employment-Platform
npm i
npm start
open localhost:3000
```
