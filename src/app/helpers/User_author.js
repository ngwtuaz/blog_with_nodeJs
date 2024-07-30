function User(req, res, next) {
    if (req.role === 'Admin') {
        console.log('You are Admin, access denied for User resources');
        res.status(403).send('Access denied');
    } else {
        console.log('You are User');
        next();
    }
}

export default User;