var express = require('express');
var _ = require('underscore');
var router = express();

var mongoose = require('mongoose');
var Teacher = mongoose.model('Teacher');
var Course = mongoose.model('Course');

function getTeachers(req, res){
	var query = {  };

	var result = Teacher.find(query)
                .populate('courses');
		//Alternatief
		// var result = Teacher.find(query);
		// 
		result.exec().then((data)=>{res.json(data)});
		// result.exec((err, data) => {
		// 	if(err){console.log('err.message: '+err.message)}
		// 	res.json(data);
		// }); 

		
	    //Of gebruik deze verkorte versie. De populate ontbreekt nog. Waar moet deze komen te staan?
        //Teacher.find(query).then((data)=>{res.json(data)})


}

function addTeacher(req, res){
    var teacher = new Teacher(req.body);
    console.log(req.body);
	teacher
		.save()
		.then(savedTeacher => {
			res.status(201);
			res.json(savedTeacher);
		})
		.fail(err => {
			res.status(500);
			console.log(err);
			res.json(err.errors);
		});
}

// Routing
router.route('/')
	.get(getTeachers)
	.post(addTeacher);

	

// Export
module.exports = router;
