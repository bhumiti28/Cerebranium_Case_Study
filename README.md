# Cerebranium_Case_Study
Database structure - Image  (./database.jpeg)

Thought process - 
* First i created an express server with some basic necessary setup.
* Used mongo atlas URI for database connection.
* Splitted app and server so the code is maintainable and easy to read.
* Started working on CRUD operations for Professor as to implement authentication i need to have users.
* Implemented crypto package provided by node for one-way password hashing.
* Used uuid for salt generation. (Other option - Use Date function and convert it to string)
* Then for subject used reference for professor and alternate professor. As find operations are faster with object Id in mongoDB.
* By storing object ID we can perform various filter operations quickly.
* Created API for finding subjects by professor or alternate professor.
* To avoid shut down of server used try catch in the controllers.
