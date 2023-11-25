# OVERVIEW

Simple todo app in which you can have account and store, add, update or delete tasks. Each task has following attributes:

- id (uuid v4)
- name
- completion_date
- status
- description (not implemented yet)

# SETUP

## REQUIREMENTS:
In order to use this app you need to have [docker](https://www.docker.com/) installed on your host machine.

## INFO:
You need to configure database and keycloak on your own. Here is quick tutorial how to (run app using command mentioned below and then configure database and keycloak):

### DATABASE ([MYSQL](https://www.mysql.com/))
- create database with name todos and charset utf8mb4
- create table tasks with 4 fields: `id varchar(36) primary key`, `name varchar(50)`, `completion_date datetime`, `status varchar(25)`
- database ready
### [KEYCLOAK](https://www.keycloak.org/)
- log into keycloak [admin console](http://localhost:8080)
- cooming soon

If you have docker installed, simply run command `docker compose up -d` in terminal in project root directory.
