const { model } = require('mongoose')
const User = require('../models/user')

module.exports.reg = (req,res)=>{
    res.render('register.ejs')
}
 module.exports.reqP = async(req,res)=>{
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to VapeMap!');
            res.redirect('/shop/all');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}
module.exports.log = (req,res)=>{
    res.render('login')
}
 module.exports.logP = (req,res)=>{
    req.flash('success', 'welcome back!');
    res.redirect('/shop/all')
}
 module.exports.logOut = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/shop/all');
    });
}