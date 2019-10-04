import React from 'react';

const options = ['', 0, 1, 2, 3, 4, 5, 6];

const createOptions = options => {
    return options.map(option => (<option key={option} value={option}>{option}</option>));
}

const Select = ({ name, label, value, onChange, required }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select className="form-control"
                id={name}
                value={value}
                onChange={onChange}
                name={name}
                required={required}>
                {createOptions(options)}
            </select>
        </div>
    );
}

export default Select;