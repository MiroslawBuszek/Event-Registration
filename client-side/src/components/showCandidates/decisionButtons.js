import React from 'react';

const DecisionButtons = props => {
    const { workshop, is_lecture, decision } = props.candidate;
    const { onDecisionChange } = props

    return (
        <div className="row">
            {decision !== "ACC_WOR" && workshop ? <button onClick={onDecisionChange} className="btn btn-primary btn-sm m-2" name="ACC_WOR">ACC_WOR</button> : ""}
            {decision !== "MV_LEC" && workshop && is_lecture ? <button onClick={onDecisionChange} className="btn btn-warning btn-sm m-2" name="MV_LEC">MV_LEC</button> : ""}
            {decision !== "ACC_LEC" && is_lecture && !workshop && <button onClick={onDecisionChange} className="btn btn-secondary btn-sm m-2" name="ACC_LEC">ACC_LEC</button>}
            {decision !== "REJECTED" && <button onClick={onDecisionChange} className="btn btn-danger btn-sm m-2" name="REJECTED">REJECT</button>}
        </div>
    );
}

export default DecisionButtons;