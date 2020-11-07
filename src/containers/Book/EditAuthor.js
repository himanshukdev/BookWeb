// Libraries
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from '@material-ui/core/TextField';
import {updateAuthorById} from "../../store/actions/App";
import Button from '@material-ui/core/Button';

import "../main.css"


// Welcome Home Component.
export default function EditAuthor(props) {
    const {firstName,lastName,authorId,closeHandler} = props;
    const [state,setState] = useState({
        firstName:firstName || "",
        lastName:lastName || "",
    });
    const [touched, setTouched] = useState({
        firstName:false,
        lastName:false
      });
    const [error,setError] = useState("");
    const dispatch = useDispatch()

    useEffect(() => {
    }, []);

    const validateField = (name, value) => {
        let error = "";
        switch (name) {
          case "firstName":
              if(!value){
                  error="Please enter first Name."
              }
              break;
          case "lastName":
            if(!value){
                error= "Please enter last Name."
            }
            break;
          default:
            break;
        }
        return error;
      };

    const inputChangeHandler = (event) => {
        const {name,value} = event.target;
        const error = validateField(name, value);
        setState({...state,[name]:value});
        setTouched({ ...touched, [name]: true });
        setError(error);
    }

    const handleCancel = () => {
        closeHandler();
    }

    const validateForm = () => {
        const errs = {};
        let isFormValid = true;
    
        Object.keys(state).forEach(field => {
          const generatedError = validateField(field, state[field]);
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
          dispatch(updateAuthorById(authorId,state))
        } else {
          const formTouchedState = { ...touched };
          Object.keys(touched).forEach(item => {
            touched[item] = true;
          });
          setTouched(formTouchedState);
          setError(errs.FormError);
        }
    }
      
  return (
      <>
        <div className="book-detail-header">Update Author</div>
        <div className="text-field-wrapper m-right-5">
            <TextField id="firstname" label="First Name" name="firstName" value={state.firstName} onChange={inputChangeHandler} />
        </div>
        <div className="text-field-wrapper">
            <TextField id="lastname" label="Last Name" name="lastName" value={state.lastName} onChange={inputChangeHandler}/>
        </div>
        <div className="edit-action-button-wrapper">
        <Button className="cursor-pointer m-right-5" variant="contained" color="secondary" onClick={handleSubmit} >Update</Button >
        <Button className="cursor-pointer" variant="contained" color="secondary" onClick={handleCancel} >Cancel</Button >
        </div>
        
        {error &&(
            <div className="validation-summary">{error}</div>
        )}
      </>
  
  );
}
