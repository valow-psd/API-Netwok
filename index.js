const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Obtenir tous les utilisateurs
app.get('/users', async (req, res) => {
  try {
      const users = await prisma.user.findMany();
      res.json(users);
  } catch (e) {
      console.error(e.message);
      res.status(500).send("Can't get the users");
  }
});

// Obtenir un utilisateur par ID
app.get('/users/:id', async (req, res) => {
  try {
      const id = parseInt(req.params.id);
      const user = await prisma.user.findUnique({
          where: { id }
      });
      res.json(user);
  } catch (e) {
      console.error(e.message);
      res.status(500).send("Can't get the user");
  }
});

// Ajouter un utilisateur
app.post('/users', async (req, res) => {
  const { firstname, lastname, company, job_title, email, restaurant_name, is_enter, avatar_url, restaurantId } = req.body;
  try {
      const user = await prisma.user.create({
          data: { firstname, lastname, company, job_title, email, restaurant_name, is_enter, avatar_url, restaurantId },
      });
      res.json(user);
  } catch (e) {
      console.error(e.message);
      res.status(500).send("Can't add the user");
  }
});

// Supprimer un utilisateur par ID
app.delete('/users/:id', async (req, res) => {
  try {
      const id = parseInt(req.params.id);
      await prisma.user.delete({
          where: { id }
      });
      res.send(`User with ID ${id} is deleted`);
  } catch (e) {
      console.error(e.message);
      res.status(500).send("Can't delete the user");
  }
});

// Supprimer tous les utilisateurs
app.delete('/users', async (req, res) => {
  try {
      await prisma.user.deleteMany();
      res.send(`All users are deleted`);
  } catch (e) {
      console.error(e.message);
      res.status(500).send("Can't delete all users");
  }
});


// Modifier partiellement un utilisateur par ID
app.patch('/users/:id', async (req, res) => {
  try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const user = await prisma.user.update({
          where: { id },
          data: updates,
      });
      res.json(user);
  } catch (e) {
      console.error(e.message);
      res.status(500).send("Can't update the user");
  }
});


// Obtenir tous les restaurants
app.get('/restaurants', async (req, res) => {
  try {
      const restaurants = await prisma.restaurant.findMany();
      res.json(restaurants);
  } catch (e) {
      console.error(e.message);
      res.status(500).send("Can't get the restaurants");
  }
});

// Obtenir un restaurant par ID
app.get('/restaurants/:id', async (req, res) => {
  try {
      const id = parseInt(req.params.id);
      const restaurant = await prisma.restaurant.findUnique({
          where: { id }
      });
      res.json(restaurant);
  } catch (e) {
      console.error(e.message);
      res.status(500).send("Can't get the restaurant");
  }
});

// Ajouter un restaurant
app.post('/restaurants', async (req, res) => {
  const { name, address, latitude, longitude, image_1, image_2, image_3 } = req.body;
  try {
      const restaurant = await prisma.restaurant.create({
          data: { name, address, latitude, longitude, image_1, image_2, image_3 },
      });
      res.json(restaurant);
  } catch (e) {
      console.error(e.message);
      res.status(500).send("Can't add the restaurant");
  }
});

// Supprimer un restaurant par ID
app.delete('/restaurants/:id', async (req, res) => {
  try {
      const id = parseInt(req.params.id);
      await prisma.restaurant.delete({
          where: { id }
      });
      res.send(`Restaurant with ID ${id} is deleted`);
  } catch (e) {
      console.error(e.message);
      res.status(500).send("Can't delete the restaurant");
  }
});


// Modifier partiellement un restaurant par ID
app.patch('/restaurants/:id', async (req, res) => {
  try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const restaurant = await prisma.restaurant.update({
          where: { id },
          data: updates,
      });
      res.json(restaurant);
  } catch (e) {
      console.error(e.message);
      res.status(500).send("Can't update the restaurant");
  }
});


//User entre dans un resto
app.patch('/restaurants/:id/enter', async (req, res) => {
    const userId = parseInt(req.body.userId);
    const restaurantId = parseInt(req.params.id);

    try {
        const restaurant = await prisma.restaurant.findUnique({ where: { id: restaurantId } });
        if (!restaurant) return res.status(404).send("Restaurant not found");

        await prisma.user.update({
            where: { id: userId },
            data: { is_enter: true, restaurantId: restaurantId }
        });

        await prisma.restaurant.update({
            where: { id: restaurantId },
            data: { users: { connect: { id: userId } } }
        });

        res.status(200).send(`User ${userId} entered restaurant ${restaurantId}`);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Error in entering the restaurant");
    }
});




// user part d'un resto
app.patch('/restaurants/:id/exit', async (req, res) => {
    const userId = parseInt(req.body.userId);
    const restaurantId = parseInt(req.params.id);

    try {
        const restaurant = await prisma.restaurant.findUnique({ where: { id: restaurantId } });
        if (!restaurant) return res.status(404).send("Restaurant not found");

        await prisma.user.update({
            where: { id: userId },
            data: { is_enter: false, restaurantId: null }
        });

        await prisma.restaurant.update({
            where: { id: restaurantId },
            data: { users: { disconnect: { id: userId } } }
        });

        res.status(200).send(`User ${userId} exited restaurant ${restaurantId}`);
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Error in exiting the restaurant");
    }
});


// Obtenir tous les utilisateurs d'un restaurant spécifique
app.get('/restaurants/:id/users', async (req, res) => {
  try {
      const restaurantId = parseInt(req.params.id);

      const restaurant = await prisma.restaurant.findUnique({
          where: { id: restaurantId },
          include: { users: true } // Assurez-vous d'inclure les utilisateurs
      });

      if (!restaurant) {
          return res.status(404).send("Restaurant not found");
      }

      res.json(restaurant.users);
  } catch (e) {
      console.error(e.message);
      res.status(500).send("Error retrieving users from the restaurant");
  }
});


//Compter le nombre d'utilisateurs dans un restaurant
app.get('/restaurants/:id/userCount', async (req, res) => {
    try {
        const restaurantId = parseInt(req.params.id);

        // Trouver le restaurant avec l'ID fourni
        const restaurant = await prisma.restaurant.findUnique({
            where: { id: restaurantId },
            include: { users: true } // Inclure les utilisateurs liés
        });

        if (!restaurant) {
            return res.status(404).send("Restaurant not found");
        }

        // Compter le nombre d'utilisateurs dans le restaurant
        const userCount = restaurant.users.length;
        res.json({ userCount });
    } catch (e) {
        console.error(e.message);
        res.status(500).send("Error retrieving user count");
    }
});



// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
