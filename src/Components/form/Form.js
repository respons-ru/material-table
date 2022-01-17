import React from "react";
import './_form.scss';
import Select from './Select';
import TextField from '@mui/material/TextField';

export default function Form({changeHandler, formData, saveHandler}) {
    function changeValueHandler(event) {
        changeHandler(event)
    }

    function onSave() {
        if (!Object.values(formData).every(item => typeof item === 'string' ? item.length : true)) return
        saveHandler()
    }

    return (
        <div className="form">
            <div className="form__item">
                <TextField placeholder="Name" name="name" value={!formData.isEdit ? formData.name : ''}
                           onChange={changeValueHandler}/>
            </div>
            <div className="form__item">
                <TextField placeholder="Surname" name="surname" value={!formData.isEdit ? formData.surname : ''}
                           onChange={changeValueHandler}/>
            </div>
            <div className="form__item">
                <TextField placeholder="Age" type={'number'} name="age" value={!formData.isEdit ? formData.age : ''}
                           onChange={changeValueHandler}/>
            </div>
            <div className="form__item">
                <Select value={!formData.isEdit ? formData.city : ''} changeHandler={changeValueHandler}/>
            </div>

            <div
                className={Object.values(formData).every(item => typeof item === 'string' ? item.length : true) && !formData.isEdit ? "form__save-button" : "form__save-button form__save-button--disabled"}
                onClick={onSave}>
                ADD
            </div>
        </div>
    )
}