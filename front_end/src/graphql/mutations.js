import { gql } from "@apollo/client";

export const CREATE_EMPLOYEE = gql`


mutation Mutation($employeeInput: EmployeeInput) {
  createEmployee(employeeInput: $employeeInput) {
    _id
    FirstName
    LastName
    Age
    DateOfJoining
    Title
    Department
    EmployeeType
    CurrentStatus
  }
}
  
`