export class Student {
    constructor(name, age, isMale) {
        this.name = name;
        this.age = age;
        this.isMale = isMale;
    }

    getName() {
        return this.name
    }

    getAge() {
        return this.age
    }

    getIsMale() {
        return this.isMale
    }

    study() {
        console.log("The student, " + this.name + ", is now studying!")
    }
}