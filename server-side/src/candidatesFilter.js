function getAllCandidates(candidates) {
    const allCandidates = candidates.map(candidate => ({
        name: candidate.name,
        lastName: candidate.lastName,
        email: candidate.email,
        motivation: candidate.motivation,
        decision: candidate.decision
    }));

    return allCandidates;
}

function filterCandidatesForLecture(candidates) {
    return candidates.filter(candidate => candidate.lecture === true).length;
}

function filterCandidatesForSpecificWorkshop(candidates, specificWorkshop) {
    return candidates.filter(candidate => candidate.workshop === specificWorkshop).length;
}

module.exports = {
    getAllCandidates,
    filterCandidatesForLecture,
    filterCandidatesForSpecificWorkshop
};
