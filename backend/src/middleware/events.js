import { EventEmitter } from "node:events";
import KcAdminClient from '@keycloak/keycloak-admin-client';
import dotenv from 'dotenv';

dotenv.config({
  path: '../.env'
});

const {
  KEYCLOAK_BASE_URL: KEYCLOAK_BASE_URL,
  KEYCLOAK_REALM: KEYCLOAK_REALM,
  KEYCLOAK_CLIENT_USER: KEYCLOAK_CLIENT_USER,
  KEYCLOAK_CLIENT_USER_PASSWORD: KEYCLOAK_CLIENT_USER_PASSWORD,
  KEYCLOAK_GRANT_TYPE: KEYCLOAK_GRANT_TYPE,
  KEYCLOAK_CLIENT: KEYCLOAK_CLIENT,
  KEYCLOAK_CLIENT_SECRET: KEYCLOAK_CLIENT_SECRET
} = process.env;

const kcAdminClient = new KcAdminClient({
  baseUrl: KEYCLOAK_BASE_URL,
  realmName: KEYCLOAK_REALM
});

kcAdminClient.auth({
  username: KEYCLOAK_CLIENT_USER,
  password: KEYCLOAK_CLIENT_USER_PASSWORD,
  grantType: KEYCLOAK_GRANT_TYPE,
  clientId: KEYCLOAK_CLIENT,
  clientSecret: KEYCLOAK_CLIENT_SECRET
});

const emitter = new EventEmitter();



export default emitter;