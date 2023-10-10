import {Book} from "./book";

export interface Author {
  name: String,
  id: String,
  books: Book[]
}
