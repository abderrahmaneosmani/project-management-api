## Description

REST API for managing products, categories, and users.

## Installation

### Docker Compose

Ensure Docker is installed on your machine.

To run the backend with Docker Compose, use:

```bash
$ docker compose up
```

### Local Machine

To run the backend API on your local machine:

1. Ensure Node.js is installed.

### Database

Install MongoDB and provide the MongoDB URI in the .env file.

```bash
$ npm install
```

## Running the App

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

1. Navigate to the Swagger API and log in at:

(http://localhost:3000/api/)

1. Use these credentials:

Email: [admin@mail.com](mailto:admin@mail.com)

Password: 123456

1. Copy the access token and insert it in the "Authorize" section found in the top-right corner of the Swagger page.

### Categories

To create a category, you must provide an access token for a manager or admin role.

Navigate to the categories section and create a category.

### Products

To create a product, you must provide an access token for a manager or admin role.

Navigate to the products section and create a product.

(You must have a category before creating a product)

### Roles

To create a role, you must have admin credentials.

Create roles with the following codes:

- manager
- client
- admin (created on migration)

### Users

To create users, go to the user section. You must be logged in as an admin.