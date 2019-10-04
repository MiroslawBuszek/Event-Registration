import React from 'react';

const SearchBox = ({ value, onChange }) => {
    return (
        <div className="float-right">
            <input
                name="search"
                className="form-control"
                type="text"
                placeholder="Search..."
                value={value}
                onChange={e => onChange(e.currentTarget.value)}
            />
        </div>
    );
}

export default SearchBox;