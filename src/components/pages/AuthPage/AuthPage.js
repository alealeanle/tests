import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { loginRequest, registerRequest } from '@models/authSlice';
import s from './AuthPage.module.scss';

const AuthPage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, registrationSuccess, error } = useSelector(
    state => state.auth,
  );
  const location = useLocation();
  const isRegisterPage = location.pathname === '/signup';
  const navigate = useNavigate();

  const [signIn, setSignIn] = useState({
    username: '',
    password: '',
  });

  const [signUp, setSignUp] = useState({
    username: '',
    password: '',
    password_confirmation: '',
    is_admin: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value, checked } = e.target;
    if (!isRegisterPage) {
      setSignIn({
        ...signIn,
        [name]: value,
      });
    } else {
      setSignUp(prev => ({
        ...prev,
        [name]: name === 'showPass' ? checked : value,
        [name]: name === 'is_admin' ? checked : value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!isRegisterPage) {
      if (!signIn.username) {
        newErrors.username = 'Необходимо указать логин';
      }
      if (!signIn.password) {
        newErrors.password = 'Необходимо указать пароль';
      } else if (signIn.password.length < 8) {
        newErrors.password = 'Пароль должен быть не менее 8 символов';
      }
    } else {
      if (!signUp.username) {
        newErrors.username = 'Необходимо указать логин';
      }
      if (!signUp.password) {
        newErrors.password = 'Необходимо указать пароль';
      } else if (signUp.password.length < 8) {
        newErrors.password = 'Пароль должен быть не менее 8 символов';
      }
      if (!signUp.password_confirmation) {
        newErrors.password_confirmation = 'Необходимо подтвердить пароль';
      } else if (signUp.password !== signUp.password_confirmation) {
        newErrors.password_confirmation = 'Пароли не совпадают';
      }
    }
    return newErrors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    if (!isRegisterPage) {
      dispatch(loginRequest(signIn));
    } else {
      dispatch(registerRequest(signUp));
    }
  };

  const handleAuthBtn = () => {
    navigate(isRegisterPage ? '/' : '/signup');
  };

  useEffect(() => {
    if (isRegisterPage) {
      setSignIn({
        username: '',
        password: '',
      });
    } else {
      setSignUp({
        username: '',
        password: '',
        password_confirmation: '',
        is_admin: false,
      });
    }
    setErrors({});
  }, [isRegisterPage, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      setSignIn({
        username: '',
        password: '',
      });
      navigate('/tests');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (registrationSuccess) {
      setSignUp({
        username: '',
        password: '',
      });
      navigate('/registrationSuccess');
    }
  }, [registrationSuccess, navigate]);

  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className={s.root}>
      <button
        className={clsx(s.authBtn, {
          [s.signIn]: isRegisterPage,
          [s.signUp]: !isRegisterPage,
        })}
        onClick={handleAuthBtn}
      >
        {isRegisterPage ? 'signIn' : 'signUp'}
      </button>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.inputWrap}>
          <input
            type="text"
            name="username"
            placeholder="Логин"
            value={isRegisterPage ? signUp.username : signIn.username}
            onChange={handleChange}
            className={s.input}
          />
          <div className={s.errorWrap}>
            {errors.username && (
              <div className={s.inputError}>{errors.username}</div>
            )}
          </div>
        </div>
        <div className={s.inputWrap}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Пароль"
            value={isRegisterPage ? signUp.password : signIn.password}
            className={s.input}
            onChange={handleChange}
          />
          <div className={s.errorWrap}>
            {errors.password && (
              <div className={s.inputError}>{errors.password}</div>
            )}
          </div>
        </div>
        {isRegisterPage ? (
          <>
            <div className={s.inputWrap}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password_confirmation"
                placeholder="Подтверждение пароля"
                className={s.input}
                value={signUp.password_confirmation}
                onChange={handleChange}
              />
              <div className={s.errorWrap}>
                {errors.password_confirmation && (
                  <div className={s.inputError}>
                    {errors.password_confirmation}
                  </div>
                )}
              </div>
            </div>
            <div className={s.rowWrap}>
              <input
                name="showPass"
                className={s.checkbox}
                onChange={handleShowPassword}
                checked={showPassword}
                type="checkbox"
              />
              <label htmlFor="showPass" className={s.label}>
                Показать пароль
              </label>
            </div>
            <div className={s.rowWrap}>
              <input
                name="is_admin"
                className={s.checkbox}
                onChange={handleChange}
                checked={signUp.is_admin}
                type="checkbox"
              />
              <label htmlFor="is_admin" className={s.label}>
                Администратор
              </label>
            </div>
          </>
        ) : (
          <div className={s.rowWrap}>
            <input
              name="showPass"
              className={s.checkbox}
              onChange={handleShowPassword}
              checked={showPassword}
              type="checkbox"
            />
            <label htmlFor="showPass" className={s.label}>
              Показать пароль
            </label>
          </div>
        )}
        <button type="submit" className={s.submitButton}>
          {isRegisterPage ? 'Зарегистрироваться' : 'Войти'}
        </button>
        {error && <div className={s.authError}>{error}</div>}
      </form>
    </div>
  );
};

export default AuthPage;
