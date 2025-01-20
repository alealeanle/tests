import PropTypes from 'prop-types';
import clsx from 'clsx';
import { memo } from 'react';
import { useTestQuestions } from '@hooks/useTestQuestions';
import Dropdown from '@commons/Dropdown';
import s from './EditQuestionForm.module.scss';

const handlePlaceholder = (options, currentValue) => {
  const foundOption = options.find(opt => opt.value === currentValue);
  return foundOption ? foundOption.label : 'Выберите значение';
};

const EditQuestionForm = ({
  testId,
  question,
  questions,
  setQuestions,
  newQuestionsOfEdit,
  setNewQuestionsOfEdit,
  children,
}) => {
  const { questionChange } = useTestQuestions();
  const questionTypes = [
    { value: 'single', label: 'Один из списка' },
    { value: 'multiple', label: 'Несколько из списка' },
    { value: 'number', label: 'Численный ответ' },
  ];

  const handleFieldChange = (field, value) => {
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

  return (
    <div className={s.root}>
      <div className={s.itemWrap}>
        <h3 className={s.itemTitle}>Вопрос:</h3>
        <textarea
          type="text"
          className={clsx(s.input, s.question)}
          placeholder="Введите текст вопроса"
          value={question.title}
          onChange={e => handleFieldChange('title', e.target.value)}
        />
      </div>
      <div className={s.itemWrap}>
        <h3 className={s.itemTitle}>Тип вопроса:</h3>
        <Dropdown
          options={questionTypes}
          placeholder={handlePlaceholder(questionTypes, question.question_type)}
          onChange={option => handleFieldChange('question_type', option.value)}
        />
      </div>
      <div className={s.itemWrap}>
        <h3 className={s.itemTitle}>
          {question.question_type === 'number' ? 'Ответ:' : 'Ответы:'}
        </h3>
        {children}
      </div>
    </div>
  );
};

EditQuestionForm.propTypes = {
  testId: PropTypes.string,
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
  newQuestionsOfEdit: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      question_type: PropTypes.string.isRequired,
      answer: PropTypes.PropTypes.string,
      answers: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
          is_right: PropTypes.bool.isRequired,
        }),
      ),
    }).isRequired,
  ),
  setNewQuestionsOfEdit: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default memo(EditQuestionForm);
