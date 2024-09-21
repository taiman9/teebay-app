## Teebay - Product marketplace application

Application to buy, sell and rent products. Please follow the steps below to run the application.

### Set up environment

Clone/download the repo and activate its python environment

```
source appenv/bin/activate
```

### Set up Database

1) Ensure postgres is installed and start the postgres service

```
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

2. Access psql shell as postgres User

```
sudo -i -u postgres
psql
```

3. Create your User and password
```
CREATE USER your_user_name WITH ENCRYPTED PASSWORD your_password;
```

4. Create your Database
```
CREATE DATABASE your_db_name;
```

5. Grant privileges to the User on the Database
```
GRANT ALL PRIVILEGES ON DATABASE your_db_name TO your_user_name;
```

### Create Database tables and relations

1. Update config/config.json as follows:

```python
{
  "development": {
    "username": "your_user_name",
    "password": "your_password",
    "database": "your_db_name",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "your_user_name",
    "password": "your_password",
    "database": "your_db_name_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "your_user_name",
    "password": "your_password",
    "database": "your_db_name_prod",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

Replace *your_user_name* with your User name, *your_password* with your User password, and *your_db_name* with your Database name. You are going to create the development environment

2. Login to psql as postgres User and alter password if needed

```
sudo -u postgres psql
ALTER USER postgres WITH PASSWORD 'your_password';
\q
```

3. Login to Database as postgres User and grant schema permissions to user

```
psql -U postgres -d your_db_name -h 127.0.0.1
```

```
-- Grant usage on the schema
GRANT USAGE ON SCHEMA public TO your_db_user;

-- Grant privileges to create tables in the schema
GRANT CREATE ON SCHEMA public TO your_db_user;

-- Grant all privileges on all tables in the schema (optional if needed)
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_db_user;

-- Grant all privileges on all sequences in the schema (if using serial or sequences)
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_db_user;
```
*your_db_user* above is *your_user_name*

4. exit psql and run migration files in home directory
```
npx sequelize-cli db:migrate
```

5. Add categories to "Categories" table
```
npx sequelize-cli db:seed:all
```

### Run Backend servers
```
cd teebay-supergraph/
npm run start:all
```

Ensure backend is running by querying following subgraphs:

Query User subgraph at http://localhost:4002/graphql :

```
query {
  users {
    id
    firstName
    lastName
    email
  }
}
```

Query Products subgraph at http://localhost:4003/graphql :

```
query {
  products {
    id
    title
    price
    userId
  }
}
```

### Run Frontend server

1. Install react-scripts if needed

```
cd apollo-client-frontend
npm install react-scripts
```

2. Start the server
```
npm run start
```
3. Check frontend features and database updates work properly
