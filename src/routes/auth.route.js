import express from "express";
import authController from "../app/controllers/AuthController.js";
import Check from "../app/helpers/Check_between.js";
import Admin from "../app/helpers/Admin_author.js";

const router = express.Router();

router.get('/logout', authController.logout);
router.get('/register', authController.registerform);
router.get('/login', authController.loginpage);
// router.get('/list', Admin, authController.list);
router.post('/register', authController.register);
router.post('/login', Check, authController.login);

export default router;