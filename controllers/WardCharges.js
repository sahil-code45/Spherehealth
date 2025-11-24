
const WardCharges = require("../models/WardChargeSchema");

exports.setWardCharges = async (req, res) => {
  try {
    let { category, price, createdAt } = req.body;

    console.log("Incoming Body:", req.body);

    // 👉 Convert category array → string
    if (Array.isArray(category)) {
      category = category[0]; 
    }

    // ❗ Validation
    if (!category || !price) {
      return res
        .status(400)
        .json({ message: "Category and price are required" });
    }

    // ❗ Check duplicate
    const exists = await WardCharges.findOne({ category });
    if (exists) {
      return res
        .status(400)
        .json({ message: `${category} charges already set.` });
    }

    // ✅ Save
    const data = await WardCharges.create({
      category,
      price,
      createdAt: createdAt ? new Date(createdAt) : new Date()
    });

    return res.status(201).json({
      message: "Ward charges saved",
      data
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};



// controller


exports.getWardCharges = async (req, res) => {
  try {
    const data = await WardCharges.find().select('category price -_id');
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
