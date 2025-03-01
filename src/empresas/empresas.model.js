import { Schema, model } from "mongoose";

const empresasSchema = Schema ({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    address:{
        type: String,
        required: [true, "address is required"],
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    phone:{
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    impactLevel: {
        type: String,
        required: true
    },
    yearsOfExperience: {
        type: Number,
    },
    category: {
        type: String,
        required: true
    },
<<<<<<< Updated upstream
    createdDateCreation: {
        type: Number,
      }
=======

    fundation: {
        type: Number,
        required: true
    }
>>>>>>> Stashed changes
},
{
    versionKey: false,
    timeStamps: true
})

empresasSchema.methods.toJSON = function(){
    const {__v, password, _id, ...empresa} = this.toObject()
    empresa.uid = _id
        return empresa
    
}

export default model("Empresas", empresasSchema)
