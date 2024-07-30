import authRouter from './auth.route.js';
import postRouter from './post.route.js';
import siteRouter from './site.route.js';
import usersRouter from "./user.route.js";
import apiRouter from './api.route.js';
import Auth from '../app/helpers/Auth.js';

const route = (app) => {
    app.use('/auth', authRouter);
    app.use('/posts', Auth.verifyJWTToken, postRouter);
    app.use('/users', usersRouter);
    app.use('/', siteRouter);
    app.use('/api', apiRouter);

}

export default route;