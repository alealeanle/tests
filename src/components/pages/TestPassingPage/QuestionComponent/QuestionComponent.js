import PropTypes from 'prop-types';
import s from './QuestionComponent.module.scss';

const QuestionComponent = ({ question, answers, onAnswerChange }) => {
  switch (question.question_type) {
    case 'single':
      return (
        <div className={s.root}>
          <p className={s.questionTitle}>{question.title}</p>
          <div className={s.answersWrap}>
            {question.answers.map(answer => (
              <div key={answer.id} className={s.answer}>
                <div className={s.isRightWrap}>
                  <input
                    type="radio"
                    id={`answer-${answer.id}`}
                    className={s.radio}
                    value={answer.id}
                    checked={answers === answer.id}
                    onChange={() => onAnswerChange(answer.id)}
                  />
                  <label className={s.radioLabel} />
                </div>
                <label htmlFor={`answer-${answer.id}`} className={s.answerText}>
                  {answer.text}
                </label>
              </div>
            ))}
          </div>
        </div>
      );

    case 'multiple':
      return (
        <div className={s.root}>
          <p className={s.questionTitle}>{question.title}</p>
          <div className={s.answersWrap}>
            {question.answers.map(answer => (
              <div key={answer.id} className={s.answer}>
                <div className={s.isRightWrap}>
                  <input
                    type="checkbox"
                    id={`answer-${answer.id}`}
                    className={s.checkbox}
                    value={answer.id}
                    checked={answers.includes(answer.id)}
                    onChange={e => {
                      if (e.target.checked) {
                        onAnswerChange([...answers, answer.id]);
                      } else {
                        onAnswerChange(answers.filter(id => id !== answer.id));
                      }
                    }}
                  />
                  <label className={s.checkboxLabel} />
                  <label className={s.checkboxLabel2} />
                </div>
                <label htmlFor={`answer-${answer.id}`} className={s.answerText}>
                  {answer.text}
                </label>
              </div>
            ))}
          </div>
        </div>
      );

    case 'number':
      return (
        <div className={s.root}>
          <p className={s.questionTitle}>{question.title}</p>
          <div className={s.answersWrap}>
            <input
              type="text"
              className={s.input}
              value={answers || ''}
              onChange={e =>
                onAnswerChange(e.target.value.replace(/[^0-9.-]/g), '')
              }
            />
          </div>
        </div>
      );

    default:
      return null;
  }
};

QuestionComponent.propTypes = {
  question: PropTypes.PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    question_type: PropTypes.string.isRequired,
    answer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    answers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        is_right: PropTypes.bool.isRequired,
      }),
    ),
  }).isRequired,
  answers: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.string,
  ]).isRequired,
  onAnswerChange: PropTypes.func.isRequired,
};

export default QuestionComponent;
