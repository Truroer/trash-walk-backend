# Trash Walk - Server

## Screenshots

<p align="center">
  <img src="https://i.imgur.com/LS7GZtL.png" />
  <img src="https://i.imgur.com/6E2rPR3.png" />
</p>

## Tech Stack

### Front-end

- [React Native](https://facebook.github.io/react-native/)
- [Redux](https://redux.js.org/)

### Back-end

- [Koa](https://koajs.com/)
- [Postgres](https://www.postgresql.org/) & [PostGis](https://postgis.net/)
- [Sequelize](http://docs.sequelizejs.com/)

## Using Trash Walk - Server

A few things you have to take in consideration before using Trash Walk - Server

After cloning the repo you'll have to:

### Install global and local dependancies

* [Node](https://nodejs.org/en/): `brew install node`
* [Npm](https://www.npmjs.com/): `npm install`
* [Xcode](https://developer.apple.com/xcode/)
* [Homebrew](https://brew.sh/)

### Migrate and connect Postgres database

Install PostGres and PostGis on your machine:

```bash
$ brew install postgres
$ brew install postgis
```

Access postgres command line on the default database postgres:

`$ psql postgres`

You should see on your bash a screen like this:

```bash
psql (10.3)
Type "help" for help.

postgres=#
```

Now create a new database for the current user and connect it:

`postgres=# CREATE DATABASE trashwalk;`

`postgres=# \c trashwalk;`

The result will be:

```bash
You are now connected to database "trashwalk" as user <user-name>.
trashwalk=#
```

Now set a password for the current user:

```
trashwalk=# ALTER USER <user_name> WITH PASSWORD 'new_password';
```

Finally, create the extension for PostGis:

`trashwalk=# CREATE EXTENSION postgis;`

Always remember the semicolon or the syntax will not work.

Now your database setup is finished and you are ready to connect it with the server. 

In order to do this, create an **.env** file in the root server folder with this structure:

```plain
DB_USER=<user-name>
DB_PASS=<password>
DB_HOST=localhost
DB_PORT=5432
DB_NAME=<db-name>
```

You also can change the port or database name on postgres configuration database.

Finally, migrate the database on your local machine:

```bash 
$ cd trash-walk-backend
$ node_modules/.bin/sequelize db:migrate
```

## Start the server

In the shell type:

`$ npm start`

## Developers Team

Christofer Herlin- [GitHub](https://github.com/cherlin)

Juliane Nagao- [GitHub](https://github.com/junagao)

Necati Özmen - [GitHub](https://github.com/necatiozmen)

Marco Antonio Ghiani - [GitHub](https://github.com/marcoantonioghiani01)
