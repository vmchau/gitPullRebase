web: node Server/ServerIndex.js
release: rm -rf Database/migrations; rm -rf Database/seeds; 
knex migrate:make tables; cp Database/initial/populateDatabase.js Database/migrations/*;
knex migrate:latest; knex seed:make insertData;
cp Database/initial/populateTable.js Database/seeds/insertData.js; knex seed:run