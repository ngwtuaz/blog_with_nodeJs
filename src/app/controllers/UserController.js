import Users from "../models/users.js";
import connection from "../../config/db/index.js";
import { ObjectId } from "mongodb";

class UserController {

    // GET /users
    // index(req, res) {
    //     connection.connect().then(async (db) => {
    //         try {
    //             const result = await Users.findAll(db);
    //             res.render('users/users', { users: result });
    //         } catch (err) {
    //             console.error(err);
    //         } finally {
    //             await connection.close();
    //         }
    //     });
    // }

    // GET /users/:id
    detail(req, res) {
        connection.connect().then(async (db) => {
            try {
                const result = await Users.findById(db, new ObjectId(req.params.id));
                res.render('users/detail', { users: result });
            } catch (err) {
                console.error(err);
            } finally {
                await connection.close();
            }
        });
    }

    // GET /users/create
    create(req, res) {
        res.render('users/create');
    }

    // USER /users/store
    store(req, res) {
        console.log(req.body);
        connection.connect().then(async (db) => {
            try {
                const users = new Users(undefined, req.body.name, req.body.address, req.body.email);
                const result = await users.save(db);
                console.log(result);
                res.redirect('/users');
            } catch (err) {
                console.error(err);
                res.status(500).send('An error occurred');
            } finally {
                await connection.close();
            }
        });
    }
}

export default new UserController();