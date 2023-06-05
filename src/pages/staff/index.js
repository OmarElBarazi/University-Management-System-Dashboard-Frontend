import React from "react";

import { Link } from "react-router-dom";

import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageTitle from "../../components/Typography/PageTitle";
import GeneralTable from "../GeneralTable";

import { Button } from "@windmill/react-ui";

import { getStaff } from "../../redux/actions/userActions";

function Staff() {
  const dispatch = useDispatch();

  const history = useHistory();

  const staffGet = useSelector((state) => state.staffGet);
  const { staff } = staffGet;

  const userCreateAccount = useSelector((state) => state.userCreateAccount);
  const { user_create_account } = userCreateAccount;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { user_update } = userUpdate;

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
  }, [dispatch, user_create_account, user_update]);

  useEffect(() => {
    if (staff) {
      setRows(staff);
    }
  }, [staff]);

  const handleAddStaffButton = () => {
    const state = { createAccountForm: true };
    history.push("/app/Staff/Form", { state: state });
  };
  return (
    <>
      <div className="flex flex-row justify-between ">
        <PageTitle>Staff Page</PageTitle>
        <Button
          className="my-8 text-l font-semibold "
          onClick={handleAddStaffButton}
        >
          Add Staff
        </Button>
      </div>
      <GeneralTable columns={columns} rows={rows} />
    </>
  );
}

export default Staff;
