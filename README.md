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
1. run `docker compose up -d` in terminal in project root directory
2. open keycloak in browser on [localhost:9000](http://localhost:9000)
3. head in to `users` tab
4. click `add user`
5. fill the `username` field with value `username`, then scroll down and click `create`
6. head in to `credentials` tab, click `set password` and set password to be admin and switch of `temporary` option and click save
7. go to `role mapping` tab, click assign role, then from the dropdown select `filter by clients`
8. in the search field type admin and click enter
9. select `admin` role and click `asign`
10. access app in browser on [localhost:3000](http://localhost:3000)
11. when you're requested to log in, do it with username and password from previous steps
