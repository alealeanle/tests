import { useRouteError } from 'react-router-dom';
import s from './ErrorPage.module.scss';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={s.root}>
      <h1 className={s.title}>Oops!</h1>
      <p className={s.text}>Sorry, an unexpected error has occurred.</p>
      <p className={s.text}>
        <i className={s.error}>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
