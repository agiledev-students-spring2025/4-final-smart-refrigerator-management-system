# Guide to Contributing

## Team Norms

## Git workflow that the team follows
We follow the feature branch workflow.

To add a new feature to the existing app, first create a new branch with new feature on local computer. Then change the code within that branch on local computer. Once finished, push your local repository's feature branch into the remote repository's feature branch. After that, issue a push request to merge the feature branch into main branch. Once the push request is approved, the feature will be added to the current version of the app.

We follow the standard Javascript code conventions. We use ESLint linter and Prettier code formatter to help standardize our code.

## Rules of contributing
- Follow the project’s coding style and guidelines.
- Team members will be assigned tasks during sprint planning or standup meetings.
- Use meaningful commit messages and detailed PR descriptions.
- Discuss new ideas with the team before implementing them.
- Reach out to the team if you have any questions or need guidance. Don't waste time when running into a blocker and ask the chat.
- Remember this is a group project so always stay in touch.
- Present new ideas during sprint planning or add them to the backlog after team discussion.
- Code will be contributed based on assigned tasks.
- Do not commit directly to the main branch. Use pull requests.


## Local Environment Setup
Follow these steps to set up the **Smart Refrigerator Management System (SRMS)** for local development:  

### Prerequisites  
Ensure you have the following installed:  
- **Python 3.9+**  
- **Node.js 16+**
- **MangoDB**
- **Docker**
- **Git**  
- etc...

### Clone the Repository  
```sh
git clone https://github.com/agiledev-students-spring2025/4-final-smart-refrigerator-management-system
```

### Setups
#### **1. Create a virtual environment**
```sh
python -m venv venv
source venv/bin/activate
```
#### **2. Install dependencies**
```sh
pip install -r requirements.txt
```
#### **3. Database setup (using Docker)**
```sh
docker run --name mongodb_dockerhub -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=secret -d mongo:latest
```
#### **4. Back-end setup**
```sh
cd back-end
npm install
npm start
```
#### **5. Front-end Setup**
```sh
cd front-end
npm install
npm start
```
## Testing
```sh
pytest
npm test
```
## API Access
- Backend API:
- Frontend API: