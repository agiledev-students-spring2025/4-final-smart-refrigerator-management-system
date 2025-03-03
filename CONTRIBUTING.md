# Guide to Contributing

## Team Norms
Teams are ideally synchronous for planning work, including task allocation, for effiient task management and rapid team building. Team size remains around 5 members but user stories will lessen over time given the complexity of the project from sprint 0 wireframe.

## Sprint cadence
Around 2 weeks per sprint to maintain an ahievable but not too relaxed pace.

## Daily standups
One fully synchronous call every Wednesday for planning. And 2 smaller progress reports a week, friday and tuesday by messaging. MIA for a full week results in a report to management. Team may redistribute task if time is cruial for it.

## Coding standards
VScode is our code editor and code linter TBA.
Credit to Professorr for the below...
Don't over-engineer. Write minimum code to get things working end to end, only then iterate to improve. - Code for each task and spike must be peer-reviewed and pass tests before merging into the main branch of code.
Always push working code, if you break the pipeline/build then fix it.
Make granular commits, per task or per bug fix.
Provide descriptive commit messages.
Write self documenting code. Use descriptive variable and function names. Avoid unnecessary name shortening.
Don't leave dead/commented out code behind. If you see such code, delete it.
Write automated tests to cover critical integration points and functionality (once you learn how to do that).

## Git workflow that the team follows
We follow the feature branch workflow.

To add a new feature to the existing app, first create a new branch with new feature on local computer. Then change the code within that branch on local computer. Once finished, push your local repository's feature branch into the remote repository's feature branch. After that, issue a push request to merge the feature branch into main branch. Once the push request is approved, the feature will be added to the current version of the app.

We follow the standard Javascript code conventions. We use ESLint linter and Prettier code formatter to help standardize our code.

## Rules of contributing
- Follow the project’s coding style and guidelines.
- Team members will be assigned tasks during sprint planning or standup meetings.
- Use meaningful, single line commit messages and detailed PR descriptions.
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