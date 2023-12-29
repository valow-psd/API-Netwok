const mongoose = require("mongoose")
const {userSchema} = require("../users/User_model")
const {Schema} = mongoose

const restaurantSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    latitude: {
        type: Number,
        require: true
    },
    longitude: {
        type: Number,
        require: true,
    },
    image_url: {
        type: String,
        require: true
    },
    user_list: {
        type: [userSchema],
        default: [],

    }
})

const restaurants = mongoose.model("Restaurants", restaurantSchema)

module.exports = restaurants
