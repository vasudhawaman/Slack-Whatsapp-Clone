const mongoose=require('mongoose');
const {Schema}= mongoose;

const userSchema=new Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    status:{
        type:String,
        default: "Yo! I am using Talkpal"
    },
    image:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
    }
})

module.exports=mongoose.model("user",userSchema)