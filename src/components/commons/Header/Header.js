import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { logoutRequest } from '@models/authSlice';
import s from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  return (
    <header className={s.header}>
      {isAuthenticated && (
        <button className={clsx(s.btn, s.logout)} onClick={handleLogout}>
          Выйти
        </button>
      )}
    </header>
  );
};

export default Header;
