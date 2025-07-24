# testAI

This repo contains the code for Backend and Frontend for an application that converts a text input in different styles.

This is composed by two main paths

```
TeatAI
  |----- backend
  |----- frontend
```

## Configuring Project

Please execute the following command to clone the repo
```
git clone git@github.com:JuanSeMzl/testAI.git
```

### Run Backend

Go to source path of the cloned repo and execute the following commands:


1. Go to backend path
```
cd backend
```
2. Install requirements:
```
pip install -r requiriments.txt
```
3. Run FastAPI server
```
uvicorn main:app --reload
```
4. Access to http://localhost:8000/docs and you should see something like:

<img width="1486" height="280" alt="Screenshot 2025-07-24 at 12 18 11 AM" src="https://github.com/user-attachments/assets/40af5592-84e2-4b32-b57b-5ade02e3fad4" />

### Run Frontend

1. Go to frontend path:
```
cd frontend
```
2. Install packages
```
npm install
```
3. Start service
```
npm start
```
You should see something like:

![test](https://github.com/user-attachments/assets/03ddeeb9-22f0-49e8-bb18-7fcbc2d54d94)

