import { gql } from "@apollo/client";

export const GET_ALL_EMPLOYEES = gql`
 
query Query {
  getAllEmployees {
    _id
    FirstName
    LastName
    Age
    CurrentStatus
    DateOfJoining
    Department
    EmployeeType
    Title
    Retirement
  
  }
}
`;