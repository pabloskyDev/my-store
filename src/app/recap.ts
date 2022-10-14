const username: string = 'Nicolas';
const sum = (a: number, b: number): number => {
  return a + b;
}
sum(45, 5);

// Programación Orientada a Objetos
class Person {
  private age: number;
  lastName: string;

  // El constructor inicializa las variables.
  constructor(age: number, lastName: string) {
    this.age = age;
    this.lastName = lastName;
  }
}

// Instancia de persona
const nico = new Person(15, "Suarez");
nico.age;
