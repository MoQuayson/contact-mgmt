seedersDir=./src/database/seeders
migrationDir=./src/database/migrations
fileName=dummy
appDataSource=./dist/app.datasource.js

create-migration:
	typeorm migration:create ${migrationDir}/${fileName}

generate-migration:
	typeorm migration:generate -d ${appDataSource} ${migrationDir}/${fileName}

run-migration:
	typeorm migration:run -d ${appDataSource}

create-seeder:
	typeorm migration:create ${seedersDir}/${fileName}