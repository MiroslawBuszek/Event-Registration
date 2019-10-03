const { manageDecision } = require('./candidatesDecisionManager');
const { getReport } = require('./candidatesForReport');

const {
    getAllMyCandidates,
    addCandidate,
    filterCandidatesOnlyForLecture,
    filterCandidatesForSpecificWorkshop
} = require('./candidatesChoiceController');

function addCandidateChoiceRoutings(app) {
  app.get('/candidates', async (req, res) => {
    res.send(await getAllMyCandidates());
  });

  app.post('/candidates', async (req, res) => {
    const candidate = req.body;
    const result = await addCandidate(candidate);
    res.status(result.status).send(result.message);
  });

  app.get('/candidates/lecture', async (req, res) => {
    res.send(await filterCandidatesOnlyForLecture());
  });

  app.get('/candidates/workshop/:workshop', async (req, res) => {
    const workshop = req.params.workshop;
    res.send(await filterCandidatesForSpecificWorkshop(parseInt(workshop)));
  });

  app.put('/candidates/manageDecision', async (req, res) => {
    const { email, decision } = req.body;
    res.send(await manageDecision(email, decision));
  });

  app.get('/candidates/getForReport', async (req, res) => {
    res.send(await getReport());
  });
}

exports.addCandidateChoiceRoutings = addCandidateChoiceRoutings;