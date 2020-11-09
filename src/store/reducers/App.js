import {
    FETCH_START,
    FETCH_END,
    FETCH_ERROR,
    SET_BOOK_LISTING_DATA,
    SET_BOOK_DETAIL_DATA,
    SET_AUTHOR_LISTING_DATA,
    SET_BOOK_CREATED_STATUS,
    SET_AUTHOR_CREATED_STATUS,
    SET_AUTHOR_UPDATED_STATUS,
    SET_BOOK_UPDATED_STATUS,
    RESET_AUTHOR_CREATED_STATUS,
    RESET_BOOK_CREATED_STATUS,
    RESET_BOOK_UPDATED_STATUS,
    RESET_AUTHOR_UPDATED_STATUS

  } from "../../constants/ActionTypes";

  import {RESPONSE_STATUS} from "../../constants/AppVariable";

  let initState = {
   isFetchingData: false,
   bookListingData:[],
   bookDetailData:{},
   authorListingData:[],
   authorCreatedStatus:RESPONSE_STATUS.INITSTATE,
   bookCreatedStatus: RESPONSE_STATUS.INITSTATE,
   authorUpdatedStatus:RESPONSE_STATUS.INITSTATE,
   bookUpdatedStatus: RESPONSE_STATUS.INITSTATE
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
      case SET_AUTHOR_LISTING_DATA:
        return {
            ...state,
            authorListingData:action.payload
        };
      case SET_BOOK_CREATED_STATUS:
        return{
            ...state,
            bookCreatedStatus:action.payload
        }
      case SET_AUTHOR_CREATED_STATUS:
        return{
            ...state,
            authorCreatedStatus:action.payload
        }
      case SET_AUTHOR_UPDATED_STATUS:
        return{
            ...state,
            authorUpdatedStatus:action.payload
        }
      case SET_BOOK_UPDATED_STATUS:
        return{
            ...state,
            bookUpdatedStatus:action.payload
        }
        case RESET_BOOK_CREATED_STATUS:
          return {
              ...state,
              bookCreatedStatus:action.payload
          }
      case RESET_AUTHOR_CREATED_STATUS:
          return {
              ...state,
              authorCreatedStatus:action.payload
          }
      case RESET_BOOK_UPDATED_STATUS:
          return {
              ...state,
              bookUpdatedStatus:action.payload
          }
      case RESET_AUTHOR_UPDATED_STATUS:
          return {
              ...state,
              authorUpdatedStatus:action.payload
          }        
      default:
        return state;
    }
  };
  
  export default app;
  