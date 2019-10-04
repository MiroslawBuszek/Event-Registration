const { connectionString } = require('../config');
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: connectionString,
  ssl: true
});

async function queryHandler(query, parameters) {
  return new Promise((resolve, reject) => {
    pool.connect((connect_error, client, done) => {
      if (connect_error) {
        reject(connect_error);
      }

      client.query(query, parameters, (query_error, result) => {
        done();
        if (query_error) {
          reject(query_error.constraint);
        } else {
          resolve(result.rows);
        }
      });
    });
  });
}

async function findCandidate(email) {
  const [candidates] = await queryHandler(
    'SELECT email, workshop, is_lecture, decision FROM candidates WHERE email = $1;',
    [email]
  );
  return candidates;
}

module.exports = {
  queryHandler,
  findCandidate
};
