# Trash Walk - Server
> Node.js server to compute and store data, providing services to Trash Walk mobile app.

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

<p align="center">
  <img src="https://i.imgur.com/PhVkn2M.png" />
</p>

Trash Walk is a mobile (iOS) app aimed at helping us make the world a cleaner place! The app is a tool for people cleaning (doing "trash walks"), and uses their phones GPS to save their walks to a shared database. This brings two main benefits:

1. It documents the efforts made, for the ones volunteering their time (and everyone else!).
2. Make the activitity more gratifying to the trash walkers themselves by "gamification" and social functions.

## Table of contents

* [Screenshots](#screenshots)
* [Getting started](#getting-started)
* [Usage](#usage)
* [Postman collection](#postman-collection)
* [Tech Stack](#tech-stack)
* [Developers team](#developers-team)
* [License](#license)

## Screenshots

<p align="center">
  <img src="https://i.imgur.com/EbMH34N.png" />
  <img src="https://i.imgur.com/uho3oCD.png" />
</p>

## Getting started

A few things you have to take in consideration before using Trash Walk - Server

After cloning the repo you'll have to :

### Install global and local dependancies:

* [Node](https://nodejs.org/en/): `brew install node`
* [Npm](https://www.npmjs.com/): `npm install`
* [Homebrew](https://brew.sh/)

### Migrate and connect Postgres database

Install PostgreSQL and PostGIS on your machine:

```bash
brew install postgres
brew install postgis
```

Access PostgresSQL command line on the default database "postgres":

```bash
psql postgres
```

Your bash should now look like this:

```bash
psql (10.3)
Type "help" for help.

postgres=#
```

Now create a new database for the current user and connect it:

```bash
postgres=# CREATE DATABASE trashwalk;
postgres=# \c trashwalk;
```

The result will be:

```bash
You are now connected to database "trashwalk" as user <user-name>.
trashwalk=#
```

Now set a password for the current user:

```bash
trashwalk=# ALTER USER <user_name> WITH PASSWORD 'new_password';
```

Finally, create the extension for PostGIS:

```bash
trashwalk=# CREATE EXTENSION postgis;
```

**Always remember the semicolon or the syntax will not work.**

Now your database setup is finished and you are ready to connect it with the server.

In order to do this, create an **.env** file in the root server folder with this structure:

```dotenv
DB_USER=<user-name>
DB_PASS=<password>
DB_HOST=localhost
DB_PORT=5432
DB_NAME=<db-name>
```

You also can change the port or database name on postgres configuration database.

Finally, migrate the database on your local machine:

```bash
cd trash-walk-backend
node_modules/.bin/sequelize db:migrate
```
## Usage

Start the server:

```bash
cd trash-walk-backend
npm start
```

## Postman collection

Use the [Trash Walk.postman_collection.json](https://github.com/cherlin/trash-walk-backend/blob/develop/Trash-Walk.postman_collection.json) to test all API endpoints.

## Tech Stack

### Back-end:

* [Koa](https://koajs.com/)
* [PostgreSQL](https://www.postgresql.org/) & [PostGIS](https://postgis.net/)
* [Sequelize](http://docs.sequelizejs.com/)

### Front-end: [trash-walk-frontend](https://github.com/cherlin/trash-walk-frontend)

## Developers team

* Christofer Herlin - [GitHub](https://github.com/cherlin) - [LinkedIn](https://www.linkedin.com/in/cherl/)

* Juliane Nagao - [GitHub](https://github.com/junagao) - [LinkedIn](https://www.linkedin.com/in/junagao/)

* Necati Özmen - [GitHub](https://github.com/necatiozmen) - [LinkedIn](https://www.linkedin.com/in/necatiozmen/)

* Marco Antonio Ghiani - [GitHub](https://github.com/marcoantonioghiani01) - [LinkedIn](https://www.linkedin.com/in/marcoantonioghiani/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/cherlin/trash-walk-backend/blob/develop/LICENSE) file for details
