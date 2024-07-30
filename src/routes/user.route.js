import express from "express"; //step1
import userController from "../app/controllers/UserController.js";

const router = express.Router(); //step 2

router.post('/store', userController.store); // localhost:3000/users/store
router.get('/create', userController.create); // localhost:3000/users/create
router.get('/:id', userController.detail);// localhost:3000/users/101
// router.get('/', userController.index); // localhost:3000/user/

export default router;