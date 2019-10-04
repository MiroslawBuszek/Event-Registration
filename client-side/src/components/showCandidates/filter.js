import React from 'react';
const {workshop1, workshop2, workshop3, workshop4, workshop5, workshop6} = require('../../config');

const Filter = props => {
    const { onFilterAll, onFilterLecture, onFilterWorkshop } = props

    return (
        <div>
            <span style={{ fontWeight: 700 }}>Filter Candidates: </span>
            <button onClick={onFilterAll} className="btn btn-primary btn-sm">All</button>
            <button onClick={onFilterLecture} className="btn btn-primary btn-sm m-2">Lecture</button>
            <span style={{ fontWeight: 700 }}>Filter Workshop: </span>
            <select className="badge" onChange={onFilterWorkshop}>
                <option value="all">All workshops</option>
                <option value="1">{workshop1}</option>
                <option value="2">{workshop2}</option>
                <option value="3">{workshop3}</option>
                <option value="4">{workshop4}</option>
                <option value="5">{workshop5}</option>
                <option value="6">{workshop6}</option>
            </select>
        </div>);
}

export default Filter;