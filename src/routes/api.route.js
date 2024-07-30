import express from "express"; // step 1
import apicontroller from "../app/controllers/ApiController.js";  // step 3
import apiuser from "../app/controllers/ApiUser.js";  // step 3


const router = express.Router(); // step 2
router.get('/posts', apicontroller.apiGetPosts);
router.get('/posts/:id', apicontroller.apiGetPostById);
router.post('/posts/create', apicontroller.apiCreatePost);

router.get('/users', apiuser.apiGetUsers);
router.get('/users/:id', apiuser.apiGetUserById);
router.post('/users/create', apiuser.apiCreateUser);



export default router;