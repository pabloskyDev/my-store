const username: string = 'Nicolas';
const sum = (a: number, b: number): number => {
  return a + b;
}
sum(45, 5);

// Programación Orientada a Objetos
class Person {
  constructor(public age: number, public lastName: string) { }
}

// Instancia de persona
const nico = new Person(15, "Suarez");
nico.age;
