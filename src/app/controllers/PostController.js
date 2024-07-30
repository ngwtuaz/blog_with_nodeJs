import Post from "../models/Post.js";
import connection from "../../config/db/index.js";
import { ObjectId } from "mongodb";

class PostController {

    // GET /posts
    index(req, res) {
        connection.connect().then(async (db) => {
            try {
                const result = await Post.findAll(db);
                if (req.cookies.value.role === 'Admin') {
                    res.render('post/post', { posts: result });
                } else if (!req.cookies.value.role) {
                    res.redirect('posts/postUser')
                }

            } catch (err) {
                console.error(err);
            } finally {
                await connection.close();
            }
        });
    }

    // GET /posts/:id
    detail(req, res) {
        connection.connect().then(async (db) => {
            try {
                const result = await Post.findById(db, new ObjectId(req.params.id));
                res.render('post/detail', { post: result });
            } catch (err) {
                console.error(err);
            } finally {
                await connection.close();
            }
        });
    }

    // GET /posts/create
    create(req, res) {
        res.render('post/create');
    }

    // POST /posts/store
    store(req, res) {
        console.log(req.body);
        connection.connect().then(async (db) => {
            try {
                const post = new Post(undefined, req.body.title, req.body.content, req.body.author, req.file.filename, id_user);
                const result = await post.save(db);
                console.log(result);
                res.redirect('/posts');
            } catch (err) {
                console.error(err);
                res.status(500).send('An error occurred');
            } finally {
                await connection.close();
            }
        });
    }
    async delete(req, res) {
        const postId = new ObjectId(req.params.id);

        try {
            const db = await connection.connect();
            const deletedCount = await Post.del(db, postId);

            if (deletedCount === 1) {
                res.redirect('/posts');
            } else {
                res.status(404).send('Post not found');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('An error occurred');
        } finally {
            await connection.close();
        }
    }
    async postUser(req, res) {
        try {
            const db = await connection.connect();
            const result = await Post.show_byID(db, req.cookies.value._id);
            console.log(result);
            res.render('post/postUser', { posts_byIdUser: result });
        } catch (err) {
            console.error(err);
            res.status(500).send('An error occurred');
        } finally {
            await connection.close();
        }
    }
};

export default new PostController();