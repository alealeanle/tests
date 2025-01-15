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
        questions={questions}
        setQuestions={setQuestions}
        newQuestionsOfEdit={newQuestionsOfEdit}
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
  currentQuestions: PropTypes.array.isRequired,
};

export default EditQuestions;
