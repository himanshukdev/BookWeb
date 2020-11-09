// Libraries
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from '@material-ui/core/TextField';
import {createBook,createAuthor} from "../../store/actions/App";
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import "../main.css"

export default function AddBook(props) {
    const dispatch = useDispatch()
    const DEFAULT_SELECT_VALUE = "NONE";
    const {closeHandler,specificCall} = props;
    const [bookState,setBookState] = useState({
        name:"",
        isbn:"",
        author:""
    });
    const [authorState,setAuthorState] = useState({
        firstName:"",
        lastName:""
    });
    const [authorTouched,setAuthorTouched] = useState({
        firstName:false,
        lastName:false
    })
    const [touched, setTouched] = useState({
        name:false,
        isbn:false,
        author:false
      });
    const [error,setError] = useState("");
    const [wantToAddAuthor,setWantToAddAuthor] = useState(specificCall);
    const authorListData = useSelector(state=>state.app.authorListingData);
    const [authorDropdownData,setAuthorDropdownData] = useState(authorListData);

    useEffect(() => {
        setAuthorDropdownData(authorListData);
    }, [authorListData]);

    const validateField = (name, value) => {
        let error = "";
        switch (name) {
          case "name":
          case "isbn":
          case "firstName":
          case "lastName":
              if(!value){
                  error="Please enter all required information."
              }
              break;
          case "author":
              if(!value || value === DEFAULT_SELECT_VALUE){
                error= "Please enter all required information."
              }
              break;
          default:
            break;
        }
        return error;
      };

    const inputChangeHandler = (event) => {
        const {name,value} = event.target;
        if(name==="author" && value ==="AddNewAuthor"){
            setWantToAddAuthor(true);
        }else{
            const error = validateField(name, value);
            if(wantToAddAuthor){
                setAuthorState({...authorState,[name]:value})
                setAuthorTouched({...authorTouched,[name]:true})
                  setError(error);
            }else{
                setBookState({...bookState,[name]:value});
                setTouched({ ...touched, [name]: true });
                setError(error);
            }
        }
        
    }

    const handleCancel = () => {
        closeHandler();
    }

    const validateForm = () => {
        const errs = {};
        let isFormValid = true;
        let stateInUse = {};
        if(wantToAddAuthor){
            stateInUse = authorState;
        }else{
            stateInUse = bookState;
        }
        Object.keys(stateInUse).forEach(field => {
          const generatedError = validateField(field, stateInUse[field]);
          if (generatedError !== "") {
            errs.FormError = generatedError;
          }
          if (errs.FormError) isFormValid = false;
        });
        return { isFormValid, errs };
      };

    const handleSubmit = () => {
        const { isFormValid, errs } = validateForm();

        if (isFormValid) {
            if(wantToAddAuthor){
                dispatch(createAuthor(authorState));
                setAuthorState({...authorState,firstName:"",lastName:""})
                closeHandler()
            }else{
                dispatch(createBook(bookState));
                setBookState({...bookState,name:"",isbn:"",author:""})
                closeHandler()
            }
         
        } else {
          const formTouchedState = { ...touched };
          const touchStateInUse = wantToAddAuthor?authorTouched:touched
          Object.keys(touchStateInUse).forEach(item => {
            touchStateInUse[item] = true;
          });
          setTouched(formTouchedState);
          setError(errs.FormError);
        }
    }
      
  return (
      <>
        <div className="book-detail-header">{wantToAddAuthor?"Add Author":"Add Book"}</div>
        {!wantToAddAuthor &&(
            <>
            <div className="text-field-wrapper m-right-5">
                <TextField id="bookname" label="Name" name="name" value={bookState.name} onChange={inputChangeHandler} />
            </div>
            <div className="text-field-wrapper">
                <TextField id="bookisbn" label="ISBN" name="isbn" value={bookState.isbn} onChange={inputChangeHandler}/>
            </div>
            <div className="text-field-wrapper m-top-5">
                <FormControl style={{minWidth: 190}}>
                    <InputLabel id="book-select-label">Author</InputLabel>
                    <Select
                    labelId="book-select-label"
                    labelWidth={10}
                    id="bookauthor"
                    name="author"
                    value={bookState.author}
                    onChange={inputChangeHandler}
                    >
                    <option value={DEFAULT_SELECT_VALUE} disabled>
                            Author
                        </option>
                        {authorDropdownData.map(author => (
                            <option key={author.firstName} value={author._id}>
                            {`${author.firstName} ${author.lastName}`}
                            </option>
                        ))}
                        <option className="addaccount-option cursor-pointer" value="AddNewAuthor">
                                Add New Author
                                </option>
                    </Select>
            </FormControl>
        </div>
        <div className="edit-action-button-wrapper">
            <Button className="cursor-pointer m-right-5" variant="contained" color="secondary" onClick={handleSubmit} >Save</Button >
            <Button className="cursor-pointer" variant="contained" color="secondary" onClick={handleCancel} >Cancel</Button >
        </div>
        
        {error &&(
            <div className="validation-summary">{error}</div>
        )}
        </>
        )}
        {wantToAddAuthor &&(
            <>
             <div className="text-field-wrapper m-right-5">
                <TextField id="firstname" label="First Name" name="firstName" value={authorState.firstName} onChange={inputChangeHandler} />
            </div>
            <div className="text-field-wrapper">
                <TextField id="lastName" label="Last Name" name="lastName" value={authorState.lastName} onChange={inputChangeHandler}/>
            </div>
            <div className="edit-action-button-wrapper">
                <Button className="cursor-pointer m-right-5" variant="contained" color="secondary" onClick={handleSubmit} >Save</Button >
                <Button className="cursor-pointer" variant="contained" color="secondary" onClick={()=>setWantToAddAuthor(false)} >Cancel</Button >
             </div>
            </>
        )}
        
      </>
  
  );
}
