if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
const { render } = require('ejs');
const flash = require('connect-flash')
const session = require('express-session');
const LocalStrategy = require('passport-local');
const passport = require('passport')
const User = require('./models/user')
const shops = require('./routers/shops')
const reviews = require('./routers/rewievs')
const user = require('./routers/users')


mongoose.connect('mongodb://127.0.0.1:27017/newprj',{
    useNewUrlParser: true,
//useCreateIndex: true,//не нужно так как монго обновилось
    useUnifiedTopology: true
}); 

const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open', ()=> {
    console.log('Database connected');
});

app.engine('ejs',ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
const sessionConfig = {
    secret:'wiejcoefccjcjjcinvo',
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly :true,
        expires: Date.now() + 1000 * 60 * 60 *24 * 7,
        maxAge : 1000 * 60 * 60 *24 *7
    }
}
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error')
   next();
 })

app.use('/',user)
app.use('/shop' , shops)
app.use('/shop/:id/reviews' , reviews)

app.get('/home',(req,res)=>{
    res.render('home.ejs')
})
app.listen(4000, () => { 
    console.log('serving on port 4000')
});
///нужно полностю переформатировать свой код,потом изменить сам сайт и темптику(например сделать библиотеки чехии ).после всего жтого можно залить на гит хаб.