import {
    FETCH_START,
    FETCH_END,
    FETCH_ERROR,
    SET_BOOK_LISTING_DATA,
    SET_BOOK_DETAIL_DATA
  } from "../../constants/ActionTypes";

  let initState = {
   isFetchingData: false,
   bookListingData:[]
  };
  
  const app = (state = initState, action) => {
    switch (action.type) {
      case FETCH_START:
        return {
          ...state,
          isFetchingData: true,
          isFetchedError: false,
          fetchError: ""
        };
      case FETCH_END:
        return {
          ...state,
          isFetchingData: false,
          isFetchedError: false,
          fetchError: ""
        };
      case FETCH_ERROR:
        return {
          ...state,
          isFetchingData: false,
          isFetchedError: true,
          fetchError: action.payload
        };
      case SET_BOOK_LISTING_DATA: {
        return {
          ...state,
          bookListingData:action.payload
        };
      }
      case SET_BOOK_DETAIL_DATA:
        return{
            ...state,
            bookDetailData:action.payload
        }
      default:
        return state;
    }
  };
  
  export default app;
  