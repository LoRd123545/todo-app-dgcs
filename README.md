# OVERVIEW

Simple TODO app in which you can have account and store, add, update or delete tasks. Each task has following attributes:

- id (uuid v4)
- name
- completion_date
- status
- description (not implemented yet)

# SETUP

## REQUIREMENTS:
In order to use this app you need to have docker installed on your host machine.

## INFO:
Volume sharing is not available yet, so you need to configure database and keycloak on your own. Here is quick tutorial how to:

### DATABASE (MYSQL)
- create database with name todos and charset utf8mb4
- create table tasks with 4 field: `id varchar(36) primary key`, `name varchar(50)`, `completion_date datetime`, `status varchar(25)`
- database ready
### KEYCLOAK
- not implemented yet

If you have docker installed, simply run command `docker compose up -d` in terminal in project root directory.
