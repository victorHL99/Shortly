CREATE TABLE users(
    "id" serial NOT NULL PRIMARY KEY,
    "name" text NOT NULL,
    "email" text UNIQUE NOT NULL,
    "password" text NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT now()
)

CREATE TABLE links(
    "id" serial NOT NULL PRIMARY KEY,
    "originalLink" text NOT NULL,
    "shortlyLink" text UNIQUE NOT NULL,
    "views" integer NOT NULL DEFAULT 0,
    "creatorId" integer NOT NULL REFERENCES users(id),
    "created_at" TIMESTAMP NOT NULL DEFAULT now()
)

CREATE TABLE sessions(
    "id" serial NOT NULL PRIMARY KEY,
    "token" text UNIQUE NOT NULL,
    "userId" integer NOT NULL REFERENCES users(id),
    "created_at" TIMESTAMP NOT NULL DEFAULT now()
)
