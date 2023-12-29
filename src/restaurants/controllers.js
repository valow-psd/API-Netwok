const Restaurant = require("./Restaurant_model")

async function getRestaurants(req, res) {
    try {
        const restaurants = await Restaurant.find({}).select("-user_list")
        console.log("Récupération des restaurants ")
        res.send(restaurants)
    } catch (e) {
        console.error(e.message)
        console.log("Can't get the restaurant.")
    }
}

async function getRestaurantsById(req, res) {
    try {
        const _id = req.params._id
        const restaurant = await Restaurant.findById({
            _id
        })
        console.log(`Récupération du restaurant ${restaurant?.name} `)
        res.send(restaurant)
    } catch (e) {
        console.error(e.message)
        console.log("Can't get the restaurant.")
    }
}

async function add_restaurant(req, res) {
    try{
        const {name,address,latitude,longitude,image_url} = req.body

        const add_restaurant = await Restaurant.create({
            name:name,
            address:address,
            latitude:latitude,
            longitude:longitude,
            image_url:image_url,
        })
        res.send(add_restaurant)
    }catch (e){
        console.error(e.message)
    }
}

async function delete_restaurant_by_id(req,res) {
    const _id = req.params._id
    console.log(_id)
    try{
        const delete_restaurant_by_id = await Restaurant.findByIdAndDelete(_id)
        res.send(delete_restaurant_by_id)
    }catch (e){
        console.error(e.message)
    }
}
module.exports = {
    getRestaurants,
    getRestaurantsById,
    add_restaurant,
    delete_restaurant_by_id
}