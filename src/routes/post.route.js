import express from "express"; // step 1
import postController from "../app/controllers/PostController.js";  // step 3
import Admin from "../app/helpers/Admin_author.js";
import User from "../app/helpers/User_author.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: "src/public/uploads",
    filename: (req, file, cb) => {
        cb(null, file.filename + '' + Date.now() + "" + file.originalname);
    },
});
var uploadMiddleware = multer({ storage }).single("avatar");

const router = express.Router(); // step 2

router.post('/store', User, uploadMiddleware, postController.store);
router.post('/postUser', postController.postUser);
router.get('/create', User, postController.create);
router.get('/delete/:id', Admin, postController.delete);
router.get('/:id', User, postController.detail);
router.get('/', postController.index);

export default router;