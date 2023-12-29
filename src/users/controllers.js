
const User = require("./User_model")
const Restaurant = require("../restaurants/Restaurant_model")
async function getUser(req, res) {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        console.error(e.message)
        console.log("Can't get the user")
    }
}
async function getUserById(req, res) {
    try {
        const _id = req.params._id
        const user = await User.findById({
            _id
        })
        res.send(user)
    } catch (e) {
        console.error(e.message)
        console.log("Can't get the user")
    }
}
async function isEnter(req,res){
    try{
        const _id = req.query._id
        const id_restaurant = req.query.id_restaurant

        const user = await User.findById(_id)
        console.log(user)

        const restaurant = await Restaurant.findById(id_restaurant)

        restaurant.user_list.push(user)

        await restaurant.save()

        res.send(restaurant)
    }catch (e){
        console.error(e.message)
    }
}

async function isExit(req,res){
    try{
        const _id = req.query._id
        const id_restaurant = req.query.id_restaurant

        const restaurant = await Restaurant.findById(id_restaurant)

        const index = restaurant.user_list.findIndex(user => user._id.equals(_id))

        restaurant.user_list.splice(index, 1)

        await restaurant.save()

        res.send(restaurant)
    }catch (e){
        console.error(e.message)
    }
}

async function add_user(req,res){
    const {firstname,lastname,job,enter_date,is_enter,avatar_url} = req.body
    try{
        const user = await User.create({
            firstname:firstname,
            lastname:lastname,
            job:job,
            enter_date:enter_date,
            is_enter:is_enter,
            avatar_url:avatar_url
        })
        res.send (user)
    }catch (e){
        console.error(e.message)
    }
}

async function delete_user_by_id(req,res){
    const _id = req.params._id

    const delete_user_by_id = await User.findByIdAndDelete(_id)
    res.send(delete_user_by_id)
}

module.exports = {
    getUser,
    getUserById,
    isEnter,
    isExit,
    add_user,
    delete_user_by_id
}