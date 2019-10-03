const express = require('express');
const { port } = require('./config');
const { addCandidateChoiceRoutings } = require('./src/routings');
const bodyParser = require('body-parser');


const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

addCandidateChoiceRoutings(app);

app.listen(port, () => console.log(`Listening on port ${port}`));