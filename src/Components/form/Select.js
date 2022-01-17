import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

// Dropdown styles
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            marginTop: 5
        },
    },
};

const cityList = ['Riga', 'Daugavpils', 'Jūrmala', 'Ventspils'];

export default function SelectCustom({value, changeHandler}) {

    const handleChange = (event) => {
        changeHandler(event)
    };

    return (
        <div>
            <FormControl sx={{m: 0, width: 250, mt: 0}}>
                <Select
                    name="city"
                    displayEmpty
                    value={value}
                    onChange={handleChange}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return 'City';
                        }
                        return selected;
                    }}
                    MenuProps={MenuProps}
                    inputProps={{'aria-label': 'Without label'}}
                >
                    {cityList.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            className={'form-select-option'}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
