const candidate = require("../db/models/candidate");
const catchAsync = require("../utils/catchAsync");

const createCandidate = catchAsync(async (req, res, next) => {

  const userId = req.user.id;

  const addCandidate = await candidate.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    availability: req.body.availability,
    linkedIn: req.body.linkedIn,
    gitHub: req.body.gitHub,
    comments: req.body.comments,
    createdBy: userId
  });

  if(!addCandidate){
    return res.status(400).json({ 
      status: "fail",
      message: "Candidate not created"
    })
  }

  res.status(201).json({
    status: "success",
    data: {
        addCandidate,
    },
  });
});

const getAllCandidates = catchAsync(async (req, res, next) => {
  const allCandidates = await candidate.findAll();
  if(!allCandidates){
    return res.status(404).json({
      status: "fail",
      message: "No candidates found"
    })
  }
  res.status(200).json({
    status: "success",
    data: {
        allCandidates,
    },
  });
});

const getCandidateById = catchAsync(async (req, res, next) => {
  const candidateId = req.params.id;
  const candidateById = await candidate.findByPk(candidateId);
  if(!candidateById){
    return res.status(404).json({
      status: "fail",
      message: "Candidate not found"
    })
  }
  res.status(200).json({
    status: "success",
    data: {
        candidateById,
    },
  });
});

const updateCandidate = catchAsync(async (req, res, next) => {
  const candidateId = req.params.id;
  const userId = req.user.id;

  // Utility function to filter the request body
  const filterBody = (body, allowedFields) => {
    const filteredBody = {};
    Object.keys(body).forEach((key) => {
      if (allowedFields.includes(key) && body[key] !== undefined) {
        filteredBody[key] = body[key];
      }
    });
    return filteredBody;
  };

  // Define the fields that are allowed to be updated
  const allowedFields = [
    'firstName',
    'lastName',
    'phoneNumber',
    'email',
    'availability',
    'linkedIn',
    'gitHub',
    'comments'
  ];

  // Filter the request body to get only the fields to be updated
  const updateData = filterBody(req.body, allowedFields);

  // Add the createdBy field
  updateData.createdBy = userId;

  const updatedCandidate = await candidate.update(updateData, {
    where: {
      id: candidateId
    }
  });

  if (!updatedCandidate[0]) {
    return res.status(400).json({
      status: "fail",
      message: "Candidate not updated"
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      updatedCandidate,
    },
  });
});


// delete candidate information
const deleteCandidate = catchAsync(async (req, res) => {
  const candidateId = req.params.id;

  const deleteCandidate = await candidate.destroy({
    where: {
      id: candidateId
    }
  });

  if(!deleteCandidate){
    return res.status(400).json({
      status: "fail",
      message: "Candidate not deleted"
    })
  }

  res.status(200).json({
    status: "success",
    message: "Candidate deleted"
  });
});


module.exports = {createCandidate, getAllCandidates, getCandidateById, updateCandidate, deleteCandidate};