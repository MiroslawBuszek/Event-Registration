const { queryHandler } = require('./candidatesChoiceRepository');
const parameters =
  'name, lastname, email, role, company, corealate_member_name, workshop, is_lecture, motivation, decision';
const corealate_member_name = require('os').userInfo().username;

async function getAllMyCandidates() {
  try {
    return await queryHandler(
      `SELECT ${parameters} FROM candidates WHERE corealate_member_name = $1`,
      [corealate_member_name]
    );
  } catch (err) {
    return 400;
  }
}

async function filterCandidatesOnlyForLecture() {
  try {
    return await queryHandler(
      `SELECT ${parameters} FROM candidates WHERE corealate_member_name = $1 AND is_lecture = $2;`,
      [corealate_member_name, true]
    );
  } catch (err) {
    return 400;
  }
}

async function filterCandidatesForSpecificWorkshop(workshop) {
  try {
    return await queryHandler(
      `SELECT ${parameters} FROM candidates WHERE corealate_member_name = $1 AND workshop = $2;`,
      [corealate_member_name, workshop]
    );
  } catch (err) {
    return 400;
  }
}

async function addCandidate(candidate) {
  try {
    const {
      name,
      lastname,
      email,
      role,
      company,
      workshop,
      is_lecture,
      motivation,
      decision
    } = candidate;

    await queryHandler(
      'INSERT INTO candidates(name, lastname, email, role, company, corealate_member_name, workshop, is_lecture, motivation, decision) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);',
      [
        name,
        lastname,
        email,
        role,
        company,
        corealate_member_name,
        workshop,
        is_lecture,
        motivation,
        decision
      ]
    );
    return { status: 200, message: 'Candidate successfully added' };
  } catch (error) {
    if (error === 'candidates_email_key')
      error = 'Given email already exists. Try something else';
    return { status: 400, message: error };
  }
}

module.exports = {
  getAllMyCandidates,
  addCandidate,
  filterCandidatesOnlyForLecture,
  filterCandidatesForSpecificWorkshop
};
