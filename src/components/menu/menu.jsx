import './menu.styl';
import React from 'react';
import PropTypes from 'prop-types';
import shortId from 'shortid';
import { Link } from 'react-router';

export const Menu = ({ items }) => (
  <ul className='menu'>
    {items.map(item => (
      <li
        className='menu__item'
        key={ shortId.generate() }>
        <Link
          activeClassName='menu__link_active'
          className='menu__link'
          to={ item.path }>
          { item.title }
        </Link>
      </li>
    ))}
  </ul>
);

Menu.propTypes = {
  items: PropTypes.array.isRequired,
};