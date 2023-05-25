import React from "react";

import PageTitle from "../../components/Typography/PageTitle";
import UserTable from "../UserTable";

function Staff() {
  const columns = [
    { label: "Name", id: "name" },
    { label: "Surname", id: "surname" },
    { label: "Email", id: "email" },
    { label: "Role", id: "role" },
  ];
  return (
    <>
      <PageTitle>Staff</PageTitle>
      <UserTable columns={columns} rows={[]}/>
    </>
  );
}

export default Staff;
