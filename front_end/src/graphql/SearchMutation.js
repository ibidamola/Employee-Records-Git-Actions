import { gql } from "@apollo/client";

export const SEARCH_EMPLOYEE_BY_NAME = gql`

mutation Mutation($firstName: String, $lastName: String) {
    searchEmployeesByName(FirstName: $firstName, LastName: $lastName) {
      Age
      CurrentStatus
      DateOfJoining
      Department
      EmployeeType
      FirstName
      LastName
      Title
      _id
    }
  }

`