const express = require("express");
const {getRestaurants , getRestaurantsById, add_restaurant,delete_restaurant_by_id} = require("./controllers");

const router = express.Router()

router.get("/restaurants",getRestaurants )
router.get("/restaurants/:_id",getRestaurantsById )

router.post("/add_restaurant",add_restaurant)

router.delete("/delete_restaurant_by_id/:_id",delete_restaurant_by_id)

module.exports = router