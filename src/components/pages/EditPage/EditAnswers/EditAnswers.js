import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Reorder } from 'framer-motion';
import { memo, useCallback, useState } from 'react';
import { useTestQuestions } from '@hooks/useTestQuestions';
import Modal from '@commons/Modal';
import s from './EditAnswers.module.scss';

const EditAnswers = ({
  testId,
  question,
  questions,
  setQuestions,
  newQuestionsOfEdit,
  setNewQuestionsOfEdit,
}) => {
  const {
    removeQuestion,
    questionChange,
    addAnswer,
    removeAnswer,
    answerChange,
  } = useTestQuestions();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletedItem, setDeletedItem] = useState(null);
  const [deleteType, setDeleteType] = useState(null);

  const handleQuestionChange = (field, value) => {
    if (testId) {
      questionChange(
        newQuestionsOfEdit,
        setNewQuestionsOfEdit,
        question.key,
        field,
        value,
      );
    } else {
      questionChange(setQuestions, question.key, field, value);
    }
  };

  const handleRemoveQuestion = () => {
    testId
      ? removeQuestion(setNewQuestionsOfEdit, question.key)
      : removeQuestion(setQuestions, question.key);

    setShowDeleteModal(false);
    resetDeleteStates();
  };

  const handleAnswerChange = (answer, field, value) => {
    if (testId) {
      answerChange(
        setNewQuestionsOfEdit,
        question.key,
        answer.key,
        field,
        value,
      );
    } else {
      answerChange(setQuestions, question.key, answer.key, field, value);
    }
  };

  const handleAddAnswer = () => {
    testId
      ? addAnswer(setNewQuestionsOfEdit, question.key)
      : addAnswer(setQuestions, question.key);
  };

  const handleRemoveAnswer = () => {
    testId
      ? removeAnswer(setNewQuestionsOfEdit, question.key, deletedItem.key)
      : removeAnswer(setQuestions, question.key, deletedItem.key);

    setShowDeleteModal(false);
    resetDeleteStates();
  };

  const resetDeleteStates = useCallback(() => {
    setTimeout(() => {
      setDeleteType(null);
      setDeletedItem(null);
    }, 300);
  }, []);

  if (question.question_type === 'number') {
    return (
      <div className={s.footer}>
        <input
          type="text"
          className={s.input}
          placeholder="Введите числовой ответ"
          value={question.answer ?? ''}
          onChange={e =>
            handleQuestionChange(
              'answer',
              e.target.value.replace(/[^0-9.-]/g, ''),
            )
          }
        />
        <button
          type="button"
          className={clsx(s.footerBtn, s.deleteQuestionBtn)}
          onClick={() => {
            setDeletedItem(question);
            setDeleteType('question');
            setShowDeleteModal(true);
          }}
        >
          Удалить вопрос
        </button>

        <Modal
          title="Подтверждение действия"
          isOpen={showDeleteModal}
          setIsModalOpen={setShowDeleteModal}
          onCloseCallback={resetDeleteStates}
        >
          <div className={s.modalDeleteText}>
            Удалить вопрос{' '}
            {`${deletedItem?.title && `'${deletedItem?.title}'`}`} ?
          </div>
          <div className={s.modalBtnsWrap}>
            <button
              type="button"
              className={clsx(s.btn, s.modalDeleteBtn)}
              onClick={handleRemoveQuestion}
            >
              Удалить
            </button>
            <button
              type="button"
              className={s.btn}
              onClick={() => {
                setShowDeleteModal(false);
                resetDeleteStates();
              }}
            >
              Отмена
            </button>
          </div>
        </Modal>
      </div>
    );
  }

  const setReorderAnswers = newOrder => {
    const setFunc =
      testId && setNewQuestionsOfEdit ? setNewQuestionsOfEdit : setQuestions;
    setFunc(prevQuestions =>
      prevQuestions.map(q =>
        q.key === question.key ? { ...q, answers: newOrder } : q,
      ),
    );
  };

  return (
    <>
      <Reorder.Group
        axys="y"
        values={question.answers}
        onReorder={setReorderAnswers}
        className={s.root}
      >
        {question.answers.map(answer => (
          <Reorder.Item
            value={answer}
            key={answer.key}
            className={s.answer}
            layout
            dragConstraints={{ top: 0, bottom: 0 }}
          >
            <button
              type="button"
              className={clsx('icon-delete', s.deleteBtn)}
              onClick={() => {
                setDeletedItem(answer);
                setDeleteType('answer');
                setShowDeleteModal(true);
              }}
            />
            <input
              type="text"
              className={s.input}
              placeholder="Введите текст ответа"
              value={answer.text}
              onChange={e => handleAnswerChange(answer, 'text', e.target.value)}
            />
            <div className={s.isRightWrap}>
              <input
                type={
                  question.question_type === 'single' ? 'radio' : 'checkbox'
                }
                className={clsx({
                  [s.radiobutton]: question.question_type === 'single',
                  [s.checkbox]: question.question_type === 'multiple',
                })}
                checked={answer.is_right}
                onChange={e =>
                  handleAnswerChange(answer, 'is_right', e.target.checked)
                }
              />
              <label
                className={clsx({
                  [s.isRight]: question.question_type === 'single',
                  [s.checkboxCheckMark]: question.question_type === 'multiple',
                })}
              />
              {question.question_type === 'multiple' && (
                <label className={s.checkboxFrame} />
              )}
            </div>
          </Reorder.Item>
        ))}

        <Modal
          title="Подтверждение действия"
          isOpen={showDeleteModal}
          setIsModalOpen={setShowDeleteModal}
          onCloseCallback={resetDeleteStates}
        >
          <div className={s.modalDeleteText}>
            {deleteType === 'question'
              ? `Удалить вопрос ${deletedItem?.title && `'${deletedItem?.title}'`}?`
              : `Удалить ответ ${deletedItem?.text && `'${deletedItem?.text}'`}?`}
          </div>
          <div className={s.modalBtnsWrap}>
            <button
              type="button"
              className={clsx(s.btn, s.modalDeleteBtn)}
              onClick={
                deleteType === 'question'
                  ? handleRemoveQuestion
                  : deleteType === 'answer'
                    ? handleRemoveAnswer
                    : null
              }
            >
              Удалить
            </button>
            <button
              type="button"
              className={s.btn}
              onClick={() => {
                setShowDeleteModal(false);
                resetDeleteStates();
              }}
            >
              Отмена
            </button>
          </div>
        </Modal>
      </Reorder.Group>
      <div className={s.footer}>
        <button
          type="button"
          className={clsx(s.footerBtn, s.addAnswerBtn)}
          onClick={handleAddAnswer}
        >
          Добавить ответ
        </button>
        <button
          type="button"
          className={clsx(s.footerBtn, s.deleteQuestionBtn)}
          onClick={() => {
            setDeletedItem(question);
            setDeleteType('question');
            setShowDeleteModal(true);
          }}
        >
          Удалить вопрос
        </button>
      </div>
    </>
  );
};

EditAnswers.propTypes = {
  testId: PropTypes.string,
  question: PropTypes.shape({
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
  questions: PropTypes.array.isRequired,
  setQuestions: PropTypes.func.isRequired,
  newQuestionsOfEdit: PropTypes.array,
  setNewQuestionsOfEdit: PropTypes.func,
};

export default memo(EditAnswers);
