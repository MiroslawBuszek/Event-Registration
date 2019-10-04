import React from 'react';
import {workshopLimitEnv, eventLimitEnv} from '../../config'

class Statistics extends React.Component {
    isParticipant = candidates => {
        return candidates.filter(candidate => candidate.decision !== null && candidate.decision !== 'REJECTED').length;
    }

    render() {
        const { allCandidates, filteredCandidates, workshopFilter } = this.props;
        const workshopLimit = workshopLimitEnv;
        const eventLimit = eventLimitEnv;
        const workshopStatistics = `Candidates for workshop: ${this.isParticipant(filteredCandidates)}/${workshopLimit}`;
        const allParticipants = `All candidates: ${this.isParticipant(allCandidates)}/${eventLimit}`
        const errorWorkshop = workshopLimit < filteredCandidates.length ? { color: "red" } : {};
        const errorEvent = eventLimit < allCandidates.length ? { color: "red" } : {};

        return (
            <div>
                {workshopFilter && <div className="left badge" style={errorWorkshop}>{workshopStatistics}</div>}
                <div className="right badge" style={errorEvent}>{allParticipants}</div>
            </div>
        );
    }
}

export default Statistics;