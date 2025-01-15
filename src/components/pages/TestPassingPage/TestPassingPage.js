import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getTestRequest } from '@models/testsSlice';
import QuestionComponent from './QuestionComponent';
import Header from '@commons/Header';
import Footer from '@commons/Footer';
import Modal from '@commons/Modal';
import Loading from '@commons/Loading';
import s from './TestPassingPage.module.scss';

const TestPassingPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { test, loading } = useSelector(state => state.tests);

  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(0);

  useEffect(() => {
    dispatch(getTestRequest(testId));
  }, [dispatch, testId]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinishTest();
    }
  };

  const handleFinishTest = () => {
    let rightAnswers = 0;

    test.questions.forEach(question => {
      if (question.question_type === 'single') {
        const rightOption = question.answers.find(answer => answer.is_right);
        if (rightOption && rightOption.id === answers[question.id]) {
          rightAnswers++;
        }
      } else if (question.question_type === 'multiple') {
        const rightOptions = question.answers
          .filter(answer => answer.is_right)
          .map(answer => answer.id);
        if (
          rightOptions.length === answers[question.id]?.length &&
          rightOptions.every(id => answers[question.id].includes(id))
        ) {
          rightAnswers++;
        }
      } else if (question.question_type === 'number') {
        if (question.answer === Number(answers[question.id])) {
          rightAnswers++;
        }
      }
    });

    setResult(rightAnswers);
    setShowModal(true);
  };

  const handleReturnToTests = () => {
    navigate('/tests');
  };

  const currentQuestion = test.questions?.[currentQuestionIndex];

  return loading ? (
    <Loading />
  ) : (
    <div className={clsx(s.root, s._container)}>
      <Header />
      {test.questions ? (
        <div className={s.body}>
          <h1 className={s.title}>{test.title}</h1>
          {currentQuestion ? (
            <>
              <QuestionComponent
                question={currentQuestion}
                answers={answers[currentQuestion.id] || []}
                onAnswerChange={value =>
                  handleAnswerChange(currentQuestion.id, value)
                }
              />
              <div className={s.btnWrap}>
                <button onClick={handleNextQuestion} className={s.btn}>
                  {currentQuestionIndex < test.questions.length - 1
                    ? 'Следующий вопрос'
                    : 'Закончить тест'}
                </button>
              </div>
            </>
          ) : (
            <div>Вопросы отсутствуют.</div>
          )}
          <Modal
            title={'Результат'}
            isOpen={showModal}
            setIsModalOpen={setShowModal}
          >
            <p className={s.resultText}>
              Количество правильных ответов:{' '}
              <span className={s.quantity}>
                {result} из {test.questions.length}
              </span>
            </p>
            <button
              type="button"
              className={clsx(s.btn, s.returnBtn)}
              onClick={handleReturnToTests}
            >
              Вернуться к списку тестов
            </button>
          </Modal>
        </div>
      ) : (
        <div>Загрузка теста...</div>
      )}
      <Footer />
    </div>
  );
};

export default TestPassingPage;
