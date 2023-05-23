/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/dashboard', // the url
    icon: 'SearchIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
    roles: ['admin', 'customer'],
  },
  {
    icon: 'PeopleIcon',
    name: 'Users',
    roles: ['admin'],
    routes: [
      {
        path: '/app/users',
        name: 'Members',
      },
      {
        path: '/app/users',
        name: 'Customers',
      },
    ]
  },
  {
    path: '/app/assets',
    icon: 'SearchIcon',
    name: 'Assets',
    roles: ['admin'],
  },
  {
    path: '/app/settings',
    icon: 'OutlineCogIcon',
    name: '404 Page',
    roles: ['super_admin', 'admin', 'customer'],
  },
];

export default routes;
