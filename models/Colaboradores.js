
const mongoose = require ('mongoose');

const Colaboradores = new mongoose.Schema({
  
    name: {
        type: String ,
        required: true
    },
    email: {
        type: String,
        required: true
    }
      
},
{ 
    timestamps: true,

});

mongoose.model('funcionario',Colaboradores);

