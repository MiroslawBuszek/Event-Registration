import React from 'react';
import DecisionButtons from "./decisionButtons"

const Candidate = props => {
    const { name, lastname, email, decision, workshop, is_lecture, motivation } = props.candidate;
    const { candidate, onDecisionChange } = props;
    return (
        <tr key={email}>
            <td>{name}</td>
            <td>{lastname}</td>
            <td>{email}</td>
            <td>{decision ? decision : "NONE"}</td>
            <td>{workshop !== 0 ? workshop : "NONE"}</td>
            <td>{is_lecture ? "Yes" : "No"}</td>
            <td>{motivation}</td>
            <td><DecisionButtons candidate={candidate}
                onDecisionChange={(event) => onDecisionChange(event, candidate)} />
            </td>
        </tr>
    );
}

export default Candidate;