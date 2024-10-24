import express from 'express';

import viewsRouter from './routes/routes';

import employeeRouter from './routes/employee.routes';

import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.set('views', 'src/views');

app.use(viewsRouter);

app.use(employeeRouter);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
