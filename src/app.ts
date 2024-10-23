import express from 'express';

import homeRouter from './routes/routes';

const app = express();

app.set('view engine', 'ejs');

app.set('views', 'src/views');

app.use(homeRouter);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
