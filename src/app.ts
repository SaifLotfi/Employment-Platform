import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';
import cookieParser from 'cookie-parser';

import globalErrorHandler from './middlewares/error-handler.middleware';
import employeeRouter from './routes/employee.routes';
import employerRouter from './routes/employer.routes';
import viewsRouter from './routes/views.routes';
import jobRouter from './routes/job.routes';

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.set('view engine', 'ejs');

app.set('views', 'src/views');

app.use(employeeRouter);

app.use(employerRouter);

app.use(jobRouter);

app.use(viewsRouter);

app.use(globalErrorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log('App listening on port 3000!');
});
