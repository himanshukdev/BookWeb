/* eslint-disable react-hooks/exhaustive-deps */
// Libraries
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import EnhancedTable from "../Book/BookListing";
import {
    getBookList,
    getAuthorList
  } from "../../store/actions/App";
import "../main.css"


// Welcome Home Component.
export default function Home(props) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBookList());
        dispatch(getAuthorList());
      }, []);
  return (
      <>  
        <div className="header-section">Book Wizard</div>
        <EnhancedTable/>
        </>
    );
}
