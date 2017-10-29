import express from 'express';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import compression from 'compression';
import compiler from '../webpack.config';

import { PORT, NODE_ENV } from './env-config';

const app = express();

app
  .set('view engine', 'pug')
  .set('views', path.join(__dirname, 'views'));

if (NODE_ENV === 'production') {
  console.log('===> Production Mode');

  app.use(compression());
  app.use(express.static(path.join(__dirname, '..', 'dist')));
  compiler.run((err) => {
    if (err) throw err;
    console.log('===> Build created');
  });
} else {
  console.log('===> Develop Mode');
  app
    .use(webpackDevMiddleware(compiler, {
      publicPath: '/',
      noInfo: true,
    }))
    .use(webpackHotMiddleware(compiler));
}

app
  .use((req, res) => res.status(200).render('index', { env: NODE_ENV }))

  .listen(PORT, (err) => {
    if (err) throw err;
    console.info(`===> Listening on port ${PORT}. Open up http://localhost:${PORT}/ in your browser.`);
  });
