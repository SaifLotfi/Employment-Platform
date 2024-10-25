import express from 'express';
import {Request, Response} from 'express';

const router = express.Router();

router.get('/', (_req:Request, res:Response) => {
  res.render('home', { title: 'Home Page', path: '/'});
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

router.get('/500', (_req:Request, res:Response) => {
  res.render('500', { title: 'Server Side Error', path: '/500'});
});

router.get('*',(_req:Request, res:Response) => {
  res.render('404', { title: 'Not Found', path: '/400' });
});

export default router;
