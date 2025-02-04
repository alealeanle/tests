import PropTypes from 'prop-types';
import EditQuestionForm from '@EditPage/EditQuestionForm';
import EditAnswers from '@EditPage/EditAnswers';
import s from './EditQuestions.module.scss';

const EditQuestions = ({
  testId,
  questions,
  setQuestions,
  newQuestionsOfEdit,
  setNewQuestionsOfEdit,
  currentQuestions,
}) => {
  return currentQuestions.map(question => (
    <div key={question.key} className={s.questionBlock}>
      <EditQuestionForm
        testId={testId}
        question={question}
        setQuestions={setQuestions}
        setNewQuestionsOfEdit={setNewQuestionsOfEdit}
      >
        <EditAnswers
          testId={testId}
          question={question}
          questions={questions}
          setQuestions={setQuestions}
          newQuestionsOfEdit={newQuestionsOfEdit}
          setNewQuestionsOfEdit={setNewQuestionsOfEdit}
        />
      </EditQuestionForm>
    </div>
  ));
};

EditQuestions.propTypes = {
  currentQuestions: PropTypes.arrayOf(
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
};

export default EditQuestions;
