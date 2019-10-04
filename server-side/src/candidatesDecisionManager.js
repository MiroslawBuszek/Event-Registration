const { queryHandler, findCandidate } = require('./candidatesChoiceRepository');

async function manageDecision(email, adminDecision) {
  try {
    const candidate = await findCandidate(email);
    if (!candidate) return 404;

    if (checkPossibilityOfDecisionChange(candidate, adminDecision)) {
      await queryHandler(
        'UPDATE candidates SET decision = $1 WHERE email = $2;',
        [adminDecision, email]
      );
      return 200;
    } else
      return {
        status: 400,
        message:
          'The decission was unable to change. Try to perform other decision'
      };
  } catch (err) {
    console.log(err);
    return {
      status: 400,
      message:
        'The decission was unable to change. Try to perform other decision'
    };
  }
}

function checkPossibilityOfDecisionChange(candidate, adminDecision) {
  if (candidate.decision === adminDecision) return false;
  else {
    switch (adminDecision) {
      case 'ACC_LEC':
        return lectureCheck(candidate);
      case 'ACC_WOR':
        return workshopCheck(candidate);
      case 'MV_LEC':
        return moveToLectureCheck(candidate);
      case 'REJECTED':
        return rejectionCheck(candidate);
    }
  }
  return false;
}

function lectureCheck(candidate) {
  return (
    candidate.workshop === 0 &&
    candidate.is_lecture === true &&
    (candidate.decision === null || candidate.decision === 'REJECTED')
  );
}

function workshopCheck(candidate) {
  return (
    candidate.workshop !== null &&
    (candidate.decision === null ||
      candidate.decision === 'REJECTED' ||
      candidate.decision === 'MV_LEC')
  );
}

function moveToLectureCheck(candidate) {
  return (
    candidate.workshop !== null &&
    candidate.is_lecture === true &&
    (candidate.decision === null ||
      candidate.decision === 'REJECTED' ||
      candidate.decision === 'ACC_WOR')
  );
}

function rejectionCheck(candidate) {
  return candidate.decision !== 'REJECTED';
}

module.exports = {
  manageDecision,
  findCandidate,
  checkPossibilityOfDecisionChange,
  lectureCheck,
  workshopCheck,
  moveToLectureCheck,
  rejectionCheck
};
