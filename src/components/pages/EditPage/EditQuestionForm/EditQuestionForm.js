import PropTypes from 'prop-types';
import clsx from 'clsx';
import { memo } from 'react';
import { useTestQuestions } from '@hooks/useTestQuestions';
import s from './EditQuestionForm.module.scss';

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
        <input
          type="text"
          className={clsx(s.input, s.question)}
          placeholder="Введите текст вопроса"
          value={question.title}
          onChange={e => handleFieldChange('title', e.target.value)}
        />
      </div>
      <div className={s.itemWrap}>
        <h3 className={s.itemTitle}>Тип вопроса:</h3>
        <select
          value={question.question_type}
          className={clsx(s.input, s.questionType)}
          onChange={e => handleFieldChange('question_type', e.target.value)}
        >
          <option value="single">Один из списка</option>
          <option value="multiple">Несколько из списка</option>
          <option value="number">Численный ответ</option>
        </select>
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
  question: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  setQuestions: PropTypes.func.isRequired,
  newQuestionsOfEdit: PropTypes.array,
  setNewQuestionsOfEdit: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default memo(EditQuestionForm);
