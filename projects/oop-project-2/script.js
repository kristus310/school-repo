import { Book } from "./Book.js";

const book1 = new Book("Harry Potter a Kámen mudrců", "J. K. Rowling", 350);
const book2 = new Book("Twilight", "Stephenie Meyer", 299);

console.log("Name of book1: " + book1.getTitle());
console.log("Author of book2: " + book2.getAuthor());
console.log("Price of both books now: " + book1.getPrice() + ", " + book2.getPrice());
book1.setPrice(125);
book2.setPrice(950);
console.log("Price of both books after change: " + book1.getPrice() + ", " + book2.getPrice());
console.log("And now their sum: " + (book1.getPrice() + book2.getPrice()));

