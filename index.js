const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const bodyparse = require("body-parser");

const app = express();

const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorsRoutes");
const ServicebillRoutes = require("./routes/ServicebillRoutes");
const RegistrationOPDRoutes = require("./routes/Opd");
const BedRoutes = require("./routes/Bedroutes");
const WardchargesRoutes = require("./routes/WardchargesRoutes");
const authRoutes = require("./routes/authRoutes");

const aiRoutes = require("./routes/Airoutes/AigoogleRotes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyparse.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Server is running with MongoDB");
});

app.use("/api/patients", patientRoutes);
app.use("/api/doctordetail", doctorRoutes);
app.use("/api/RegistrationOPD", RegistrationOPDRoutes);
app.use("/api/Servicebilldata", ServicebillRoutes);
app.use("/api/beds", BedRoutes);
app.use("/api/ward-charges", WardchargesRoutes);
app.use("/api", require("./routes/bedMgmt/index"));

app.use("/api/auth", authRoutes);

// AI Route
app.use("/api/ai", aiRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // console.log("keyyyyyy",process.env.JWT_SECRET)
});

module.exports = app;
