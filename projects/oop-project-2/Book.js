export class Book {
    constructor(title, author, price) {
        this.title = title;
        this.author = author;
        this.price = price;
    }

    getTitle() {
        return this.title;
    }

    getAuthor() {
        return this.author;
    }

    getPrice() {
        return this.price;
    }

    setPrice(price) {
        if (typeof price == "number") {
            this.price = price;
        }
    }

}