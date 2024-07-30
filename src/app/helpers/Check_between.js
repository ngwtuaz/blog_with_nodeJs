import connection from '../../config/db/index.js';

async function Check(req, res, next) {
    try {
        const db = await connection.connect();
        const result = await db.collection('users').find({ email: req.body.email }).toArray();
        
        if (result.length > 0) {
            const user = result[0];
            res.cookie('value', user);

            if (user.role === 'Admin') {
                console.log('Admin access granted');
            } else {
                console.log('User access granted');
            }
        } else {
            console.log('User not found');
        }

        await connection.close();
        next();
    } catch (err) {
        console.error('Error in Check middleware:', err);
        res.status(500).send('An error occurred');
    }
}
export default Check;