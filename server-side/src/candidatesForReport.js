const { queryHandler } = require('./candidatesChoiceRepository');
const parameters = 'name, lastname, email';
const corealate_member_name = require('os').userInfo().username;



async function getReport() {
    try {
        const work1 = await queryHandler(`SELECT ${parameters} FROM candidates WHERE corealate_member_name = $1 AND workshop = $2 AND decision = $3;`, [corealate_member_name, 1, "ACC_WOR"]);
        const work2 = await queryHandler(`SELECT ${parameters} FROM candidates WHERE corealate_member_name = $1 AND workshop = $2 AND decision = $3;`, [corealate_member_name, 2, "ACC_WOR"]);  
        const work3 = await queryHandler(`SELECT ${parameters} FROM candidates WHERE corealate_member_name = $1 AND workshop = $2 AND decision = $3;`, [corealate_member_name, 3, "ACC_WOR"]);
        const work4 = await queryHandler(`SELECT ${parameters} FROM candidates WHERE corealate_member_name = $1 AND workshop = $2 AND decision = $3;`, [corealate_member_name, 4, "ACC_WOR"]);
        const work5 = await queryHandler(`SELECT ${parameters} FROM candidates WHERE corealate_member_name = $1 AND workshop = $2 AND decision = $3;`, [corealate_member_name, 5, "ACC_WOR"]);
        const work6 = await queryHandler(`SELECT ${parameters} FROM candidates WHERE corealate_member_name = $1 AND workshop = $2 AND decision = $3;`, [corealate_member_name, 6, "ACC_WOR"]);
        const accLecture = await queryHandler(`SELECT ${parameters} FROM candidates WHERE corealate_member_name = $1 AND decision = $2;`, [corealate_member_name, "ACC_LEC"]);
        const mvLecture = await queryHandler(`SELECT ${parameters} FROM candidates WHERE corealate_member_name = $1 AND decision = $2;`, [corealate_member_name, "MV_LEC"]);
        const rejected = await queryHandler(`SELECT ${parameters} FROM candidates WHERE corealate_member_name = $1 AND decision = $2;`, [corealate_member_name, "REJECTED"]);

        return { work1, work2, work3, work4, work5, work6, accLecture, mvLecture, rejected }
    }
    catch (err) {
        return 400;
    }
}

module.exports = { getReport }