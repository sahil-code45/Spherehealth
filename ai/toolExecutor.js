// const {
//   getAllPatients,
//   searchPatientByName,
// } = require("../tools/patientTool");

// // const {
// //   getAllBills,
// // } = require("../tools/servicetool");

// const {
//   getAllServices,
// } = require("../tools/servicetool");

// const executeTool = async (
//   intent
// ) => {

//   switch (intent.tool) {

//     case "GET_ALL_PATIENTS":

//       return await getAllPatients();

//     case "SEARCH_PATIENT":

//       return await searchPatientByName(
//         intent.query
//       );

//     // case "GET_BILLS":

//     //   return await getAllBills();

//     case "GET_SERVICES":

//       return await getAllServices();

//     default:

//       return null;
//   }
// };

// module.exports = executeTool;



const {

  countPatients,

  getAllPatients,

  findPatient,

} = require("../tools/patientTool");

const executeTool =
  async (intent) => {

    switch(intent.action) {

      // COUNT

      case "COUNT_PATIENTS":

        const total =
          await countPatients();

        return {
          type: "count",
          data: total,
        };

      // GET ALL

      case "GET_ALL_PATIENTS":

        const patients =
          await getAllPatients();

        return {
          type: "patients",
          data: patients,
        };

      // SEARCH

      case "FIND_PATIENT":

        const patient =
          await findPatient(
            intent.query
          );

        return {
          type: "patients",
          data: patient,
        };

      default:

        return null;
    }
};

module.exports =
  executeTool;