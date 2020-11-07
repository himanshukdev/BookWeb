import axios from "../../services/Api";

import {
    FETCH_START,
    FETCH_END,
    FETCH_ERROR,
    SET_BOOK_LISTING_DATA
  } from "../../constants/ActionTypes";

export const startFetching = () => ({
  type: FETCH_START
});

export const fetchSuccessful = () => ({
  type: FETCH_END
});

export const fetchError = payload => ({
  type: FETCH_ERROR,
  payload: payload
});
// book actions 

// get all books present in database.
export const getBookList = () => dispatch => {
    debugger
    dispatch(startFetching());
    const url = `api/book`;
    axios
      .get(url)
      .then(({ data }) => {
        if (data.status === 200) {
          dispatch({ type: SET_BOOK_LISTING_DATA, payload: data.data });
          dispatch(fetchSuccessful());
        }
      })
      .catch(error => {
        dispatch(fetchError());
        console.log(error);
      });
  };

 





