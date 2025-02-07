import clsx from 'clsx';
import PropTypes from 'prop-types';
import { memo, useCallback, useState } from 'react';
import EditQuestionForm from '@EditPage/EditQuestionForm';
import EditAnswers from '@EditPage/EditAnswers';
import s from './Question.module.scss';

const Question = ({
  question,
  questions,
  setQuestions,
  setShowDeleteModal,
  setSelectedQuestion,
}) => {
  const [editingQuestionKey, setEditingQuestionKey] = useState([]);
  const [showAnswersForQuestion, setShowAnswersForQuestion] = useState([]);

  const toggleAnswersVisibility = key => {
    setShowAnswersForQuestion(prevState =>
      prevState.includes(key)
        ? prevState.filter(k => k !== key)
        : [...prevState, key],
    );
  };

  const handleEditQuestion = useCallback(
    question => {
      setEditingQuestionKey(prevState => [...prevState, question.key]);
      setShowAnswersForQuestion(prevState => [...prevState, question.key]);
    },
    [editingQuestionKey, showAnswersForQuestion],
  );

  const handleDeleteQuestion = question => {
    setSelectedQuestion(question);
    setShowDeleteModal(true);
  };

  return (
    <li className={s.question}>
      {!editingQuestionKey.includes(question.key) ? (
        <>
          <div className={s.questionHeader}>
            <button
              type="button"
              className={clsx(s.itemBtn, 'icon-edit')}
              onClick={() => handleEditQuestion(question)}
            />
            <button
              type="button"
              className={clsx(s.itemBtn, 'icon-delete')}
              onClick={() => handleDeleteQuestion(question)}
            />
            <div
              id="questionText"
              className={s.questionTextWrap}
              onClick={() => toggleAnswersVisibility(question.key)}
            >
              <span className={s.questionText}>{question.title}</span>
              <span className={s.showArrow}>
                {showAnswersForQuestion.includes(question.key) ? '▲' : '▼'}
              </span>
            </div>
          </div>
          {showAnswersForQuestion.includes(question.key) && (
            <ol className={s.answers}>
              {question.question_type === 'number' ? (
                <span className={s.answer}>{question.answer}</span>
              ) : (
                question.answers.map(answer => (
                  <li key={answer.key} id={answer.id} className={s.answer}>
                    {answer.text}{' '}
                    {answer.is_right && <span className={s.is_right}>✔</span>}
                  </li>
                ))
              )}
            </ol>
          )}
        </>
      ) : (
        <>
          <EditQuestionForm
            questions={questions}
            setQuestions={setQuestions}
            question={question}
          >
            <EditAnswers
              questions={questions}
              setQuestions={setQuestions}
              question={question}
            />
          </EditQuestionForm>
        </>
      )}
    </li>
  );
};

Question.propTypes = {
  question: PropTypes.PropTypes.shape({
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
  setShowDeleteModal: PropTypes.func.isRequired,
  setSelectedQuestion: PropTypes.func.isRequired,
};

export default memo(Question);
