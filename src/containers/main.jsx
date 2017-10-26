import React from 'react';
import {Menu} from '../components/menu/menu';

export const MainContainer = ({ children }) => (
  <div>
    <Menu />
    {children}
  </div>
);