import React from 'react';

const Input = ({ name, label, value, checked, type, onChange, required }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input name={name}
                value={value}
                onChange={onChange}
                id={name}
                type={type}
                checked={checked}
                className="form-control" required={required} />
        </div>
    );
}

export default Input;