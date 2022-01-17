import React, {useState} from "react";
import Select from './Select';
import TextField from '@mui/material/TextField';

// eslint-disable-next-line react/prop-types
export default function Overlay({formData, saveHandler}) {
    const [form, setForm] = useState(formData)

    function onSave() {
        if (!Object.values(formData).every(item => typeof item === 'string' ? item.length : true)) return
        saveHandler()
    }

    function changeValueHandler() {
        const fd = JSON.parse(JSON.stringify(form))
        fd[event.target.name] = event.target.value
        setForm(fd)
    }

    return (
        <div className="overlay">
            <div className="form">
                <div className="form__item">
                    {/* eslint-disable-next-line react/prop-types */}
                    <TextField placeholder="Name" name="name" value={form.name} onChange={changeValueHandler}/>
                </div>
                <div className="form__item">
                    {/* eslint-disable-next-line react/prop-types */}
                    <TextField placeholder="Surname" name="surname" value={form.surname} onChange={changeValueHandler}/>
                </div>
                <div className="form__item">
                    {/* eslint-disable-next-line react/prop-types */}
                    <TextField placeholder="Age" type={'number'} name="age" value={form.age}
                               onChange={changeValueHandler}/>
                </div>
                <div className="form__item">
                    {/* eslint-disable-next-line react/prop-types */}
                    <Select value={form.city} changeHandler={changeValueHandler}/>
                </div>

                {/* eslint-disable-next-line no-constant-condition */}
                <div
                    className={Object.values(form).every(item => typeof item === 'string' ? item.length : true) ? "form__save-button" : "form__save-button form__save-button--disabled"}
                    onClick={onSave}>
                    SAVE
                </div>
            </div>
        </div>
    )
}