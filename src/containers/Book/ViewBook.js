// Libraries
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from '@material-ui/core/Button';
import {getBookDetails} from "../../store/actions/App";
import AddBook from "../Book/AddBook";
import EditBook from "../Book/EditBook";
import EditAuthor from "../Book/EditAuthor";
import "../main.css"


// Welcome Home Component.
export default function ViewBook(props) {
const dispatch = useDispatch()
const {bookId} = props;

const bookdetailData = useSelector(state=>state.app.bookDetailData);
const[wantToEditBook,setWantToEditBook] = useState(false)
const[wantToAddBook,setWantToAddBook] = useState(false)
const [wantToEditAuthor,setWantToEditAuthor] = useState(false);
    useEffect(() => {
        debugger
        dispatch(getBookDetails(bookId));
      }, [bookId]);

     
      
  return (
        <>
            <div className="header-section">Book Details</div>
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
