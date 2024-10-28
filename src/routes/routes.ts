import express from 'express';
import { Request, Response } from 'express';

import { employeeController } from '../controllers/employee.controller';
import { jobController } from '../controllers/job.controller';
import { authMiddleware, isAuth, isEmployee, isEmployer } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', authMiddleware, (_req: Request, res: Response) => {
  if (res.locals.userType === 'employee') {
    res.redirect('/job/suggested');
  } else if (res.locals.userType === 'employer') {
    res.redirect('/job/posted');
  }
  res.render('home', { title: 'Home Page', path: '/', userType: res.locals.userType });
});

router.get('/logout', (_req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

router.get('/employee/signup', (_req: Request, res: Response) => {
  res.render('employee-signup', { title: 'signup', path: '/signup', error: false });
});

router.get('/employer/signup', (_req: Request, res: Response) => {
  res.render('employer-signup', { title: 'signup', path: '/signup', error: false });
});

router.get('/employee/login', (_req: Request, res: Response) => {
  res.render('employee-login', { title: 'login', path: '/login', error: false });
});

router.get('/employer/login', (_req: Request, res: Response) => {
  res.render('employer-login', { title: 'login', path: '/login', error: false });
});

router.get('/job/post', isAuth, isEmployer, (_req: Request, res: Response) => {
  res.render('post-jobs', { title: 'Post Jobs', path: '/job/post', error: false });
});

router.get('/job/posted', isAuth, isEmployer, async (req: Request, res: Response) => {
  const { jobs, currentPage, totalPages } = await jobController.getPostedJobs(req, res);
  res.render('posted-jobs', {
    title: 'Posted Jobs',
    path: '/job/posted',
    jobs,
    currentPage,
    totalPages,
  });
});

router.get('/employee/search', isAuth, isEmployer, async (req: Request, res: Response) => {
  const { employees, currentPage, totalPages, query } = await employeeController.getAllEmployees(
    req,
    res
  );

  res.render('search-for-employees', {
    title: 'Search For Employees',
    path: '/employee/search',
    employees,
    currentPage,
    totalPages,
    query,
  });
});

router.get('/job/search', isAuth, isEmployee, jobController.getAllJobs);

router.get('/job/suggested', isAuth, jobController.getSuggestedJobs);

router.get('/job/:id', isAuth, jobController.getJobById);

router.get('/employee/:id', isAuth, async (req: Request, res: Response) => {
  const { employee, userType } = await employeeController.getProfile(req, res);

  res.render('employee-profile', {
    title: 'Employee Profile',
    path: '/employee/:id',
    employee,
    userType,
  });
});

router.get('/500', authMiddleware, (_req: Request, res: Response) => {
  res.render('500', { title: 'Server Side Error', path: '/500', userType: res.locals.userType });
});

router.get('*', authMiddleware, (_req: Request, res: Response) => {
  res.render('404', { title: 'Not Found', path: '/404', userType: res.locals.userType });
});

export default router;
