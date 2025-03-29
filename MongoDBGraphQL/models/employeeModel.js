import mongoose from "mongoose";

//const uri = "mongodb+srv:/npm start/test123:Conestoga@cestar-node.wzsxe.mongodb.net/car_craze?retryWrites=true&w=majority";
const uri =
  "mongodb+srv://adediranaisha:aisha@cluster0.d5bw9pe.mongodb.net/employee?retryWrites=true&w=majority";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(
      "===============================Connected to Mongodb Successfully !!!============================="
    );
  })
  .catch((err) => {
    console.log(
      `######### not Connected due to the error below ##########\n${err}`
    );
  });


const employeeSchema = mongoose.Schema({
  FirstName: {type: String, required: true},
  LastName: {type: String, required: true},
  Age: {type: Number, required: true},
  DateOfJoining: {type: Date, default: new Date()},
  Title: {type: String, enum: ["Employee", "Manager", "Director", "VP"],required: true},
  Department: {type: String, enum: ["IT", "Marketing", "HR", "Engineering"], required: true},
  EmployeeType: {type: String,enum: ["FullTime", "PartTime", "Contract", "Seasonal"], required: true},
  CurrentStatus: {type: Number, default: true},
  Retirement: { type: String },

});

const employeeModel = mongoose.model("employee_data", employeeSchema);

export default employeeModel;
