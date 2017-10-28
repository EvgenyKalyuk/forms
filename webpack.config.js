import webpack from 'webpack';
import merge from 'webpack-merge';

import {commonConfig} from './config/common';
import {devConfig} from './config/dev';
import {prodConfig} from './config/prod';
import {NODE_ENV} from './bin/env-config';

const defineConfig = () => merge(commonConfig, NODE_ENV === 'production' ? prodConfig : devConfig);

export const compiler = webpack(defineConfig());
