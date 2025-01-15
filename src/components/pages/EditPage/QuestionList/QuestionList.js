import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useTestQuestions } from '@hooks/useTestQuestions';
import Question from './Question';
import Modal from '@commons/Modal';
import s from './QuestionList.module.scss';

const QuestionList = ({ questions, setQuestions }) => {
  const { removeQuestion } = useTestQuestions();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const resetSelected = useCallback(() => {
    setTimeout(() => {
      setSelectedQuestion(null);
    }, 200);
  }, []);

  const handleRemoveQuestion = (questions, setQuestions, question) => {
    if (!selectedQuestion) return;
    removeQuestion(questions, setQuestions, question.key);
    setShowDeleteModal(false);
    resetSelected();
  };

  return (
    <ul className={s.questionList}>
      {questions.map(question => (
        <Question
          key={question.key}
          question={question}
          questions={questions}
          setQuestions={setQuestions}
          setShowDeleteModal={setShowDeleteModal}
          setSelectedQuestion={setSelectedQuestion}
        />
      ))}

      <Modal
        title={'Подтверждение действия'}
        isOpen={showDeleteModal}
        setIsModalOpen={setShowDeleteModal}
        setOther={resetSelected}
      >
        <div className={s.modalDeleteText}>
          Удалить тест "{selectedQuestion?.title}" ?
        </div>
        <div className={s.modalBtnsWrap}>
          <button
            type="button"
            className={clsx(s.btn, s.modalDeleteBtn)}
            onClick={() =>
              handleRemoveQuestion(questions, setQuestions, selectedQuestion)
            }
          >
            Удалить
          </button>
          <button
            type="button"
            className={s.btn}
            onClick={() => {
              setShowDeleteModal(false);
              resetSelected();
            }}
          >
            Отмена
          </button>
        </div>
      </Modal>
    </ul>
  );
};

QuestionList.propTypes = {
  questions: PropTypes.array.isRequired,
  setQuestions: PropTypes.func.isRequired,
};

export default QuestionList;
