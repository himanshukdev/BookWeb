/* eslint-disable react-hooks/exhaustive-deps */
// Libraries
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from '@material-ui/core/TextField';
import EnhancedTable from "../Book/BookListing";
import {
    getBookList,
    getAuthorList,
    getSeachedBookList
  } from "../../store/actions/App";
import "../main.css"


// Welcome Home Component.
export default function Home(props) {
    const dispatch = useDispatch()
    const [searchText,setSearchText] = useState("")
    useEffect(() => {
        dispatch(getBookList());
        dispatch(getAuthorList());
      }, []);

      useEffect(() => {
        if(!searchText){
          dispatch(getBookList());
        }
      }, [searchText]);

    const searchTextChangeHandler = (event) => {
      setSearchText(event.target.value)
    }
    const serachHandler = (event) => {
      if(searchText){
        dispatch(getSeachedBookList(searchText));
      }
    }
  return (
      <>  
        <div className="header-section">Book Wizard</div>
        <div className="m-left-30">
          <TextField id="searchbook" label="search" name="firstName" value={searchText} onChange={searchTextChangeHandler} onBlur={serachHandler}/>
        </div>
        <EnhancedTable/>
        </>
    );
}
