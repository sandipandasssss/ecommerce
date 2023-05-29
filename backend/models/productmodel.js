const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"please enter product description"]
    },
    price:{
        type:Number,
        required:[true,"please enter product price"],
        maxLength:[8,"price cannot exceed 8 charecters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    image:[
    {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
],
category:{
    type:String,
    required:[true,"please add product category"]
},
stock:{
    type:Number,
    required:[true,"please enter product stock"],
    maxlength:[4,"stock cannot exceed 4 characters"],
    default:1
},
numOfReviews: {
    type:Number,
    default:0
},
reviews:[
    {

        User:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true,
            },
        name:{
            type:String,
            required:true,
        
        },
        rating:{
            type:Number,
            required:true,
        },
        comment:{
            type:String,
            required:true
        },
    }
],

User:{
type:mongoose.Schema.ObjectId,
ref:"User",
required:true,
},

createdAt:{
    type:Date,
    default:Date.now
}
})

module.exports = mongoose.model("product",productSchema);
