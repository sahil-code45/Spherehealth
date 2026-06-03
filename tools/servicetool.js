const Service =
  require("../models/servicesModel");

// GET SERVICES

const getAllServices =
  async () => {

    return await Service.find();

};

module.exports = {
  getAllServices,
};