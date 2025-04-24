const mongoose = require('mongoose');
const Item = require('../models/Item');

const seedStarterItems = async (ownerId) => {
  try {
    // remove old starter items for guest
    await Item.deleteMany({ isStarterItem: true, owner: ownerId });

    const today = new Date();
    const getFutureDate = (daysFromToday) => {
      const date = new Date(today);
      date.setDate(date.getDate() + daysFromToday);
      return date;
    };

    const base = (overrides) => ({
      owner: ownerId,
      nonExpiring: false,
      isStarterItem: true,
      ...overrides,
    });

    const starterItems = [
      // condiments
      base({
        name: 'Salt',
        category: 'condiments',
        quantity: '1 container',
        nonExpiring: true,
        isStarterItem: true,
        expirationDate: getFutureDate(2)
      }),
      base({
        name: 'Black Pepper',
        category: 'condiments',
        quantity: '1 container',
        nonExpiring: true,
        isStarterItem: true,
        expirationDate: getFutureDate(5)
      }),
      base({
        name: 'Olive Oil',
        category: 'condiments',
        quantity: '1 bottle',
        nonExpiring: false,
        isStarterItem: true,
        expirationDate: getFutureDate(8)
      }),
      base({
        name: 'Soy Sauce',
        category: 'condiments',
        quantity: '1 bottle',
        nonExpiring: false,
        isStarterItem: true,
        expirationDate: getFutureDate(10)
      }),

      // baking supplies
      base({
        name: 'Sugar',
        category: 'other',
        quantity: '1 bag',
        nonExpiring: true,
        isStarterItem: true,
        expirationDate: getFutureDate(12)
      }),
      base({
        name: 'Flour',
        category: 'other',
        quantity: '1 bag',
        nonExpiring: false,
        isStarterItem: true,
        expirationDate: getFutureDate(14)
      }),
      base({
        name: 'Baking Soda',
        category: 'other',
        quantity: '1 box',
        nonExpiring: true,
        isStarterItem: true,
        expirationDate: getFutureDate(16)
      }),

      // grains & pasta
      base({
        name: 'Rice',
        category: 'other',
        quantity: '1 bag',
        nonExpiring: false,
        isStarterItem: true,
        expirationDate: getFutureDate(18)
      }),
      base({
        name: 'Pasta',
        category: 'other',
        quantity: '1 box',
        nonExpiring: false,
        isStarterItem: true,
        expirationDate: getFutureDate(20)
      }),

      // refrigerated items
      base({
        name: 'Butter',
        category: 'dairy',
        quantity: '1 package',
        nonExpiring: false,
        isStarterItem: true,
        expirationDate: getFutureDate(22)
      }),
      base({
        name: 'Eggs',
        category: 'dairy',
        quantity: '1 dozen',
        nonExpiring: false,
        isStarterItem: true,
        expirationDate: getFutureDate(24)
      }),
      base({
        name: 'Milk',
        category: 'dairy',
        quantity: '1 gallon',
        nonExpiring: false,
        isStarterItem: true,
        expirationDate: getFutureDate(26)
      }),

      // canned goods
      base({
        name: 'Canned Beans',
        category: 'other',
        quantity: '1 can',
        nonExpiring: false,
        isStarterItem: true,
        expirationDate: getFutureDate(28)
      }),
      base({
        name: 'Canned Tomatoes',
        category: 'vegetables',
        quantity: '1 can',
        nonExpiring: false,
        isStarterItem: true,
        expirationDate: getFutureDate(30)
      }),
      base({
        name: 'Chicken Broth',
        category: 'other',
        quantity: '1 container',
        nonExpiring: false,
        isStarterItem: true,
        expirationDate: getFutureDate(32)
      })
    ];

    await Item.insertMany(starterItems);
    console.log('✅ Starter items seeded successfully');
  } catch (err) {
    console.error('❌ Error seeding starter items:', err);
  }
};

module.exports = seedStarterItems;