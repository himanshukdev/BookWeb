import axios from "../../services/Api";

import {
    FETCH_START,
    FETCH_END,
    FETCH_ERROR,
    SET_BOOK_LISTING_DATA,
    SET_BOOK_DETAIL_DATA,
    SET_BOOK_CREATED_STATUS,
    SET_AUTHOR_CREATED_STATUS,
    SET_AUTHOR_LISTING_DATA,
    SET_AUTHOR_UPDATED_STATUS,
    SET_BOOK_UPDATED_STATUS

  } from "../../constants/ActionTypes";


import {RESPONSE_STATUS} from "../../constants/AppVariable";

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

export const getBookDetails = (bookId) => dispatch => {
    debugger
    dispatch(startFetching());
    const url = `api/book/${bookId}`;
    axios
      .get(url)
      .then(({ data }) => {
        if (data.status === 200) {
          dispatch({ type: SET_BOOK_DETAIL_DATA, payload: data.data });
          dispatch(fetchSuccessful());
        }
      })
      .catch(error => {
        dispatch(fetchError());
        console.log(error);
      });
  };

export const getAuthorList = () => dispatch => {
    debugger
      dispatch(startFetching());
      const url = `api/author`;
      axios
        .get(url)
        .then(({ data }) => {
          debugger
          if (data.status === 200) {
            dispatch({ type: SET_AUTHOR_LISTING_DATA, payload: data.data });
            dispatch(fetchSuccessful());
          }
        })
        .catch(error => {
          dispatch(fetchError());
          console.log(error);
        });
    };

export const createBook = (formData) => dispatch => {
    dispatch(startFetching());
    const url = `api/book/`;
    axios
      .post(url,formData)
      .then(({ data }) => {
        if (data.status === 200) {
          dispatch({ type: SET_BOOK_CREATED_STATUS, payload: RESPONSE_STATUS.SUCCESS});
          dispatch(fetchSuccessful());
        }
      })
      .catch(error => {
        dispatch(fetchError());
        console.log(error);
      });
  };

 
export const createAuthor = (formData) => dispatch => {
    dispatch(startFetching());
    const url = `api/author/`;
    axios
      .post(url,formData)
      .then(({ data }) => {
        if (data.status === 200) {
          dispatch({ type: SET_AUTHOR_CREATED_STATUS, payload: RESPONSE_STATUS.SUCCESS});
          dispatch(fetchSuccessful());
        }
      })
      .catch(error => {
        dispatch(fetchError());
        console.log(error);
      });
  };

export const updateAuthorById = (authorId,formData) => dispatch => {
    dispatch(startFetching());
    const url = `api/author/${authorId}`;
    axios
      .put(url,formData)
      .then(({ data }) => {
        if (data.status === 200) {
          dispatch({ type: SET_AUTHOR_UPDATED_STATUS, payload: RESPONSE_STATUS.SUCCESS});
          dispatch(fetchSuccessful());
        }
      })
      .catch(error => {
        dispatch(fetchError());
        console.log(error);
      });
  };

export const updateBookById = (bookId,formData) => dispatch => {
    debugger
    dispatch(startFetching());
    const url = `api/book/${bookId}`;
    axios
      .put(url,formData)
      .then(({ data }) => {
        if (data.status === 200) {
          dispatch({ type: SET_BOOK_UPDATED_STATUS, payload: RESPONSE_STATUS.SUCCESS});
          dispatch(fetchSuccessful());
        }
      })
      .catch(error => {
        dispatch(fetchError());
        console.log(error);
      });
  };


