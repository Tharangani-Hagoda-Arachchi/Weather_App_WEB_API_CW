const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: [100, "Name cannot exceed 100 characters!"],
        required: [true, "Name is required!"],
        
      },
   
     
},{
    versionKey:false,
    timestamps: true,
  });

const Districts = mongoose.model('districts', districtSchema);

module.exports= Districts;