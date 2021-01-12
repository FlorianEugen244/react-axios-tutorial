
let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let database = require('./database/db');


const userRoute = require('../server/routes/user.routes')
const util = require('util')
const userRoutes = express.Router();

mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database connected sucessfully !')
},
    error => {
        console.log('Database could not be connected : ' + error)
    }
)

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());
app.use('/users', userRoute)


const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// Error Handling
app.use((req, res, next) => {
    next(createError(404));
	/*
	console.log('req1');
	console.log(util.inspect(req, {showHidden: false, depth: null}));
	console.log('req2');
	console.log(util.inspect(req, false, null, true ));
	console.log('req3');
	console.log(JSON.stringify(req, null, 4));
	console.log('req4');
	console.dir(req, { depth: null });
	
	console.log('res');
	console.log(util.inspect(res, {showHidden: false, depth: null}));
	console.log('res2');
	console.log(util.inspect(res, false, null, true ));
	console.log('res3');
	console.log(JSON.stringify(res, null, 4));
	console.log('res4');
	console.dir(res, { depth: null });
	*/
	 
	 //console.log('res='+res)
	 //console.log('next='+next)
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});