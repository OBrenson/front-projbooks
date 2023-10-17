import {Role} from "./role";

export interface User {
  id: String,
  name: String,
  password: String,
  roles: Role[]
}
