const { authentication } = require('../controller/authController');
const { createCandidate, getAllCandidates, getCandidateById, updateCandidate, deleteCandidate } = require('../controller/candidateController');

const router = require('express').Router();

router.route('/').post(authentication, createCandidate)
router.route('/').get(authentication, getAllCandidates)
router.route('/:id').get(authentication, getCandidateById)
router.route('/:id').patch(authentication, updateCandidate)
router.route('/:id').delete(authentication, deleteCandidate)

module.exports = router;