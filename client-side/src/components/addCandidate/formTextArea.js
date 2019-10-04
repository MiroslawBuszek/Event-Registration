import React from 'react';

const TextArea = ({ name, label, value, type, onChange, required }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <textarea name={name}
                value={value}
                onChange={onChange}
                id={name}
                type={type}
                className="form-control" required={required} />
        </div>
    );
}

export default TextArea;