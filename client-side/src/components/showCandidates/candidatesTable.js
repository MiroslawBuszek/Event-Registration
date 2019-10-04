import React from 'react';
import Candidate from './candidate';

const CandidatesTable = props => {
    const { candidates, onDecisionChange } = props;
    return (
        <main>
            {candidates.length === 0 ? <div style={{ fontWeight: 700, fontSize: 20, textAlign: "center" }}>There are no candidates to show for the given criteria</div> :
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Decision</th>
                            <th>Workshop</th>
                            <th>Lecture</th>
                            <th>Motivation</th>
                            <th>Change Decision</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map(candidate => (<Candidate key={candidate.email} candidate={candidate} onDecisionChange={onDecisionChange} />))}
                    </tbody>
                </table>}
        </main>
    );
}

export default CandidatesTable;
