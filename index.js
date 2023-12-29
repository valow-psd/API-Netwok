const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Créer un utilisateur
app.post('/users', async (req, res) => {
  const { firstname, lastname, company, job_title, email, restaurant_name, is_enter, avatar_url, restaurantId } = req.body;
  const user = await prisma.user.create({
    data: { firstname, lastname, company, job_title, email, restaurant_name, is_enter, avatar_url, restaurantId },
  });
  res.json(user);
});

// Obtenir tous les utilisateurs
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Créer un restaurant
app.post('/restaurants', async (req, res) => {
  const { name, address, latitude, longitude, image_1, image_2, image_3 } = req.body;
  const restaurant = await prisma.restaurant.create({
    data: { name, address, latitude, longitude, image_1, image_2, image_3 },
  });
  res.json(restaurant);
});

// Obtenir tous les restaurants
app.get('/restaurants', async (req, res) => {
  const restaurants = await prisma.restaurant.findMany();
  res.json(restaurants);
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
