var mongoose = require('mongoose');
var teacherSchema = new mongoose.Schema({
	// Schema including validation
	_id: { type: String, required: true, lowercase: true },
	firstName: { type: String, required: true },
	middleName: { type: String },
	lastName: { type: String, required: true },
	age: {type: Number, min: 0, max: 100 },
	isActive: { type: Boolean},
    courses: [{ type: String, required: true, ref: 'Course' }]
},
{
	toObject: { virtuals: true },
	toJSON: { virtuals: true }
});

// Virtuals
teacherSchema.virtual('fullName').get(function(){
	var fullName = this.firstName + ' ';
	if(this.middleName && this.middleName.length){
		fullName += this.middleName + ' ';
	}
	fullName += this.lastName;

	return fullName;
});
// Custom query function voorbeeld 1
teacherSchema.query.byPage = function (pageSize, pageIndex) {
    return this.find()
        .limit(parseInt(pageSize))
        .skip(pageIndex * pageSize);
};

// Custom query function voorbeeld 2
teacherSchema.query.byName = function () {
    return this.find()
        .sort({firstName : 1}) //probeer ook eens -1
        
};

// Middleware
teacherSchema.pre('save', function(next){
	console.log('Teacher will be saved');
	//next();
	console.log('Teacher is saved');
});



mongoose.model('Teacher', teacherSchema);