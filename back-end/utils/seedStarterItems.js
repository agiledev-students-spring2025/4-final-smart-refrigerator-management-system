const mongoose = require('mongoose');
const Item = require('../models/Item');

const seedStarterItems = async () => {
  try {
    // Remove previously seeded starter items to ensure fresh demo data
    // Comment in only when updating the database
    // await Item.deleteMany({ isStarterItem: true });

    const today = new Date();
    const getFutureDate = (daysFromToday) => {
      const date = new Date(today);
      date.setDate(date.getDate() + daysFromToday);
      return date;
    };

    const starterItems = [
      // condiments
      {
        name: 'Salt',
        category: 'condiments',
        quantity: '1 container',
        nonExpiring: true,
        isStarterItem: true,
        expirationDate: getFutureDate(2)
      },
      {
        name: 'Black Pepper',
        category: 'condiments',
        quantity: '1 container',
        nonExpiring: true,
        isStarterItem: true,
        expirationDate: getFutureDate(5)
      },
      {
        name: 'Olive Oil',
        category: 'condiments',
        quantity: '1 bottle',
        nonExpiring: false,
        isStarterItem: true,
        expirationDate: getFutureDate(8)
      },
      {
        name: 'Soy Sauce',
        category: 'condiments',
        quantity: '1 bottle',
        nonExpiring: false,
        isStarterItem: true,
        expirationDate: getFutureDate(10)
      },

      // baking supplies
      {
        name: 'Sugar',
        category: 'other',
        quantity: '1 bag',
        nonExpiring: true,
        isStarterItem: true,
        expirationDate: getFutureDate(12)
      },
      {
        name: 'Flour',
        category: 'other',
        quantity: '1 bag',
        nonExpiring: false,
        isStarterItem: true,
        expirationDate: getFutureDate(14)
      },
      {
        name: 'Baking Soda',
        category: 'other',
        quantity: '1 box',
        nonExpiring: true,
        isStarterItem: true,
        expirationDate: getFutureDate(16)
      },

      // grains & pasta
      {
        name: 'Rice',
        category: 'other',
        quantity: '1 bag',
        nonExpiring: false,
        isStarterItem: true,
        expirationDate: getFutureDate(18)
      },
      {
        name: 'Pasta',
        category: 'other',
        quantity: '1 box',
        nonExpiring: false,
        isStarterItem: true,
        expirationDate: getFutureDate(20)
      },

      // refrigerated items
      {
        name: 'Butter',
        category: 'dairy',
        quantity: '1 package',
        nonExpiring: false,
        isStarterItem: true,
        expirationDate: getFutureDate(22)
      },
      {
        name: 'Eggs',
        category: 'dairy',
        quantity: '1 dozen',
        nonExpiring: false,
        isStarterItem: true,
        expirationDate: getFutureDate(24)
      },
      {
        name: 'Milk',
        category: 'dairy',
        quantity: '1 gallon',
        nonExpiring: false,
        isStarterItem: true,
        expirationDate: getFutureDate(26)
      },

      // canned goods
      {
        name: 'Canned Beans',
        category: 'other',
        quantity: '1 can',
        nonExpiring: false,
        isStarterItem: true,
        expirationDate: getFutureDate(28)
      },
      {
        name: 'Canned Tomatoes',
        category: 'vegetables',
        quantity: '1 can',
        nonExpiring: false,
        isStarterItem: true,
        expirationDate: getFutureDate(30)
      },
      {
        name: 'Chicken Broth',
        category: 'other',
        quantity: '1 container',
        nonExpiring: false,
        isStarterItem: true,
        expirationDate: getFutureDate(32)
      }
    ];

    await Item.insertMany(starterItems);
    console.log('✅ Starter items seeded successfully');
  } catch (err) {
    console.error('❌ Error seeding starter items:', err);
  }
};

module.exports = seedStarterItems;