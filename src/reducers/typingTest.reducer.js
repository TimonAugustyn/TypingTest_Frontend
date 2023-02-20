import { 
  GET_ACTIVE_PARAGRAPH, 
  GET_ALL_RESULTS, 
  SET_ACTIVE_PARAGRAPH, 
  SET_TYPING_TEST_RESULTS,
} from "../actions/typingTest.action";

const initialState = {
  paragraph: [],
  allResults: [],
};

export const typingReducer = (typingTestState = initialState, action) => {
  switch (action.type) {
    case GET_ACTIVE_PARAGRAPH:
      return {
        ...typingTestState,
        paragraph: action.paragraph,
      };
    case GET_ALL_RESULTS:
      return {
        ...typingTestState,
        allResults: action.allResults,
      };
    case SET_ACTIVE_PARAGRAPH:
      return {
        ...typingTestState,
        newParagraph: action.newParagraph,
      };
    case SET_TYPING_TEST_RESULTS:
      return {
        ...typingTestState,
        results: action.results,
      };
    default:
      return typingTestState;
  }
};

export default typingReducer;