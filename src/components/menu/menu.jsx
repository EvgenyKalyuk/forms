import React from 'react';
import {Link} from 'react-router';
import {CLIENT_PAGES} from "../../common/const";

export const Menu = () => (
  <ul>
    <li>
      <Link to={CLIENT_PAGES.PERSONAL}>Personal Form</Link>
      <Link to={CLIENT_PAGES.COMPLETE}>Complete Form</Link>
    </li>
  </ul>
);