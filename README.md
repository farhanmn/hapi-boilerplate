# Hapi Boilerplate

## Description

RESTful API using Hapi with Posgre Boilerplate

## Project setup

```bash
$ npm install
```

## Database setup
This project using Prisma ORM.

To create or modify column, you can directly modify the schema on ``/prisma/schema.prisma``.
```bash
# pull existing DB to schema
$ npx prisma db pull

# generate migration after modify schema
$ npx prisma migrate dev --name <name_of_change>

# deploy migration to DB
$ npx prisma migrate deploy

# apply new prisma schema after deploy
$ npx prisma generate
```

## Compile and run the project

```bash
# development
$ npm run dev

# build
$ npm run build

# start
$ npm start
```

## Tech

- [Hapi.dev](https://hapi.dev/) - Build powerful, scalable applications, with minimal overhead and full out-of-the-box functionality - your code, your way
- [Prisma ORM](https://www.prisma.io/) - a next-generation object–relational mapper (ORM) that claims to help developers build faster and make fewer errors
- [JWT](https://jwt.io/) - A compact URL-safe means of representing claims to be transferred between two parties
- [ESLint](https://eslint.org/) - ESLint statically analyzes your code to quickly find problems. It is built into most text editors and you can run ESLint as part of your continuous integration pipeline