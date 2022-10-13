const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const pgPromise = require('pg-promise');
const pgp = pgPromise();
const RegNumberTable = require('./database');
const Routes = require('./routes');

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:pg123@localhost:5432/reg_numbers';
const config = {
  connectionString: DATABASE_URL
}
if (process.env.NODE_ENV == 'production') {
	config.ssl = {
		rejectUnauthorized : false
	}
}
const db = pgp(config);

app.engine("handlebars", hbs.engine({ extname: "handlebars", layoutsDir: __dirname + '/views/layouts' }));
app.set('view engine', 'handlebars');
app.use(express.static("public"));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const regNumberTable = RegNumberTable(db);
const routes = Routes(regNumberTable);

app.get('/', routes.homeRoute);
app.post('/reg_numbers', routes.displayRegNumbers);
app.post('/delete', routes.clearAllRegNumbers);

const PORT = process.env.PORT || 1000;
app.listen(PORT, function(){
  console.log("The greetings app started at port:", PORT);
});