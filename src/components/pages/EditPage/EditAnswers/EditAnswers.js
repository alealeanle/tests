import PropTypes from 'prop-types';
import clsx from 'clsx';
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
      questionChange(questions, setQuestions, question.key, field, value);
    }
  };

  const handleRemoveQuestion = () => {
    testId
      ? removeQuestion(newQuestionsOfEdit, setNewQuestionsOfEdit, question.key)
      : removeQuestion(questions, setQuestions, question.key);

    setShowDeleteModal(false);
    resetDeleteStates();
  };

  const handleAnswerChange = (answer, field, value) => {
    if (testId) {
      answerChange(
        newQuestionsOfEdit,
        setNewQuestionsOfEdit,
        question.key,
        answer.key,
        field,
        value,
      );
    } else {
      answerChange(
        questions,
        setQuestions,
        question.key,
        answer.key,
        field,
        value,
      );
    }
  };

  const handleAddAnswer = () => {
    testId
      ? addAnswer(newQuestionsOfEdit, setNewQuestionsOfEdit, question.key)
      : addAnswer(questions, setQuestions, question.key);
  };

  const handleRemoveAnswer = () => {
    testId
      ? removeAnswer(
          newQuestionsOfEdit,
          setNewQuestionsOfEdit,
          question.key,
          deletedItem.key,
        )
      : removeAnswer(questions, setQuestions, question.key, deletedItem.key);

    setShowDeleteModal(false);
    resetDeleteStates();
  };

  const resetDeleteStates = useCallback(() => {
    setTimeout(() => {
      setDeleteType(null);
      setDeletedItem(null);
    }, 200);
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
          title={'Подтверждение действия'}
          isOpen={showDeleteModal}
          setIsModalOpen={setShowDeleteModal}
          setOther={resetDeleteStates}
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

  return (
    <div className={s.root}>
      {question.answers.map(answer => (
        <div key={answer.key} className={s.answer}>
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
              type={question.question_type === 'single' ? 'radio' : 'checkbox'}
              className={clsx({
                [s.radio]: question.question_type === 'single',
                [s.checkbox]: question.question_type === 'multiple',
              })}
              checked={answer.is_right}
              onChange={e =>
                handleAnswerChange(answer, 'is_right', e.target.checked)
              }
            />
            <label
              className={clsx({
                [s.radioLabel]: question.question_type === 'single',
                [s.checkboxLabel]: question.question_type === 'multiple',
              })}
            />
            {question.question_type === 'multiple' && (
              <label className={s.checkboxLabel2} />
            )}
          </div>
        </div>
      ))}
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

      <Modal
        title={'Подтверждение действия'}
        isOpen={showDeleteModal}
        setIsModalOpen={setShowDeleteModal}
        setOther={resetDeleteStates}
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
    </div>
  );
};

EditAnswers.propTypes = {
  testId: PropTypes.string,
  question: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  setQuestions: PropTypes.func.isRequired,
  newQuestionsOfEdit: PropTypes.array,
  setNewQuestionsOfEdit: PropTypes.func,
};

export default memo(EditAnswers);
