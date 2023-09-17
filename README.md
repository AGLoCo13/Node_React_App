# Node-React.js-Expenses-Application
1.Prerequisities:
You have to install : 

-Node.js(preferably the latest LTS version) https://nodejs.org/en/download/current

-MongoDB running locally https://www.mongodb.com/try/download/community

-MongoDB Database Tools https://www.mongodb.com/try/download/database-tools

     1.Unzip MongoDB database tools 
     2.Copy mongoimport.exe to C:\Program Files\MongoDB\Server\7.0\bin
     


2.Setup and installation 
-Clone the repository:

  git clone https://github.com/AGLoCo13/Node-React.js-Expenses-Application.git
  
  cd Expenses-Application

#install backend dependecies

cd backend

npm install

#move to frontend directory and install dependecies 
(Assuming you are on the frontend directory)
cd.. 

cd frontend

npm install

3.MongoDB configuration

On Windows Machine:

First of all ensure that C:\Program Files\MongoDB\Server\7.0\bin is added to PATH variable  

Ensure that MongoDB is running locally. By Default the application tries to connect to `mongodb://127.0.0.1:27017/commons-db`

Navigate to the directory where the JSON Files are located:
   cd JSON DBCollections 

   #For each collection , run the following:

   
   #example for users and their profiles:

   
   mongoimport --db commons-db --collection users --file users.json

   mongoimport --db commons-db --collection profiles --file profiles.json

  [Site-Admin login credentials:
      email: admin@example.com
      password: Admin!123
   Building-administrator credentials:
      email: tonyGeo@gmail.com
      password: 1234567890123
    A tenant's credentials:
       email: thkam@example.com
       password: 1234567
      ]

  #You can also import the expenses , consumptions , and payments collections that are made to test the app.
      
      

4.Running the application

-Navigate to backend directory:

cd backend

npm run dev

-Navigate to frontend directory:

cd frontend 

npm start
