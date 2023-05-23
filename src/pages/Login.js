import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageLight from '../assets/img/login-office.jpeg';
import ImageDark from '../assets/img/login-office-dark.jpeg';
import { Label, Input } from '@windmill/react-ui';
import { login } from '../redux/actions/userActions';

function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error } = userLogin;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill E-Mail and Password fields');
      return;
    }

    dispatch(login(email, password));
  };

  return (
    <div className='flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900'>
      <div className='flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800'>
        <div className='flex flex-col overflow-y-auto md:flex-row'>
          <div className='h-32 md:h-auto md:w-1/2'>
            <img
              aria-hidden='true'
              className='object-cover w-full h-full dark:hidden'
              src={ImageLight}
              alt='Office'
            />
            <img
              aria-hidden='true'
              className='hidden object-cover w-full h-full dark:block'
              src={ImageDark}
              alt='Office'
            />
          </div>
          <main className='flex items-center justify-center p-6 sm:p-12 md:w-1/2'>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className='w-full'>
                <h1 className='mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200'>
                  Login
                </h1>
                <Label>
                  <span>Email</span>
                  <Input
                    className='mt-1'
                    type='email'
                    placeholder='john@doe.com'
                    onChange={(e) => setEmail(e?.target?.value)}
                  />
                </Label>

                <Label className='mt-4'>
                  <span>Password</span>
                  <Input
                    className='mt-1'
                    type='password'
                    placeholder='***************'
                    onChange={(e) => setPassword(e?.target?.value)}
                  />
                </Label>

                {loading ? (
                  <p className='mt-4 p-2 border bg-purple-600 rounded-lg block w-full text-white'>
                    Loading
                  </p>
                ) : (
                  <button
                    className='mt-4 p-2 border bg-purple-600 rounded-lg block w-full text-white'
                    type='submit'
                  >
                    Log in
                  </button>
                )}

                {error && <p className='text-red-700'>{error}</p>}

                {/* <p className='mt-4'>
                  <Link
                    className='text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline'
                    to='/forgot-password'
                  >
                    Forgot your password?
                  </Link>
                </p> */}
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
