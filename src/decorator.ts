// class decorator
function LogClass(constructor: Function) {
  console.log('Logging class:', constructor.name);
}

@LogClass
class MyClass {
  constructor() {
    console.log('Creating instance of MyClass');
  }
}

new MyClass();
