import {Author} from "./author";
import {Genre} from "./genre";
import {Publ} from "./publ";

export interface Book {
  title: String,
  id: String,
  authors: Author[],
  genre: Genre,
  publ: Publ
}
