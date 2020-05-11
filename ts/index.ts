// TS automatically figure out that it's string, so we don't need to
// write type annotation like, :string = ''
// works only with !! declaration + initialization !! (in same line)
let myName = 'Adam';
myName = 'Adam Lasak';

//-------------------------------------------------------------------
// Withoug using interface, we can specify object props like a regular
// object
const person: { name: string; age: number } = {
  name: 'Adam',
  age: 23,
};
// person.someNewProp = 20; // ERROR - in TS, structure of an object is strictly defined

const printPerson = (personToPrint: { name: string; age: number }) => {
  return `${personToPrint.name} is ${personToPrint.age} old.`;
};
//-------------------------------------------------------------------

interface Post {
  title: string;
  daysOld: number;
  published: boolean;
}

const post = {
  title: 'Some title',
  daysOld: 10,
  published: true,
};

const printPOst = (postToPrint: Post) => {
  return `${postToPrint.title} is ${postToPrint.daysOld} old.`;
};

//-------------------------------------------------------------------
// Decorator is a plane function which is run whenever the file first
// gets executed, not when an instance of the class is created.
// Can be applied to a class, prop, method, accessor (getters, setters)
// or argument of a method
// Can receive a different arguments
const Component = (target: any) => {
  console.log(target);
};

@Component
class Car {
  // private color: string;
  // private year: number;

  // shortcut for defining props through constructor
  // and not to use 'old way'
  constructor(public color: string, private year: number) {
    // this.color = color;
    // this.year = year;
  }

  public drive() {
    console.log('drive');
  }
}

//-------------------------------------------------------------------
import { Person } from './Person';

const myPerson = new Person();

interface Request {
  header: string;
  body: string;
  print(): void;
}

class HttpRequest implements Request {
  constructor(public header: string, public body: string) {}

  print(): void {
    throw new Error('Method not implemented.');
  }
}
//-------------------------------------------------------------------

class ValueHolder<T> {
  value: T;
}

// returning array of numbers
const numberWrapper = (value: number): number[] => {
  return [value];
};

// generic variant
const valueWrapper = <T>(value: T): T[] => {
  return [value];
};

function sth<T>(params: T) {
  return params;
}

valueWrapper<number>(5);

// TS automatically recognize that type will be number, because of given param is number
valueWrapper(5);
