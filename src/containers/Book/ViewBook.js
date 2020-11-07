// Libraries
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from '@material-ui/core/Button';
import {getBookDetails} from "../../store/actions/App";
import "../main.css"


// Welcome Home Component.
export default function ViewBook(props) {
const dispatch = useDispatch()
const {bookId} = props;

const bookdetailData = useSelector(state=>state.app.bookDetailData);

    useEffect(() => {
        debugger
        dispatch(getBookDetails(bookId));
      }, [bookId]);

     
      
  return (
        <>
            <div className="header-section">Book Details</div>
                
                {bookdetailData && Object.keys(bookdetailData).length !== 0 &&  (
                    <>
                    <div className="book-detail-container">
                        
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
                    </div>
                    </>
                )}
        </>
        )
}
