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

## INFO:
You need to configure  keycloak on your own. Here is quick tutorial how to (run app using command mentioned below and then configure keycloak):

### KEYCLOAK
- log into keycloak [admin console](http://localhost:8080)
- cooming soon

If you have docker installed, simply run command `docker compose up -d` in terminal in project root directory.
