function Admin(req, res, next) {
    const save = req.cookies.value;
    if (save && save.role === 'Admin') {
        console.log('You are Admin');
        req.role = 'Admin';
        next();
    } else {
        console.log('You are not Admin, not permission');
        next('route');
    }
}

export default Admin;