# OVERVIEW

Simple todo app in which you can have account and store, add, update or delete tasks. Each task has following attributes:

- id (uuid v4)
- name
- completion_date
- status
- description

# APP REST API
Backend container is running on [localhost:3000](localhost:3000), so preprend all url's listed below with it.\
In order to fetch data from listed below url's you need to pass token in `authorization` header of each request in format `Bearer <token>`\
\
get all tasks: `GET /tasks`\
\
get one task: `GET /tasks/:id`\
\
add task: `POST /tasks`\
\
update task: `PUT /tasks/:id`\
\
delete task: `DELETE /tasks/:id`\
\
delete all tasks: `DELETE /tasks`\
\
`:id` is dynamic parameter that stands for task id (you can find out id's of all tasks by fetching data using first route)\

# KEYCLOAK
keycloak container is running on [host.docker.internal:9000](host.docker.internal:9000), so preprend all url's listed below with it.\
token: `POST /realms/:realm/protocol/openid-connect/token`\
\
`:realm` parameter stands for keycloak realm in which app is running which name is `demo`\
In order to obtain access token you need to pass following data in request body:\
\
`client_id` - `client1`\
`client_secret` - in keycloak.json file\
`grant_type` - `password`\
`username` - `admin`\
`password` - `admin`\

for sending http requests I recommend postman

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
