const User = require('../models/user');

// getUsers

module.exports.getUsers = (req, res, next) => {
    User.findAll()
        .then(users => {
            res.json(users);
        })
        .catch(err => console.log(err));
}

// postAddUser

module.exports.postAddUser = (req, res, next) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        phoneNo: req.body.phoneNo
    })
    .then(result => {
        console.log('CREATED');
        res.json({ created: true });
    })
    .catch(err => console.log(err));
}

// postEditUser

module.exports.postEditUser = (req, res, next) => {
    User.findByPk(req.body.id)
        .then(user => {
            user.name = req.body.name;
            user.email = req.body.email;
            user.phoneNo = req.body.phoneNo;

            return user.save();
        })
        .then(result => {
            console.log('UPDATED');
            res.json({ updated: true });
        })
        .catch(err => console.log(err));
}

// postDeleteUser

module.exports.postDeleteUser = (req, res, next) => {
    User.findByPk(req.params.userId)
        .then(user => {
            return user.destroy();
        })
        .then(result => {
            res.json({ deleted: true })
        })
        .catch(err => console.log(err));
}

