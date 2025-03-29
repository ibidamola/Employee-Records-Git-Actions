import { gql } from "@apollo/client";

export const DELETE_EMPLOYEE_BY_ID =gql

`mutation DeleteEmployeeById($employeeId: ID) {
    deleteEmployeeById(employee_id: $employeeId) {
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