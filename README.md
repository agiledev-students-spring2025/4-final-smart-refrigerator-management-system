# Smart Refrigerator Management System (SRMS)
![CI Build](https://github.com/agiledev-students-spring2025/4-final-smart-refrigerator-management-system/actions/workflows/continuous-integration.yml/badge.svg)
![Deployment Status](https://github.com/agiledev-students-spring2025/4-final-smart-refrigerator-management-system/actions/workflows/continuous-deployment.yml/badge.svg)
## Product Vision Statement

**Sprint 0:**

- **Product Owner** - Jin Lee

- **Scrum Master** - Veronica Zhao

**Sprint 1:**

- **Product Owner** - Veronica Zhao

- **Scrum Master** - Sherry Liu

**Sprint 2:**

- **Product Owner** - Sherry Liu

- **Scrum Master** - Chelsea Hodgson


**Sprint 3:**

- **Product Owner** - Sajid Rahman

- **Scrum Master** - Jin Lee


**Sprint 4:**

- **Product Owner** - Chelsea Hodgson

- **Scrum Master** - Sajid Rahman

Our product vision: Making fridge management smarter—so you waste less, save more, and eat better.

We strive for collaborative fridge management with the user and the system. 
### Themes
- Optimizing space and food category: managing important details (ex. expiration date) without altering allocation of foods in fridge
- Recipie suggestions: suggesting possible recipies before throwing items away 
- Inventory analysis: reducing common failures and encouraging healthy roation in diet

## Team Members
[Veronica Zhao](https://github.com/verozhao)<br>
[Jin Lee](https://github.com/GiveChoco)<br>
[Chelsea Hodgson](https://github.com/Chelsea-Hodgson)<br>
[Sherry Liu](https://github.com/SherryKu)<br>
[Sajidur Rahman](https://github.com/SajidRahman310)


## Project Overview
The Smart Refrigerator Management System (SRMS) is to tackle the issue of food waste caused by poor refrigerator management. With households wasting up to 40% of their food, SRMS aims to provide an intuitive solution for tracking food inventory, monitoring expiration dates, and offering smart storage recommendations tailored to different refrigerator models. The project has grown with contributions from students, researchers, and developers passionate about food sustainability and smart home technology.


## How to Contribute
We welcome contributions from developers, designers, and food sustainability advocates! To get started:
- Read the following guidelines for to set up and run the project or review our [CONTRIBUTING.md](https://github.com/agiledev-students-spring2025/4-final-smart-refrigerator-management-system/blob/master/CONTRIBUTING.md) on coding standards, issue reporting, and feature requests.
- Check open issues on our GitHub repository and comment on those you're interested in.
- Submit pull requests with well-documented code and commit messages.

## Project Set Up

This is a full-stack project with separate front-end and back-end directories. Follow the instructions below to get everything running locally.

### Prerequisites

Make sure you have the following installed on your system before continuing:

- **Node.js** (version 14+ or 16+ recommended)  
- **npm** (comes bundled with Node)
- **MongoDB Atlas Account** (for database)
- **Git** for version control  

**Check Versions**  
```bash
node -v
npm -v
git --version
```
---
### Environment Setup

1. Clone the repository
```bash
git clone https://github.com/agiledev-students-spring2025/4-final-smart-refrigerator-management-system.git
cd 4-final-smart-refrigerator-management-system
```

---

### Front-End Setup (React)

2. Navigate into the front-end folder
```bash
cd front-end
```

3. Install dependencies
```bash
npm install
```

4. Start the front-end server
```bash
npm start
```

The app will open at: http://localhost:3000

---
### Back-End Setup (Express.js)

1. Open a new terminal tab or window

2. Navigate into the back-end folder
```bash
cd back-end
```
3. Edit .env file with your MongoDB Atlas connection string and JWT secret
```bash
cp .env.example .env
```

4. Install dependencies
```bash
npm install
```

5. Start the back-end server
```bash
npm start
```

The API will run at: http://localhost:5001

---
### Testing 
Navigate to the back-end folder and run:
```bash
cd back-end
npm test
```

Tests are written using **Mocha**, **Chai**, and **Chai HTTP**, with c8 for code coverage.

---
### Database Structure
The application uses MongoDB with the following main collections:
- Users: Stores user accounts, preferences, and settings
- Items: Tracks food items in the refrigerator with expiration dates
- Recipes: Stores recipe data that can be recommended to users
- Compartments: Represents different sections of a refrigerator

---
### API Endpoints
#### Authentication
- POST /api/signup: Register a new user
- POST /api/login: Log in a user
- GET /api/profile: Get the logged-in user's profile

#### Items

- GET /api/items: Get all items for the logged-in user
- GET /api/items/:id: Get a specific item
- POST /api/items: Add a new item
- PUT /api/items/:id: Update an item
- DELETE /api/items/:id: Delete an item

#### Recipes

- GET /api/recipes: Get all recipes
- GET /api/recipes/:id: Get a specific recipe
- GET /api/recipes/search: Search recipes

#### Analytics

- GET /api/analytics: Get inventory analytics
- GET /api/waste: Get waste pattern data
- GET /api/recommendations: Get shopping recommendations
---
### Troubleshooting
- If you see an error about missing dependencies, try npm install again.

- Check your Node or npm versions—older versions can cause unexpected issues.

---
## Deployment

The application is deployed using Continuous Deployment with GitHub Actions.

API URL: https://smart-fridge-management-system-n7sfo.ondigitalocean.app/

Any changes pushed to the main branch are automatically deployed to our Digital Ocean droplet.

### Contributing
If you would like to contribute:

1. Fork the repository
2. Create a new feature branch 
```bash
git checkout -b new-feature
```
3. Make your changes and commit 
```bash
git commit -m "Add new feature"
```
4. Push to your fork 
```bash
git push origin new-feature
```
5. Submit a pull request to the main branch.

We appreciate your contributions! Please see our [CONTRIBUTING.md](https://github.com/agiledev-students-spring2025/4-final-smart-refrigerator-management-system/blob/master/CONTRIBUTING.md) for detailed guidelines.


## Additional Resources
- [Project Proposal](https://github.com/agiledev-students-spring2025/4-final-smart-refrigerator-management-system/blob/master/PROPOSAL.md) – In-depth explanation of SRMS goals, features, and target users.

## Stay Updated
Follow us on GitHub for the latest updates. 🚀
