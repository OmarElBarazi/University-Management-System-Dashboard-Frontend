import React, { useContext, useState } from 'react';
import { SidebarContext } from '../context/SidebarContext';
import {
  MoonIcon,
  SunIcon,
  MenuIcon,
  OutlinePersonIcon,
  OutlineLogoutIcon,
} from '../icons';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  WindmillContext,
} from '@windmill/react-ui';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/userActions';

function Header() {
  const dispatch = useDispatch();

  const { mode, toggleMode } = useContext(WindmillContext);
  const { toggleSidebar } = useContext(SidebarContext);

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className='z-40 py-4 bg-white shadow-bottom dark:bg-gray-800'>
      <div className='container flex items-center justify-end h-full px-6 mx-auto text-purple-600 dark:text-purple-300'>
        {/* <!-- Mobile hamburger --> */}
        <button
          className='p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple'
          onClick={toggleSidebar}
          aria-label='Menu'
        >
          <MenuIcon className='w-6 h-6' aria-hidden='true' />
        </button>
        <ul className='flex items-center flex-shrink-0 space-x-6'>
          {/* <!-- Theme toggler --> */}
          {/* <li className='flex'>
            <button
              className='rounded-md focus:outline-none focus:shadow-outline-purple'
              onClick={toggleMode}
              aria-label='Toggle color mode'
            >
              {mode === 'dark' ? (
                <SunIcon className='w-5 h-5' aria-hidden='true' />
              ) : (
                <MoonIcon className='w-5 h-5' aria-hidden='true' />
              )}
            </button>
          </li> */}

          {/* <!-- Profile menu --> */}
          <li className='relative'>
            <button
              className='rounded-full focus:shadow-outline-purple focus:outline-none'
              onClick={handleProfileClick}
              aria-label='Account'
              aria-haspopup='true'
            >
              <Avatar
                className='align-middle'
                src='https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82'
                alt=''
                aria-hidden='true'
              />
            </button>
            <Dropdown
              align='right'
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <DropdownItem tag='a' href='#'>
                <OutlinePersonIcon
                  className='w-4 h-4 mr-3'
                  aria-hidden='true'
                />
                <span>Profile</span>
              </DropdownItem>
              <DropdownItem onClick={() => handleLogout()}>
                <OutlineLogoutIcon
                  className='w-4 h-4 mr-3'
                  aria-hidden='true'
                />
                <span>Log out</span>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
