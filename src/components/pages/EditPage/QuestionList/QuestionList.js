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

  const handleRemoveQuestion = () => {
    if (!selectedQuestion) return;
    removeQuestion(setQuestions, selectedQuestion.key);
    setShowDeleteModal(false);
    resetSelected();
  };

  const handleCancelDelete = () => {
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
        title="Подтверждение действия"
        isOpen={showDeleteModal}
        setIsModalOpen={setShowDeleteModal}
        onCloseCallback={resetSelected}
      >
        <div className={s.modalDeleteText}>
          Удалить тест "{selectedQuestion?.title}" ?
        </div>
        <div className={s.modalBtnsWrap}>
          <button
            type="button"
            className={clsx(s.btn, s.modalDeleteBtn)}
            onClick={handleRemoveQuestion}
          >
            Удалить
          </button>
          <button type="button" className={s.btn} onClick={handleCancelDelete}>
            Отмена
          </button>
        </div>
      </Modal>
    </ul>
  );
};

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      question_type: PropTypes.string.isRequired,
      answer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      answers: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          key: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
          is_right: PropTypes.bool.isRequired,
        }),
      ),
    }).isRequired,
  ).isRequired,
  setQuestions: PropTypes.func.isRequired,
};

export default QuestionList;
