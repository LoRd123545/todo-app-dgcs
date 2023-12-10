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
log into [keycloak admin console](http://localhost:8080) and import realm using `realm-export.json`, then simply run `docker compose up -d` command in terminal in project root directory
