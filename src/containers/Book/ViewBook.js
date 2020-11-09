/* eslint-disable react-hooks/exhaustive-deps */
// Libraries
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddBook from "../Book/AddBook";
import EditBook from "../Book/EditBook";
import EditAuthor from "../Book/EditAuthor";
import "../main.css"

import {
    getBookDetails,
    getBookList,
    getAuthorList,
    resetBookCreationStatus,
    resetAuthorCreationStatus,
    resetBookUpdatedStatus,
    resetAuthorUpdatedStatus
  } from "../../store/actions/App";


// Welcome Home Component.
export default function ViewBook(props) {
const dispatch = useDispatch()
const {bookId} = props;

const bookdetailData = useSelector(state=>state.app.bookDetailData);
const[wantToEditBook,setWantToEditBook] = useState(false)
const[wantToAddBook,setWantToAddBook] = useState(false)
const [wantToEditAuthor,setWantToEditAuthor] = useState(false);

const bookCreatedStatus = useSelector(state=>state.app.bookCreatedStatus)
const authorCreatedStatus = useSelector(state=>state.app.bookCreatedStatus)
const bookUpdatedStatus = useSelector(state=>state.app.bookUpdatedStatus)
const authorUpdatedStatus = useSelector(state=>state.app.authorUpdatedStatus)
    useEffect(() => {
        dispatch(getBookDetails(bookId));
      }, [bookId]);

      useEffect(() => {
        if(bookCreatedStatus === "success"){
          dispatch(resetBookCreationStatus());
          dispatch(getBookList());
          toast("Book was added successfuly!")
          setWantToAddBook(false);
        }
        if(authorCreatedStatus === "success"){
          dispatch(resetAuthorCreationStatus());
          dispatch(getAuthorList());
          toast("Author was added successfuly!")
          setWantToAddBook(false);
        }
        if(bookUpdatedStatus === "success"){
          dispatch(resetBookUpdatedStatus());
          dispatch(getBookList());
          dispatch(getBookDetails(bookId));
          toast("Book was updated successfuly!")
          setWantToEditBook(false);
        }
        if(authorUpdatedStatus === "success"){
          dispatch(resetAuthorUpdatedStatus());
          dispatch(getAuthorList());
          dispatch(getBookDetails(bookId));
          toast("Author was Updated successfuly!")
          setWantToEditAuthor(false);
        }
      }, [bookCreatedStatus,authorCreatedStatus,bookUpdatedStatus,authorUpdatedStatus]);
      
  return (
        <>
            <div className="header-section">Book Details</div>
            <ToastContainer autoClose={1500} toastClassName="toaster-color"/>
            <div className="detail-action-button">
                    <Button 
                        className="m-right-5 cursor-pointer"
                        variant="contained"
                        color="secondary" 
                        onClick={()=>{setWantToAddBook(true);setWantToEditBook(false);setWantToEditAuthor(false)}} >Add Book</Button >
                    <Button 
                        className="m-right-5 cursor-pointer"
                        variant="contained" 
                        color="secondary" 
                        onClick={()=>{setWantToEditBook(true);setWantToEditAuthor(false);setWantToAddBook(false)}} >Edit Book</Button >
                    <Button 
                        className="cursor-pointer"
                        variant="contained" 
                        color="secondary" 
                        onClick={()=>{setWantToEditAuthor(true);setWantToEditBook(false);setWantToAddBook(false)}} >Edit Author</Button >
                </div>
                {bookdetailData && Object.keys(bookdetailData).length !== 0 &&  (
                    <>
                    <div className="book-detail-container">
                        
                            <>
                            {!wantToEditBook && !wantToAddBook && !wantToEditAuthor &&(
                            <>
                                <div className="book-detail-row">
                                    <span className="">Name</span>
                                    <span className="span-stack">{bookdetailData.name}</span>
                                </div>
                                <div>
                                    <span className="">Isbn</span>
                                    <span className="span-stack">{bookdetailData.isbn}</span>
                                </div>
                                <div>
                                    <span className="">Author First Name</span>
                                    <span className="span-stack">{bookdetailData.author.firstName}</span>
                                </div>
                                <div>
                                    <span className="">Author Last Name</span> 
                                    <span className="span-stack">{bookdetailData.author.lastName}</span>
                                </div>
                            </>
                        )}
                        {wantToAddBook && (
                            <AddBook 
                                closeHandler={()=>setWantToAddBook(false)}
                            />
                        )}
                        {wantToEditBook && (
                            <EditBook 
                                name={bookdetailData.name}
                                isbn={bookdetailData.isbn}
                                bookId={bookId}
                                authorId={bookdetailData.author._id}
                                closeHandler={()=>setWantToEditBook(false)}
                            />
                        )}
                        {wantToEditAuthor &&(
                            <EditAuthor
                                firstName={bookdetailData.author.firstName}
                                lastName={bookdetailData.author.lastName}
                                authorId={bookdetailData.author._id}
                                closeHandler={()=>setWantToEditAuthor(false)}
                            />
                        )}
                            </>
                    </div>
                    </>
                )}
        </>
        )
}
