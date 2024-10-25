import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';

import globalErrorHandler from './middlewares/error-handler.middleware';
import employeeRouter from './routes/employee.routes';
import employerRouter from './routes/employer.routes';
import viewsRouter from './routes/routes';

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.set('views', 'src/views');

app.use(viewsRouter);

app.use(employeeRouter);

app.use(employerRouter);

app.use(globalErrorHandler);

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
