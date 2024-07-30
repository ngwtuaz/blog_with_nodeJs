import Users from "../models/users.js";
import connection from "../../config/db/index.js";
import { ObjectId } from "mongodb";


class UsersController {
    // GET /api/users
    async apiGetUsers(req, res) {
        try {
            const db = await connection.connect();
            const users = await Users.findAll(db);
            res.json(users);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            await connection.close();
        }
    }

    // GET /api/users/:id
    async apiGetUserById(req, res) {
        try {
            const db = await connection.connect();
            const userId = req.params.id;
            const user = await Users.findById(db, new ObjectId(userId));
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            await connection.close();
        }
    }

    // POST /api/users/create
    async apiCreateUser(req, res) {
        try {
            const db = await connection.connect();
            const newUser = new Users(null, req.body.name, req.body.address, req.body.email);
            const result = await newUser.save(db);
            res.status(201).json({ message: 'User created', id: result.insertedId });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            await connection.close();
        }
    }

}

export default new UsersController();