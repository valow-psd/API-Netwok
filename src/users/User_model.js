const mongoose = require("mongoose")

const {Schema} = mongoose

const userSchema = new Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    company: {
        type: String,
        require: true
    },
    job_title: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    restaurant_name:{
        type:String,
        require:true
    },
    is_enter: {
        type: Boolean,
        require: true
    },
    avatar_url: {
        type: String,
        require: true
    }
})

const users = mongoose.model('Users', userSchema)

module.exports = users