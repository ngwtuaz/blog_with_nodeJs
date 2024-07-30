class Post {
    constructor(_id, title, content, author, image, id_users) {
        this._id = _id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.image = image;
        this.id_users = id_users;
    }

    // insert a new post
    async save(db) {
        try {
            const result = await db.collection('posts').insertOne(
                this
            )
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    // get all posts
    static async findAll(db) {
        try {
            const docs = await db.collection('posts').find({}).toArray();
            return docs.map(doc => new Post(doc._id, doc.title, doc.content, doc.author, doc.image));
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    // get a post based on id
    static async findById(db, id) {
        try {
            const doc = await db.collection('posts').findOne({ _id: id });
            return doc;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    // update a post based on id
    async update(db, id) {
        try {
            const result = await db.collection('posts').updateOne(
                { _id: id },
                { $set: { title: this.title, content: this.content, author: this.author, image: this.image } }
            )
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    // delete a post based on id
    static async del(db, id) {
        try {
            const result = await db.collection('posts').deleteOne({ _id: id });
            return result.deletedCount; // Trả về số lượng bản ghi đã xóa
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    async show_byID(db, id_user) {
        try {
            const result = await db.collection('posts').find({ id_users: id_user }).toArray();
            return result
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export default Post;