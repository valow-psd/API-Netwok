const users = require('./document_template/users.json')
const restaurants = require('./document_template/restaurants.json')

const { launchMongoDB, stopMongoDB } = require('./connection.js')

const User_model = require('../src/users/User_model')
const Restaurant_model = require('../src/restaurants/Restaurant_model')


async function deleteExistingDocuments() {
    await User_model.deleteMany({})
    await Restaurant_model.deleteMany({})
    console.log('Existing documents deleted')
}

async function createRestaurantsDocuments() {
    await Restaurant_model.insertMany(restaurants)
    console.log('Restaurants created')
}

async function createUserDocuments() {
    for (const user of users) {
        await User_model.create(user)
    }
    console.log('Users created')
}

async function main() {
    try {
        await launchMongoDB()

        await deleteExistingDocuments()

        await createRestaurantsDocuments()
        await createUserDocuments()
    } catch(err) {
        console.log(err.message)
    } finally {
        await stopMongoDB()
    }
}
main()