import clsx from 'clsx';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import TestForm from './TestForm';
import Header from '@commons/Header';
import Footer from '@commons/Footer';
import s from './EditPage.module.scss';

const EditPage = () => {
  const { testId } = useParams();
  const [initialTestTitle, setInitialTestTitle] = useState('');

  return (
    <div className={clsx(s.root, s._container)}>
      <Header />
      <h1 className={s.testTitle}>
        {!testId
          ? 'Создание теста'
          : `Редактирование теста "${initialTestTitle}"`}
      </h1>
      <div className={s.testBody}>
        {!testId ? (
          <TestForm />
        ) : (
          <TestForm
            testId={testId}
            initialTestTitle={initialTestTitle}
            setInitialTestTitle={setInitialTestTitle}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EditPage;
