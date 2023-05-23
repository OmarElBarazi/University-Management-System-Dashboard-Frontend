import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageTitle from '../../components/Typography/PageTitle';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Button,
  Pagination,
  Avatar,
} from '@windmill/react-ui';
import { EditIcon, TrashIcon } from '../../icons';
import { listUsers, deleteUser } from '../../redux/actions/userActions';
import { Link } from 'react-router-dom';

const UserList = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: userDeleteSuccess } = userDelete;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, userDeleteSuccess]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <>
      <div className='flex justify-between my-5'>
        <PageTitle>Users List</PageTitle>
        <Button size='large' className='my-5' tag={Link} to='/app/users/create'>
          New Employee
        </Button>
      </div>
      <TableContainer className='mb-8'>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Deleted</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {users &&
              users?.items
                .filter((user) => !user.is_deleted)
                .map((user, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Avatar
                        size='large'
                        src={
                          user.avatar
                            ? user.avatar
                            : 'https://picsum.photos/200'
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <p className='text-sm'>{user.name}</p>
                    </TableCell>
                    <TableCell>
                      <span className='text-sm'>{user.email}</span>
                    </TableCell>
                    <TableCell>
                      <Badge type={user.status}>{user.roles[0]}</Badge>
                    </TableCell>
                    <TableCell>
                      <p className='text-sm'>
                        {user.is_deleted ? (
                          <Badge type='success'>YES</Badge>
                        ) : (
                          <Badge type='danger'>NO</Badge>
                        )}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center space-x-4'>
                        <Button layout='link' size='icon' aria-label='Edit'>
                          <EditIcon className='w-5 h-5' aria-hidden='true' />
                        </Button>
                        <Button
                          layout='link'
                          size='icon'
                          aria-label='Delete'
                          onClick={() => handleDelete(user.id)}
                        >
                          <TrashIcon className='w-5 h-5' aria-hidden='true' />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={users ? users.total : 0}
            resultsPerPage={users ? users.count : 0}
            onChange={() => console.log('changed')}
            label='Table navigation'
          />
        </TableFooter>
      </TableContainer>
    </>
  );
};

export default UserList;
