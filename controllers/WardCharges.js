
const WardCharges = require("../models/WardChargeSchema");

exports.setWardCharges = async (req, res) => {
  try {
    let data = req.body;

    // If single object → convert to array
    if (!Array.isArray(data)) {
      data = [data];
    }

    const savedData = [];
    const skipped = [];

    for (let item of data) {
      let { category, price, createdAt } = item;

      if (!category || !price) {
        skipped.push({ item, reason: "Category and price required" });
        continue;
      }

      // Convert category to array
      if (!Array.isArray(category)) {
        category = [category];
      }

      // Check duplicate
      const exist = await WardCharges.findOne({ category: category[0] });
      if (exist) {
        skipped.push({ category: category[0], reason: "Already exists" });
        continue;
      }

      // Save
      const saved = await WardCharges.create({
        category,
        price,
        createdAt: createdAt ? new Date(createdAt) : new Date()
      });

      savedData.push(saved);
    }

    return res.status(201).json({
      message: "Processed",
      saved: savedData,
      skipped
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};




// controller


exports.getWardCharges = async (req, res) => {
  try {
    const data = await WardCharges.find().select('category price -_id');
    console.log("----------------------",data);
    
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


// exports.getWardChargesByCategory=async(req,res)=>{
// try{
//   let { _id } = req.query;
//  const data= await WardCharges.findOne({idss:req.params._id});
// //  const data= await WardCharges.findOne({req.params._id});
//  console.log(data,"uuuuuuuuuuuuuuuuuuuuuuuggggggggggg");
//   // const res=res.json(data);
//   // console.log(res,"resssssssssssssssss");
  

  
// }catch(error){
// console.log(error);

// }
// }

exports.getWardChargesByCategory = async (req, res) => {
  try {
     const {id} = req.params;

    if (id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const data = await WardCharges.findOne({id:id});
    console.log(data,"ffffffffff");
    
  
    

    if (!data) {
      return res.status(404).json({ message: "No record found" });
    }

     const SelectedWardData = {
      category: data.category,
      price: data.price,
      
    };

    console.log(SelectedWardData,"ddddddddffffff");
    

    res.json(SelectedWardData);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};



  // try {
  //   let { _id } = req.query; // Query param le rahe hain
  //   if (!_id) {
  //     return res
  //       .status(400)
  //       .json({ success: false, message: "_id is required" });
  //   }

  //   const tpaData = await Servicebilldata.findOne({ _id });
  //   if (!tpaData) {
  //     return res.status(404).json({ success: false, message: "No data found" });
  //   }
  //   const opd_price = tpaData.service.filter((res) => res.Name == "OPD");

  //   const opdData = {
  //     tpa_name: tpaData.tpa_name,
  //     opd_price: opd_price,
  //     id: tpaData._id,
  //   };
  //   res.status(200).json({ success: true, data: opdData });
  // }
