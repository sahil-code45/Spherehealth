// // const express = require("express");

// // const router = express.Router();

// // const model = require("../../config/ai");

// // const detectIntent = require("../../ai/intentDetector");
// // const executeTool = require("../../ai/toolExecutor");

// // router.post("/chat", async (req, res) => {
// //   try {
// //     const { message } = req.body;

// //     if (!message) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Message is required",
// //       });
// //     }

// //     const intent = detectIntent(message);

// //     // EXECUTE TOOL

// //     const toolData = await executeTool(intent);

// //     // TOOL RESPONSE

// //     if (toolData) {
// //       return res.json({
// //         success: true,
// //         reply: toolData,
// //       });
// //     }

// //     // Kuch extra instructions jo model ko response short rakhne par majboor karengi
// //     const systemInstruction = ` Reply in simple plain text.
// //     Do not use markdown.
// //     Keep answer professional and clean`;

// //     const prompt = `${systemInstruction}\n\nUser Question: ${message}`;
// //     const result = await model.generateContent(prompt);

// //     const response = result.response;

// //     const text = response.text();

// //     res.status(200).json({
// //       success: true,
// //       reply: text,
// //     });
// //   } catch (error) {
// //     console.log(error);

// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // });

// // module.exports = router;

// const express = require("express");

// const router = express.Router();

// const model = require("../../config/ai");

// const detectIntent = require("../../ai/intentDetector");

// const executeTool = require("../../ai/toolExecutor");

// router.post(
//   "/chat",

//   async (req, res) => {
//     try {
//       const { message } = req.body;

//       // =========================
//       // VALIDATION
//       // =========================

//       if (!message) {
//         return res.status(400).json({
//           success: false,
//           message: "Message is required",
//         });
//       }

//       // =========================
//       // SECURITY BLOCK
//       // =========================

//       const blockedWords = ["delete", "remove", "update", "drop", "edit"];

//       const lowerMessage = message.toLowerCase();

//       const isBlocked = blockedWords.some((word) =>
//         lowerMessage.includes(word),
//       );

//       if (isBlocked) {
//         return res.status(403).json({
//           success: false,
//           message: "Only read operations allowed",
//         });
//       }

//       // =========================
//       // DETECT INTENT
//       // =========================

//       const intent = detectIntent(message);

//       // =========================
//       // EXECUTE TOOL
//       // =========================

//       const toolData = await executeTool(intent);

//       // =========================
//       // TOOL RESPONSE
//       // =========================

//       if (toolData) {
//         // EMPTY DATA CHECK

//         if (Array.isArray(toolData) && toolData.length === 0) {
//           return res.json({
//             success: true,
//             reply: "No matching records found.",
//           });
//         }

//         // AI FORMAT RESPONSE

//         const toolPrompt = `

// You are a professional hospital AI assistant.

// User Question:
// ${message}

// Database Result:
// ${JSON.stringify(toolData)}

// Instructions:

// 1. Format the response in a clean and readable way.

// 2. Show each patient separately.

// 3. Use this exact format:

// --------------------------------

// Patient 1

// Name:
// Age:
// Gender:
// UHID:

// --------------------------------

// 4. Keep response short and professional.

// 5. Do not use markdown.

// 6. Do not generate fake data.

// 7. Only use database data provided.

// `;

//         const aiResult = await model.generateContent(toolPrompt);

//         const aiText = aiResult.response.text();

//         return res.json({
//           success: true,
//           reply: aiText,
//         });
//       }

//       // =========================
//       // NORMAL AI CHAT
//       // =========================

//       const systemInstruction = `

//       Reply in simple plain text.

//       Do not use markdown.

//       Keep answer short, professional and clean.

//       `;

//       const prompt = `

//       ${systemInstruction}

//       User Question:
//       ${message}

//       `;

//       const result = await model.generateContent(prompt);

//       const text = result.response.text();

//       return res.status(200).json({
//         success: true,
//         reply: text,
//       });
//     } catch (error) {
//       console.log(error);

//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   },
// );

// module.exports = router;

// const express = require("express");

// const router = express.Router();

// const model = require("../../config/ai");

// const detectIntent = require("../../ai/intentDetector");
// const executeTool = require("../../ai/toolExecutor");

// router.post("/chat", async (req, res) => {
//   try {
//     const { message } = req.body;

//     if (!message) {
//       return res.status(400).json({
//         success: false,
//         message: "Message is required",
//       });
//     }

//     const intent = detectIntent(message);

//     // EXECUTE TOOL

//     const toolData = await executeTool(intent);

//     // TOOL RESPONSE

//     if (toolData) {
//       return res.json({
//         success: true,
//         reply: toolData,
//       });
//     }

//     // Kuch extra instructions jo model ko response short rakhne par majboor karengi
//     const systemInstruction = ` Reply in simple plain text.
//     Do not use markdown.
//     Keep answer professional and clean`;

//     const prompt = `${systemInstruction}\n\nUser Question: ${message}`;
//     const result = await model.generateContent(prompt);

//     const response = result.response;

//     const text = response.text();

//     res.status(200).json({
//       success: true,
//       reply: text,
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// module.exports = router;

const express = require("express");

const router = express.Router();

const model = require("../../config/ai");

const detectIntent = require("../../ai/intentDetector");

const executeTool = require("../../ai/toolExecutor");

router.post(
  "/chat",

  async (req, res) => {
    try {
      const { message } = req.body;

      // =========================
      // VALIDATION
      // =========================

      if (!message) {
        return res.status(400).json({
          success: false,

          message: "Message is required",
        });
      }

      // =========================
      // SECURITY BLOCK
      // =========================

      const blockedWords = ["delete", "remove", "update", "drop", "edit"];

      const lowerMessage = message.toLowerCase();

      const isBlocked = blockedWords.some((word) =>
        lowerMessage.includes(word),
      );

      if (isBlocked) {
        return res.status(403).json({
          success: false,

          message: "Only read operations allowed",
        });
      }

      // =========================
      // DETECT INTENT
      // =========================

      const intent = await detectIntent(message);

      console.log("Intent:", intent);

      // =========================
      // EXECUTE TOOL
      // =========================

      const toolData = await executeTool(intent);

      // =========================
      // TOOL RESPONSE
      // =========================

      if (toolData) {
        // COUNT RESPONSE

        if (toolData.type === "count") {
          return res.json({
            success: true,

            reply: `Total Patients: ${toolData.data}`,
          });
        }

        // PATIENTS RESPONSE

        if (toolData.type === "patients") {
          const formatted = toolData.data
            .map((patient, index) => {
              return `

━━━━━━━━━━━━━━

Patient ${index + 1}

Name   : ${patient.name}

Email  : ${patient.email}

Phone  : ${patient.phone}

UHID   : ${patient.UHID}

━━━━━━━━━━━━━━
`;
            })
            .join("\n");

          return res.json({
            success: true,

            reply: formatted,
          });
        }
      }

      // =========================
      // NORMAL AI CHAT
      // =========================

      const systemInstruction = `

Reply in simple plain text.

Do not use markdown.

Keep answer short,
professional and clean.

`;

      const prompt = `

${systemInstruction}

User Question:
${message}

`;

      const result = await model.generateContent(prompt);

      const text = result.response.text();

      return res.status(200).json({
        success: true,

        reply: text,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  },
);

module.exports = router;
