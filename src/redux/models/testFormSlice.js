// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   title: '',
//   test: {},
//   initialQuestions:[],
//   questions: [],
//   newQuestionsOfEdit: [],
//   errors: new Set(),
// };

// const questionStructure = () => ({
//   key: uuidv4(),
//   title: '',
//   question_type: 'single',
//   answers: [
//     { key: uuidv4(), text: '', is_right: false },
//     { key: uuidv4(), text: '', is_right: false },
//   ],
// });

// const testFormSlice = createSlice({
//   name: 'testForm',
//   initialState,
//   reducers: {
//     addTest: (state,action) => {
//       state.test = action.payload.test.map(question => {
//         ...question,

//       })
//     }
//   }
// })

// export const {

// } = testFormSlice.actions;
// export default testFormSlice.reducer;
