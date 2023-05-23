import { lazy } from 'react';

//INDEX
import User from '../pages/users/index';
import Assets from '../pages/assets/index';

//CREATE
import UserCreate from '../pages/users/userCreate';

//UPDATE

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Page404 = lazy(() => import('../pages/404'));

const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    roles: ['admin', 'customer'],
  },
  {
    path: '/users',
    component: User,
    roles: ['admin'],
  },
  {
    path: '/users/create',
    component: UserCreate,
    roles: ['admin'],
  },
  {
    path: '/assets',
    component: Assets,
    roles: ['admin'],
  },
  {
    path: '/404',
    component: Page404,
    roles: ['admin', 'customer'],
  },
];

export default routes;
