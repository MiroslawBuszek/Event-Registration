const dotenv = require('dotenv');
dotenv.config()

const endpoint = process.env.REACT_APP_ENDPOINT

const workshop1 = process.env.REACT_APP_WORKSHOP_1
const workshop2 = process.env.REACT_APP_WORKSHOP_2
const workshop3 = process.env.REACT_APP_WORKSHOP_3
const workshop4 = process.env.REACT_APP_WORKSHOP_4
const workshop5 = process.env.REACT_APP_WORKSHOP_5
const workshop6 = process.env.REACT_APP_WORKSHOP_6

const workshopLimitEnv = process.env.REACT_APP_WORKSHOP_LIMIT
const eventLimitEnv = process.env.REACT_APP_EVENT_LIMIT

module.exports = {
    endpoint,
    workshop1,
    workshop2,
    workshop3,
    workshop4,
    workshop5,
    workshop6,
    workshopLimitEnv,
    eventLimitEnv
}