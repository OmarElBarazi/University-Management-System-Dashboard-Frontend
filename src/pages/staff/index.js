import React from "react";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageTitle from "../../components/Typography/PageTitle";
import GeneralTable from "../GeneralTable";

import { Button } from "@windmill/react-ui";

import Buttons from "../Buttons";

import { getStaff } from "../../redux/actions/userActions";

function Staff() {
  const dispatch = useDispatch();

  const staffGet = useSelector((state) => state.staffGet);
  const { staff } = staffGet;

  //Static columns for the staff
  const columns = [
    { label: "Name", id: "name" },
    { label: "Surname", id: "surname" },
    { label: "Email", id: "email" },
    { label: "Role", id: "role" },
  ];

  //State for the rows of data
  const [rows, setRows] = useState([]);

  useEffect(() => {
    dispatch(getStaff());
  }, [dispatch]);

  useEffect(() => {
    if (staff) {
      setRows(staff);
    }
  }, [staff]);
  return (
    <>
      <div className="flex flex-row justify-between ">
        <PageTitle>Staff</PageTitle>
        <Button
          className="my-8 text-l font-semibold "
          tag={Link}
          to="/app/Staff/Create"
        >
          Create Staff
        </Button>
      </div>
      <GeneralTable columns={columns} rows={rows} />
    </>
  );
}

export default Staff;
