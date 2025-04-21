const mongoose = require('mongoose');
const Item = require('../models/Item');

const seedStarterItems = async (userId) => {
  try {
    const existingItems = await Item.countDocuments({ 
      isStarterItem: true,
      owner: userId
    });
    
    if (existingItems === 0) {
      const starterItems = [
        // condiments
        { 
          name: 'Salt',
          category: 'condiments',
          quantity: '1 container',
          nonExpiring: true,
          isStarterItem: true,
          expirationDate: new Date(Date.now() + 1000 * 24 * 60 * 60 * 1000),
          owner: userId
        },
        { 
          name: 'Black Pepper',
          category: 'condiments',
          quantity: '1 container',
          nonExpiring: true,
          isStarterItem: true,
          expirationDate: new Date(Date.now() + 1000 * 24 * 60 * 60 * 1000),
          owner: userId
        },
        { 
          name: 'Olive Oil',
          category: 'condiments',
          quantity: '1 bottle',
          nonExpiring: false,
          isStarterItem: true,
          expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          owner: userId
        },
        { 
          name: 'Soy Sauce',
          category: 'condiments',
          quantity: '1 bottle',
          nonExpiring: false,
          isStarterItem: true,
          expirationDate: new Date(Date.now() + 730 * 24 * 60 * 60 * 1000),
          owner: userId
        },
        
        // baking supplies
        { 
          name: 'Sugar',
          category: 'other',
          quantity: '1 bag',
          nonExpiring: true,
          isStarterItem: true,
          expirationDate: new Date(Date.now() + 1000 * 24 * 60 * 60 * 1000),
          owner: userId
        },
        { 
          name: 'Flour',
          category: 'other',
          quantity: '1 bag',
          nonExpiring: false,
          isStarterItem: true,
          expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          owner: userId
        },
        { 
          name: 'Baking Soda',
          category: 'other',
          quantity: '1 box',
          nonExpiring: true,
          isStarterItem: true,
          expirationDate: new Date(Date.now() + 1000 * 24 * 60 * 60 * 1000),
          owner: userId
        },
        
        // grains & pasta
        { 
          name: 'Rice',
          category: 'other',
          quantity: '1 bag',
          nonExpiring: false,
          isStarterItem: true,
          expirationDate: new Date(Date.now() + 730 * 24 * 60 * 60 * 1000),
          owner: userId
        },
        { 
          name: 'Pasta',
          category: 'other',
          quantity: '1 box',
          nonExpiring: false,
          isStarterItem: true,
          expirationDate: new Date(Date.now() + 730 * 24 * 60 * 60 * 1000),
          owner: userId
        },
        
        // refrigerated items
        { 
          name: 'Butter',
          category: 'dairy',
          quantity: '1 package',
          nonExpiring: false,
          isStarterItem: true,
          expirationDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          owner: userId
        },
        { 
          name: 'Eggs',
          category: 'dairy',
          quantity: '1 dozen',
          nonExpiring: false,
          isStarterItem: true,
          expirationDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
          owner: userId
        },
        { 
          name: 'Milk',
          category: 'dairy',
          quantity: '1 gallon',
          nonExpiring: false,
          isStarterItem: true,
          expirationDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
          owner: userId
        },
        
        // canned goods
        { 
          name: 'Canned Beans',
          category: 'other',
          quantity: '1 can',
          nonExpiring: false,
          isStarterItem: true,
          expirationDate: new Date(Date.now() + 1095 * 24 * 60 * 60 * 1000),
          owner: userId
        },
        { 
          name: 'Canned Tomatoes',
          category: 'vegetables',
          quantity: '1 can',
          nonExpiring: false,
          isStarterItem: true,
          expirationDate: new Date(Date.now() + 730 * 24 * 60 * 60 * 1000),
          owner: userId
        },
        { 
          name: 'Chicken Broth',
          category: 'other',
          quantity: '1 container',
          nonExpiring: false,
          isStarterItem: true,
          expirationDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
          owner: userId
        }
      ];
      
      await Item.insertMany(starterItems);
      console.log('Starter items seeded successfully');
    }
  } catch (err) {
    console.error('Error seeding starter items:', err);
  }
};

module.exports = seedStarterItems;