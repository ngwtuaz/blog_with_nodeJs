import express from 'express';
import { engine } from 'express-handlebars';
import { MongoClient } from 'mongodb';
import route from './routes/index.route.js';
import connection from './config/db/index.js';
import Post from './app/models/Post.js';
import Users from './app/models/users.js';
import cookieParser from 'cookie-parser'; // import cookie-parser to use req.cookies
import { ObjectId } from 'mongodb';


const app = express();

// Kết nối với MongoDB
const uri = "mongodb+srv://tuan8421:3Pmltt3NiQvqI0kl@nodejs-asm.wziyhff.mongodb.net/?retryWrites=true&w=majority&appName=nodejs-asm";
const dbName = 'fpldb'; // Tên của database
const collectionName = 'posts'; // Tên của collection

// Route để lấy dữ liệu posts
app.get('/api/posts', async (req, res) => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const documents = await collection.find({}).toArray();
    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); // use cookie-parser to read cookies


// Handlebars
// app.engine('handlebars', engine({}));
// app.use(express.static('src/public/uploads'))
// app.use(express.static("./src/public"));
// app.set('view engine', 'handlebars');
// app.set('views', './src/resources/views');

// Init routes
route(app);

// // Start testing the Post model
// const post = new Post(undefined, "Post - 13 - Update", "This is my updated post", "Ha Hoang");
// connection.connect().then(async (db) => {
//   try {
//     // get all posts
//     const result = await Post.findAll(db);
//     for (let post of result) {
//       console.log(`${post._id}: ${post.title}`);
//     }

//     // save a post
//     // const result = await post.save(db);

//     // update a post
//     // const result = await post.update(db, new ObjectId('65fadf0e24352f951744e951'));

//     // delete a post
//     // const result = await post.del(db, new ObjectId('65fae1cbb7e2168f7e8128b0'));
//     console.log(result);
//   } catch (err) {
//     console.error(err);
//   } finally {
//     await connection.close();
//   }
// });

// // Start testing the Users model
// const users = new Users(undefined, "Users - 14 - Update", "This is my updated post", "Ha Hoang");
// connection.connect().then(async (db) => {
//   try {
//     // get all users
//     const result = await Users.findAll(db);
//     for (let users of result) {
//       console.log(`${users._id}: ${users.name}`);
//     }

//     // save a users
//     // const result = await user.save(db);

//     // update a users
//     // const result = await users.update(db, new ObjectId('65fb4de15c8005b7c0165c47'));

//     // delete a users
//     // const result = await users.del(db, new ObjectId('65fc01e592f7de7bc67bb35c'));
//     console.log(result);
//   } catch (err) {
//     console.error(err);
//   } finally {
//     await connection.close();
//   }
// });

app.listen(3000);