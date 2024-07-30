import Users from "../models/users.js";
import connection from "../../config/db/index.js";
import bcrypt from "bcrypt";
import Auth from "../helpers/Auth.js";

class AuthController {

    /* REGISTER
    ** path: /auth/resgister
    ** method: POST
    */
    registerform(req, res) {
        if (req.cookies.token) {
            res.redirect('/posts');
        } else {
            res.render('auth/register');
        }
    }
    logout(req, res) {
        
        // Remove the token from the cookie
        res.clearCookie('token');
        res.redirect('/auth/login');
    }
    async register(req, res) {
        //validator
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All field are required" })
            // throw new Error('Name, email, and password are required.');
        }
        // check if email is available
        console.log(`Email: ${email}`);
        connection.connect().then(async (db) => {
            try {
                // check if email is already taken
                const result = await Users.isAvailable(db, email);
                console.log(`Result: ${result}`);
                if (result) {
                    console.log('Email is already taken');
                    // res.render('auth/register', { layout: 'main', message: 'Email is already taken' });
                } else {
                    // hashing password - saltRound = 10
                    bcrypt.hash(req.body.password, 10, function (err, hash) {
                        if (err) {
                            console.error(`Error: ${err}`);
                        } else {
                            console.log(`Hash: ${hash}`);
                            // create new user
                            connection.connect().then(async (db) => {
                                console.log('Creating new user');
                                const user = new Users(undefined, req.body.name, req.body.email, hash);
                                user.save(db).then((result) => {
                                    res.json({ message: 'Register successful' });

                                    // res.redirect('/auth/login')
                                });
                            });
                        }
                    });
                }
            } catch (err) {
                console.error(err);
            } finally {
                await connection.close();
            }
        });
    }

    /* LOGIN
    ** path: /auth/login
    ** method: POST
    */
    loginpage(req, res) {
        // Check if user is already logged in, if so, redirect to posts
        if (req.cookies.token) {
            res.redirect('/posts');
        } else {
            res.render('auth/login');
        }
    }
    async login(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        console.log(`Email: ${email} | Password: ${password}`);
        connection.connect().then(async (db) => {
            try {
                const user = await Users.findByEmail(db, email);
                console.log(typeof user);
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        console.error(err);
                    } else {
                        if (result) {
                            // create token
                            const token = Auth.createJWTToken(email);
                            res.cookie('token', token, {
                                httpOnly: true,
                                secure: false, // false if not using https | true if using https
                                sameSite: 'strict', // use 'strict', 'lax', or 'none'
                                maxAge: 3600000, // expired time, should set to match token expiry (1h)
                            });
                            res.json({ message: 'Login successful' });
                            // res.redirect('/posts');
                        } else {
                            console.log('Login failed');
                            res.json({ message: 'Login failed' });
                        }
                    }
                });
            } catch (err) {
                console.error(err);
            }
        });
    }


}

export default new AuthController();