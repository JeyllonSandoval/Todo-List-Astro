export const favicon = () => {
    return (req, res, next) => {
        if (req.url === '/favicon.ico') {
            res.status(204);
        } else {
            next();
        }
    };
};