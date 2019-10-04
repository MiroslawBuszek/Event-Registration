import React from 'react';

const RouterButtons = props => {
    const { filter, onChangeView } = props
    return (
        <div className="row backButton">
            {filter !== 'addCandidate' && filter === 'menu'
                && <div className="col-6 text-right">
                    <button onClick={() => onChangeView('showCandidates')} className="router btn btn-info btn-sm m-2">Show Candidates</button>
                </div>}
            {filter !== 'showCandidates' && filter === 'menu'
                && <div className="col-6 text-left">
                    <button onClick={() => onChangeView('addCandidate')} className="router btn btn-success btn-sm m-2">Add Candidate</button>
                </div>}
            {filter !== "menu" && <button onClick={() => onChangeView('menu')} className="back btn btn-danger btn-sm m-3">BACK</button>}
        </div>);
}

export default RouterButtons;