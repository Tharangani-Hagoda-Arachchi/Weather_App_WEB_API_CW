const provinceSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: [100, "Name cannot exceed 100 characters!"],
        required: [true, "Name is required!"],
        
      },
   
     
},{
    versionKey:false,
    timestamps: true,
  });

const Provinces = mongoose.model('provinces', provinceSchema);

module.exports= Provinces;