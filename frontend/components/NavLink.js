import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavLink = ({ to, children }) => {
  return (
    <NavLink to={to} activeClassName="active">
      {children}
    </NavLink>
  );
};
