## Description

REST API to manage products, categories, and users.

## Installation

### Database

Install MongoDB on your machine and provide the MongoDB URI in the .env file.

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Swagger API
(http://localhost:3000/api)

## Authentication


Navigate to the Swagger API and log in at:
(http://localhost:3000/api/)

Use these credentials:

Email: admin@mail.com
Password: 123456

Grab the token and insert it to authorize.

### Categories
Navigate to categories and create a category.

### Products
Navigate to products and create a product.

### Roles
Create roles with the following names:
- manager
- client
- admin (created on migration)