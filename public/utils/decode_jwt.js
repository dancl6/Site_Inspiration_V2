exports.me = function(req,res){
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, secret.secretToken);
        } catch (e) {
            return res.status(401).send('unauthorized');
        }
        var userId = decoded.id;
        // Fetch the user by id 
        User.findOne({id: userId}).then(function(user){
            // Do something with the user
            console.log("user from me is :", user)
            // return res.send(200);
        });
    }
    // return res.send(500);
}