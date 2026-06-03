// const detectIntent = (message) => {

//   const lower =
//     message.toLowerCase();

//   // PATIENTS

//   if (
//     lower.includes("all patients")
//   ) {
//     return {
//       tool: "GET_ALL_PATIENTS",
//     };
//   }

//   // SEARCH PATIENT

//   if (
//     lower.includes("patient")
//   ) {

//     const words =
//       message.split(" ");

//     return {
//       tool: "SEARCH_PATIENT",

//       query:
//         words[words.length - 1],
//     };
//   }

//   // BILLS

//   if (
//     lower.includes("billing")
//   ) {
//     return {
//       tool: "GET_BILLS",
//     };
//   }

//   // SERVICES

//   if (
//     lower.includes("services")
//   ) {
//     return {
//       tool: "GET_SERVICES",
//     };
//   }

//   return {
//     tool: "NORMAL_CHAT",
//   };
// };

// module.exports = detectIntent;




const detectIntent = (message) => {

  const lower =
    message.toLowerCase();

  // PATIENTS

  if (
    lower.includes("all patients")
  ) {
    return {
      tool: "GET_ALL_PATIENTS",
    };
  }

  // SEARCH PATIENT

  if (
    lower.includes("patient")
  ) {

    const words =
      message.split(" ");

    return {
      tool: "SEARCH_PATIENT",

      query:
        words[words.length - 1],
    };
  }

  // BILLS

  if (
    lower.includes("billing")
  ) {
    return {
      tool: "GET_BILLS",
    };
  }

  // SERVICES

  if (
    lower.includes("services")
  ) {
    return {
      tool: "GET_SERVICES",
    };
  }

  return {
    tool: "NORMAL_CHAT",
  };
};

module.exports = detectIntent;


