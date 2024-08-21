module.exports = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        console.log('Role in request:', req.user.role);
        const { role } = req.user;

        if (roles.length && !roles.includes(role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        next();
    };
};
