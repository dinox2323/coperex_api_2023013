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
    createdDateCreation: {
        type: Number,
      }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Empresas", empresasSchema)
