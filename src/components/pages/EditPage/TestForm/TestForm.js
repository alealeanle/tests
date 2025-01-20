import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTestQuestions } from '@hooks/useTestQuestions';
import {
  getTestRequest,
  addTestRequest,
  editTestRequest,
} from '@models/testsSlice';
import QuestionList from '@EditPage/QuestionList';
import EditQuestions from '@EditPage/EditQuestions';
import Modal from '@commons/Modal';
import Loading from '@commons/Loading';
import s from './TestForm.module.scss';

const TestForm = ({ testId, initialTestTitle, setInitialTestTitle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    addQuestion,
    validateTest,
    addKeysForQuestionsAndAnswers,
    questionStructure,
  } = useTestQuestions();

  const { test, loading } = useSelector(state => state.tests);
  const [newTestTitle, setNewTestTitle] = useState('');
  const [questions, setQuestions] = useState([questionStructure]);
  const [newQuestionsOfEdit, setNewQuestionsOfEdit] = useState([]);
  const currentQuestions = !testId ? questions : newQuestionsOfEdit;
  const [initialQuestions, setInitialQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [errorsOfValidate, setErrorsOfValidate] = useState(new Set());

  useEffect(() => {
    if (testId) {
      dispatch(getTestRequest(testId));
    }
  }, [dispatch, testId]);

  useEffect(() => {
    if (testId && test) {
      setNewTestTitle(test.title || '');
      setInitialTestTitle(test.title);

      if (test.questions) {
        const updatedQuestions = addKeysForQuestionsAndAnswers(test);
        setQuestions(updatedQuestions);
        setInitialQuestions(updatedQuestions || []);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test, testId]);

  const handleAddQuestion = () => {
    if (!testId) {
      addQuestion(questions, setQuestions);
    } else {
      addQuestion(newQuestionsOfEdit, setNewQuestionsOfEdit);
    }
  };

  const validateForm = () => {
    validateTest(
      errorsOfValidate,
      setErrorsOfValidate,
      newTestTitle,
      questions,
      newQuestionsOfEdit,
    );

    if (errorsOfValidate.size) {
      handleShowModal();
      return false;
    }

    return true;
  };

  const handleResetErrors = () => {
    setTimeout(() => {
      setErrorsOfValidate(new Set());
    }, 250);
  };

  const handleSave = e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const action = testId
      ? editTestRequest({
          initialTestTitle,
          initialQuestions,
          newTestTitle,
          testId,
          questions: [...questions, ...newQuestionsOfEdit],
        })
      : addTestRequest({
          newTestTitle,
          questions: questions.map(({ key, ...question }) => ({
            ...question,
            ...(question.question_type !== 'number' && {
              answers: question.answers.map(({ key, ...answer }) => answer),
            }),
          })),
        });

    dispatch(action);

    if (!testId) {
      setNewTestTitle('');
      setQuestions([questionStructure]);
    } else {
      setNewQuestionsOfEdit([]);
    }

    navigate('/tests');
  };

  const handleShowModal = () => {
    setModalType('error');
    setShowModal(true);
  };

  const handleConfirmSave = () => {
    if (!validateForm()) {
      return;
    }
    setModalType('confirm');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setModalType(null);
    }, 300);
  };

  return loading ? (
    <Loading />
  ) : (
    <form className={s.addQuestion}>
      <label htmlFor="test_title" className={s.label}>
        Название теста:
      </label>
      <input
        id="test_title"
        type="text"
        className={s.input}
        placeholder="Введите название теста"
        value={newTestTitle}
        onChange={e => setNewTestTitle(e.target.value)}
      />

      {testId && (
        <QuestionList questions={questions} setQuestions={setQuestions} />
      )}

      <EditQuestions
        testId={testId}
        questions={questions}
        setQuestions={setQuestions}
        newQuestionsOfEdit={newQuestionsOfEdit}
        setNewQuestionsOfEdit={setNewQuestionsOfEdit}
        currentQuestions={currentQuestions}
      />

      <Modal
        title={modalType === 'error' ? 'Ошибка!' : 'Подтверждение'}
        isOpen={showModal}
        setIsModalOpen={setShowModal}
        setOther={handleResetErrors}
      >
        {modalType === 'error' ? (
          <ul className={s.errors}>
            {[...errorsOfValidate].map((error, index) => (
              <li key={index} className={s.error}>
                *{error}
              </li>
            ))}
          </ul>
        ) : (
          <div className={s.confirmation}>
            <p className={s.saveText}>
              Вы уверены, что хотите сохранить изменения?
            </p>
          </div>
        )}
        <div className={s.btnsWrap}>
          <button
            type="button"
            onClick={e => {
              if (modalType === 'error') {
                handleCloseModal();
                handleResetErrors();
              } else if (modalType === 'confirm') {
                handleCloseModal();
                handleSave(e);
              }
            }}
            className={clsx(s.saveTest, s.btn)}
          >
            {modalType === 'error' ? 'OK' : 'Сохранить'}
          </button>
          {modalType === 'confirm' && (
            <button
              type="button"
              onClick={handleCloseModal}
              className={clsx(s.saveTest, s.btn)}
            >
              Отмена
            </button>
          )}
        </div>
      </Modal>

      <button
        type="button"
        className={s.addQuestionBtn}
        onClick={handleAddQuestion}
      >
        +
      </button>
      <button type="button" className={s.saveTest} onClick={handleConfirmSave}>
        Сохранить тест
      </button>
    </form>
  );
};

TestForm.protoTypes = {
  testId: PropTypes.string,
  initialTestTitle: PropTypes.string,
  setInitialTestTitle: PropTypes.func,
};

export default TestForm;
