# OVERVIEW

Simple todo app in which you can have account and store, add, update or delete tasks. Each task has following attributes:

- id (uuid v4)
- name
- completion_date
- status
- description

# SETUP

## REQUIREMENTS:
In order to use this app you need to have docker installed on your host machine.

## RUN
simply run `docker compose up -d` command in terminal in project root directory, then log into [keycloak admin console](http://localhost:8080) and import realm using `realm-export.json`, then import client using client.json and at the end create user with name and password `admin` with privileges(roles) to manage, query and view users.
