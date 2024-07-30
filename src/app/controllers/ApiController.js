import Post from "../models/Post.js";
import connection from "../../config/db/index.js";
import { ObjectId } from "mongodb";

class ApiController {
  async apiGetPosts(req, res) {
    try {
      const db = await connection.connect();
      const posts = await Post.findAll(db);
      res.json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await connection.close();
    }
  }

  // GET /api/posts/:id
  async apiGetPostById(req, res) {
    try {
      const db = await connection.connect();
      const postId = req.params.id;
      const post = await Post.findById(db, new ObjectId(postId));
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await connection.close();
    }
  }
  async apiCreatePost(req, res) {
    try {
      const db = await connection.connect();
      const newPost = {
        title: req.body.title, content: req.body.content, author: req.body.author, createdAt: new Date()
      };
      const collection = db.collection('posts');
      const result = await collection.insertOne(newPost);
      res.status(201).json({ message: 'Post created', id: result.insertedId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await connection.close();
    }
  }
}

export default new ApiController();