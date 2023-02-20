import { 
  GET_ACTIVE_PARAGRAPH, 
  GET_ALL_RESULTS, 
  SET_ACTIVE_PARAGRAPH, 
  SET_TYPING_TEST_RESULTS,
  DELETE_RESULT,
} from "../actions/typingTest.action";
import typingTestApi from "../apis/typingTest.api";

export const getParagraphSaga = () => async (dispatch) => {
  try {
    const res = await typingTestApi.getActiveParagraph();

    dispatch({
      type: GET_ACTIVE_PARAGRAPH,
      paragraph: res.data,
    });
  } catch (err) {
    console.log(err)
  }
};

export const getAllResultsSaga = () => async (dispatch) => {
  try {
    const res = await typingTestApi.getAllResults();

    dispatch({
      type: GET_ALL_RESULTS,
      allResults: res.data,
    });
  } catch (err) {
    console.log(err)
  }
};

export const setParagraphSaga = (newParagraph) => async (dispatch) => {
  try {
    const res = await typingTestApi.setActiveParagraph(newParagraph);

    dispatch({
      type: SET_ACTIVE_PARAGRAPH,
      results: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};


export const setResultsSaga = (resultObject) => async (dispatch) => {
  try {
    const res = await typingTestApi.setTypingResults(resultObject);

    dispatch({
      type: SET_TYPING_TEST_RESULTS,
      results: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteResultSaga = (id) => async (dispatch) => {
  try {
    const res = await typingTestApi.deleteResult(id);

    dispatch({
      type: DELETE_RESULT,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
