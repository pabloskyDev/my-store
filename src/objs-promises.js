const { Observable } = require('rxjs');
const { filter } = require('rxjs/operators');

// Promise
/**
 * Solo se puede pasar una acción por promesa.
 */
const doSomething = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Valor 3');
    }, 3000)
  });
}

(async () => {
  const rta = await doSomething();
  console.log(rta);
})();

// Observable
/**
 * Se pueden pasar varias acciones a ejecutar.
 */
const doSomething$ = () => {
  return new Observable(observer => {
    observer.next('Valor 1 $');
    observer.next('Valor 2 $');
    observer.next('Valor 3 $');
    observer.next(null);
    setTimeout(() => {
      observer.next('Valor 4 $');
    }, 5000)
    setTimeout(() => {
      observer.next(null);
    }, 8000)
    setTimeout(() => {
      observer.next('Valor 5 $');
    }, 10000)
  })
}
// subsscribe: Lee todas las acciones pasados en el observable.
(() => {
  const obs$ = doSomething$();
  obs$
  .pipe(
    filter(value => value !== null)
  )
  .subscribe(rta => {
    console.log(rta);
  })
})();
