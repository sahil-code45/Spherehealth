const Patient = require("../models/patientModel");

// GET ALL PATIENTS

const getAllPatients = async () => {

  return await Patient.find()
    .limit(10);

};

// SEARCH BY UHID

const getPatientByUHID = async (
  UHID
) => {

  return await Patient.findOne({
    UHID,
  });

};

// SEARCH BY NAME

const searchPatientByName =
  async (name) => {

    return await Patient.find({
      name: {
        $regex: name,
        $options: "i",
      },
    });

};

module.exports = {
  getAllPatients,
  getPatientByUHID,
  searchPatientByName,
};