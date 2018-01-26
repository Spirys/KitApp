module.exports.dashboard = function (req, res) {
    if (req.cookies._sessionId) {
        res.render('index', {title: req.cookies._sessionId});
    } else {
        res.render('auth', {title: 'Sign in'});
    }
};