# phytoo

```sh
yarn global add expo-cli
```

# PostgreSQL

Install postgresql database on your system.  
Install postgresql nodejs adapter in server folder.

    $ yarn add pg

Log into postgres command line:

    $ sudo -iu postgres

Initialize cluster, create user and database:

    [postgres] initdb --locale fr_FR.UTF-8 -E UTF8 -D /var/lib/postgres/data
    [postgres] createuser --interactive
    [postgres] createdb phytoo

Connect to the database using:

    $ psql -d phytoo
    [postgres] CREATE ROLE phytoo WITH LOGIN PASSPWORD 'change me!' CREATEDB;
    [postgres] GRANT ALL PRIVILEGES ON DATABASE phytoo TO phytoo;

Use only unix socket by changing config in `/var/lib/postgres/data/postgresql.conf`:

    listen_addresses = ''


# server

```sh
yarn create strapi-app server --quickstart
cd server
yarn develop
```

## Create models

```sh
yarn strapi generate:api NAME PROPERTY:TYPE PROP2:TYPE etc...
```

# client

```sh
yarn expo init client
cd client
yarn start
```

# deployment

 * VPS
 * debian 10
 * postgresql
 * certbot
 * nginx
 * nodejs