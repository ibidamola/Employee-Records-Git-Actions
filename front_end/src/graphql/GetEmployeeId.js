import {gql} from "@apollo/client";

export const GET_EMPLOYEE_BY_ID = gql `

query GetEmployeeById($id: ID) {
    getEmployeeById(_id: $id) {
      FirstName
      LastName
      Age
      CurrentStatus
      DateOfJoining
      Title
      Department
      EmployeeType
      _id
    }
  }

`