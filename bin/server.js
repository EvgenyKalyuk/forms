import express from 'express';

import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { compiler } from '../webpack.config';

import { PORT, NODE_ENV } from './env-config';

const app = express();

app
  .set('view engine', 'pug')
  .set('views', path.join(__dirname, 'views'));

if (NODE_ENV === 'development') {
  console.log('===> Develop Mode');
  app
    .use(webpackDevMiddleware(compiler, {
      publicPath: '/'
    }))
    .use(webpackHotMiddleware(compiler));
}  else {
  console.log('===> Production Mode');

  app.use(express.static(path.join(__dirname, '..', 'dist')));

  compiler.run(err=> {
    if (err) throw err;
    console.log('===> Build created <===');
  });
}

app
  .use((req, res) => res.status(200).render('index'))

  .listen(PORT, (err) => {
    if (err) throw err;
    console.info(`===> Listening on port ${PORT}. Open up http://localhost:${PORT}/ in your browser.`);
});