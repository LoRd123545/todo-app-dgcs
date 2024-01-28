import { Router } from 'express';
import dotenv from 'dotenv';

dotenv.config({
  path: '../.env'
});

const router = Router();

const {
  KEYCLOAK_BASE_URL
} = process.env;

router.get('/', (req, res) => {
  res.redirect(`${KEYCLOAK_BASE_URL}/realms/demo/account`);
});

export default router;