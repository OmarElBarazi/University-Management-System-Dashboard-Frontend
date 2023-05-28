/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: "/app/Staff",
    icon: "PeopleIcon",
    name: "Satff",
    roles: ["admin"],
  },
  {
    path: "/app/Student",
    icon: "PeopleIcon",
    name: "Student",
    roles: ["admin", "staff"],
  },
  {
    path: "/app/Course",
    icon: "FormsIcon",
    name: "Course",
    roles: ["admin", "staff"],
  },
  {
    path: "/app/TimeTable",
    icon: "TablesIcon",
    name: "Time Table",
    roles: ["admin", "staff", "student"],
  },
  {
    path: "/app/Transcript",
    icon: "ModalsIcon",
    name: "Transcript",
    roles: ["admin", "staff", "student"],
  },
  {
    path: "/app/settings",
    icon: "OutlineCogIcon",
    name: "404 Page",
    roles: ["admin", "staff", "student"],
  },
];

export default routes;

// routes: [
//   {
//     path: '/app/users',
//     name: 'Members',
//   },
//   {
//     path: '/app/users',
//     name: 'Customers',
//   },
// ]
