var mongoose = require("mongoose");

var teacherSchema = new mongoose.Schema(
  {
    // Schema including validation
    _id: { type: String, required: true, lowercase: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    age: { type: Number, min: 0, max: 100 },
    isActive: { type: Boolean },
    courses: [
      { type: String, required: true, ref: "Course" /* Pseudo-joins */ },
    ],
  },
  {
    // settings:
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

erschema:
// Middleware
teacherSchema.pre('save', function(next){
	console.log('Teacher will be saved');
	next();
	console.log('Teacher is saved');
});

// Validation
teacherSchema.path("lastName").validate(function (val) {
  return val && this.firstName != val;
}, "Last name must differ from first name.");

// Virtuals
teacherSchema.virtual("fullName").get(function () {
  var fullName = this.firstName + " ";
  if (this.middleName && this.middleName.length) {
    fullName += this.middleName + " ";
  }
  fullName += this.lastName;

  return fullName;
});

mongoose.model("Teacher", teacherSchema);
