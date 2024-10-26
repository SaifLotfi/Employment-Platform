import express from 'express';
import {Request, Response} from 'express';
import { authMiddleware, isAuth, isEmployer } from '../middlewares/auth.middleware';
import { jobController } from '../controllers/job.controller';

const router = express.Router();

router.get('/',authMiddleware,(_req:Request, res:Response) => {
  if (res.locals.userType === 'employee') {
    res.redirect('/job/suggested');
  } else if (res.locals.userType === 'employer') {
    res.redirect('/job/posted');
  }
  res.render('home', { title: 'Home Page', path: '/', userType:res.locals.userType });
});

router.get('/logout', (_req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

router.get('/employee/signup', (_req:Request, res:Response) => {
  res.render('employee-signup', { title: 'signup', path: '/signup',error:false  });
});

router.get('/employer/signup', (_req:Request, res:Response) => {
  res.render('employer-signup', { title: 'signup', path: '/signup',error:false   });
});

router.get('/employee/login', (_req:Request, res:Response) => {
  res.render('employee-login', { title: 'login', path: '/login',error:false   });
});

router.get('/employer/login', (_req:Request, res:Response) => {
  res.render('employer-login', { title: 'login', path: '/login',error:false   });
});

router.get('/job/post',isAuth,isEmployer, (_req:Request, res:Response) => {
  res.render('post-jobs', { title: 'Post Jobs', path: '/job/post',error:false   });
});

router.get('/job/posted', jobController.getPostedJobs);

router.get('/500',authMiddleware, (_req:Request, res:Response) => {
  res.render('500', { title: 'Server Side Error', path: '/500'});
});

router.get('*',authMiddleware,(_req:Request, res:Response) => {
  res.render('404', { title: 'Not Found', path: '/400' });
});

export default router;
