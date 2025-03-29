console.log("Welcome From a GraphQl App !!!");
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Query } from "mongoose";
import employeeModel from "./models/employeeModel.js";

// Writing Schema in typeDefs

/**input SearchInput{
    FirstName: String,
    LastName: String,
    Age: Int,
    DateOfJoining: Date,
    Title: String,
    Department: String,
    EmployeeType: String,

    
} */

const typeDefs = `

scalar Date

type Employee {
    _id: ID
    FirstName: String,
    LastName: String,
    Age: Int,
    DateOfJoining: Date,
    Title: String,
    Department: String,
    EmployeeType: String,
    CurrentStatus: Boolean,
    Retirement: String
}




type Query{
    getEmployeeById(_id:ID): Employee

    getAllEmployees : [Employee]

    searchEmployees(searchInput: SearchInput) : [Employee]

}

input SearchInput{
    FirstName: String,
    LastName: String,

    
}

input EmployeeInput {
    FirstName: String,
    LastName: String,
    Age: Int,
    DateOfJoining: Date,
    Title: String,
    Department: String,
    EmployeeType: String,
    CurrentStatus: Boolean
}



type Mutation{
    createEmployee(employeeInput: EmployeeInput): Employee

    insertEmployee_db(employee_details:EmployeeInput) :Employee

    searchEmployeesByName(employee_info:SearchInput): Employee

    updateEmployeeById(curr_id:ID, updated_data:EmployeeInput ): Employee

    deleteEmployeeById(employee_id:ID):Employee
    
}




`;

const resolvers = {
  Query: {
    getEmployeeById: async (parent, args, context, info) => {
      try {
        const id = args._id;
        const employee = await employeeModel.findById(id);
        console.log("Employee from MongoDB:", employee);
        return employee;
      } catch (err) {
        console.log(`getEmployeeById Failed due to the erroe below \n ${err}`);
      }
    },

    getAllEmployees: async (parent, args, context, info) => {
      try {
        const employees = await employeeModel.find();

      
        return employees;
        
      } catch {
        console.log(`getAllEmployees Failed due to the error below \n ${err}`);
      }
    },

    searchEmployees: async (parent, { searchInput }) => {
      try {
        if (!searchInput || !searchInput.FirstName || !searchInput.LastName) {
          throw new Error("Invalid search input");
        }
        const employees = await employeeModel.find({
          FirstName: searchInput.FirstName,
          LastName: searchInput.LastName,
        });
        return employees;
      } catch (err) {
        console.log(`searchEmployees Failed due to the error below \n ${err}`);
      }
    },
  },
  Mutation: {
    createEmployee: async (parent, args, context, info) => {
      try {
        //const employee_to_insert_in_db = new employeeModel({

        //...args. DateOfJoining ,  DateOfJoining : new Date( DateOfJoining)
        //})
        //const employee_saved = await employee_to_insert_in_db.save()
        const newEmployee = new employeeModel(args.employeeInput);
      
        
        const savedEmployee = await newEmployee.save();
        console.log(newEmployee);
        return savedEmployee;
      } catch (err) {
        console.log(err);
      }
    },

    searchEmployeesByName: async (parent, { employee_info }) => {
      try {
        const employees = await employeeModel.find({
          FirstName: employee_info.FirstName,
          LastName: employee_info.LastName,
        });
        return employees;
      } catch (err) {
        console.log(
          `searchEmployeesByName Failed due to the error below \n ${err}`
        );
      }
    },

    updateEmployeeById: async (parent, args, context, info) => {
      try {
        const id = args.curr_id;

        const updated_car = args.updated_data;

        const updated_emp_from_db = await employeeModel.findByIdAndUpdate(
          id,
          updated_car
        );

        console.log(updated_car);

        return updated_car;
      } catch (err) {
        console.log(`Update Failed due to the error below \n ${err}`);
      }
    },

    deleteEmployeeById: async (parent, args, context, info) => {
      try {
        const id = args.employee_id;

        const employee_deleted = await employeeModel.findByIdAndDelete(id);

        console.log(employee_deleted);

        return employee_deleted;
      } catch (err) {
        console.log(`Update Failed due to the error below \n ${err}`);
      }
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4020 },
});

console.log(`🚀  Server ready at: ${url}`);
