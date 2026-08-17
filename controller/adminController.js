const Admin = require("../model/adminModel")

const adminLogin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }
    // Password check
    if (admin.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};


//regiserAdmin

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const image = req.file.filename || "";
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingAdmin = await Admin.findOne({ email });
    console.log(existingAdmin)
    if (existingAdmin) {
      return res.status(200).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const admin = await Admin.create({
      name,
      email,
      password,
      role,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin: {
        _id: admin._id,
        name: name,
        email: admin.email,
        role: admin.role,
        image: admin.image
      },
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//SingleAdmin

const singleAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not Found",

      });
    }
    return res.status(200).json({
      success: true,
      message: "Admin fetched successfully",
      admin,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
//Get All Admin

const getAllAdmin = async (req, res) => {

  try {
    const admin = await Admin.find();
    res.status(200).json({
      status: true,
      message: "admin fetched succesfully",
      data: admin,
    });
  }
  catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    })

  }

}




module.exports = { adminLogin, registerAdmin, singleAdmin, getAllAdmin };