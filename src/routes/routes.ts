import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'Home Page', path: '/' });
});

router.get('/employee/signup', (req, res) => {
  res.render('signup', { title: 'signup', path: '/signup' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'login', path: '/login' });
});

export default router;
