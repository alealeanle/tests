import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerEnd } from '@models/authSlice';
import s from './SuccessRegistrationPage.module.scss';

const SuccessRegistrationPage = () => {
  const dispatch = useDispatch();
  const handleBtn = dispatch(registerEnd);

  return (
    <div className={s.root}>
      <h2 className={s.title}>Успешная регистрация!</h2>
      <Link to={'/'}>
        <button onClick={handleBtn} className={s.signIn}>
          Войти
        </button>
      </Link>
    </div>
  );
};

export default SuccessRegistrationPage;
