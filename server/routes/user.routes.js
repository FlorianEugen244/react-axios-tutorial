let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let user = require('../models/user-schema');
const util = require('util')

router.route('/create').post((req, res, next) => {
    user.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

router.route('/').get((req, res) => {
    user.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

router.route('/edit/:id').get((req, res) => {
   console.dir(req.params, { depth: null });
	
	/*
	console.log('req edit');
	console.log(util.inspect(req, {showHidden: false, depth: null}));	 
	console.log('req2 edit');
	console.log(util.inspect(req, false, null, true ));
	console.log('req3 edit');
	console.log(JSON.stringify(req, null, 4));
	console.log('req edit');
	console.dir(req, { depth: null });
	*/
	user.findById(req.params.id, (error, data) => {
        console.log('User updated successfully !=' + data)
		
		if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


router.route('/update/:id').put((req, res, next) => {
    //console.log('--req update');
	//console.log(util.inspect(req.params.id, {showHidden: false, depth: null}));	
	//console.log(util.inspect(req, false, null, true ));
	//console.log('params= '+util.inspect(req.params, false, null, true ));
	//console.log('query= '+util.inspect(req._parsedUrl, false, null, true ));
	//console.log('query= '+util.inspect(req.query, false, null, true ));
	
	console.log('params= '+JSON.stringify(req.params, null, 4));
	console.log('_parsedUrl= '+JSON.stringify(req._parsedUrl, null, 4));
	console.log('query= '+JSON.stringify(req.query, null, 4));
	 
	/*
	console.log('req edit');
	console.log(util.inspect(req, {showHidden: false, depth: null}));	 
	console.log('req2 edit');
	console.log(util.inspect(req, false, null, true ));
	console.log('req3 edit');
	console.log(JSON.stringify(req, null, 4));
	console.log('req edit');
	console.dir(req, { depth: null });
	*/
	
	user.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('User updated successfully !')
        }
    })
})

router.route('/delete/:id').delete((req, res, next) => {
    console.log('params= '+JSON.stringify(req.params, null, 4));
	user.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = router;