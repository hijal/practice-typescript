// basic enum
enum Direction {
  Up, // 0
  Down, // 1
  Left, // 2
  Right, // 3
  Top, // 4
  Bottom // 5
}

let dir: Direction = Direction.Top;
console.log(dir);

// enum with custom values
enum ArrIndex {
  Zero,
  One,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten = 100 // set value 100 but actual value set 10
}
let index: ArrIndex = ArrIndex.Ten;
console.log(index);

// string enums
enum StringEnum {
  one = 'ONE',
  two = 'TWO',
  three = 'THREE',
  four = 'FOUR',
  five = 'FIVE'
}

const strEnum: StringEnum = StringEnum.five;
console.log(strEnum);

// Computed Enums

enum ComputedEnum {
  // Normal members
  Zero = 0,
  One = 1,
  Two = 2,
  Three = 3,
  // Computed members
  Four = ComputedEnum.One + ComputedEnum.Three,
  Five = ComputedEnum.Two * ComputedEnum.Two,
  Six = ComputedEnum.Five - ComputedEnum.One
}

console.log(ComputedEnum.Four);
console.log(ComputedEnum.Five);
console.log(ComputedEnum.Six);

function move(dir: Direction): void {
  switch (dir) {
    case Direction.Up:
      console.log('Move up');
      break;
    case Direction.Down:
      console.log('Move down');
      break;
    case Direction.Left:
      console.log('Move left');
      break;
    case Direction.Right:
      console.log('Move right');
      break;
    case Direction.Top:
      console.log('Move top');
      break;
    case Direction.Bottom:
      console.log('Move bottom');
      break;
    default:
      console.log('Invalid direction');
      break;
  }
}

move(Direction.Up);
move(Direction.Bottom);

// Enum Members as Types
// let d: Direction.Bottom = Direction.Up; // error
// console.log(d);

let d2: Direction.Bottom = Direction.Bottom; // no error
console.log(d2);
