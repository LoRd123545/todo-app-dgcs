# OVERVIEW

Simple todo app in which you can have account and store, add, update or delete tasks. Each task has following attributes:

- _id: mongodb ObjectID
- name: String
- dueDate: Date
- status: String
- description: String
- userID: String
- favourite: Boolean
# APP REST JSON API
Backend container is running on [localhost:3000](http://localhost:3000), so preprend all url's listed below with it.\
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
keycloak container is running on [host.docker.internal:9000](http://host.docker.internal:9000), so preprend all url's listed below with it.\
\
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

make sure to include `Content-type: application/x-www-form-urlencoded` header in token request.

for sending http requests I recommend postman

# SETUP

## REQUIREMENTS:
In order to use this app you need to have docker installed on your host machine.

## RUN
1. run `docker compose up -d` in terminal in project root directory
2. open keycloak in browser on [localhost:9000](http://localhost:9000)
3. head in to `users` tab
4. if user with name `admin` exists that's it else follow steps below
5. click `add user`
6. fill the `username` field with value `admin`, then scroll down and click `create`
7. head in to `credentials` tab, click `set password` and set password to be admin and switch of `temporary` option and click save
8. go to `role mapping` tab, click assign role, then from the dropdown select `filter by clients`
9. in the search field type admin and click enter
10. select `admin` role and click `asign`
11. access app in browser on [localhost:3000](http://localhost:3000)
12. when you're requested to log in, do it with username and password from previous steps
