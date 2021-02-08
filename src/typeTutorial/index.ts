/**プリミティブ型(string, number, boolean, symbol, bigint, null, undefined) */
const a1 = 3;
const a2: string = a1;

const a3 = null;
const a4: string = a3;

/**リテラル型
 * プリミティブ型 ⊃ リテラル型
 */
const b1: "foo" = "foo";
const b2: "bar" = "foo";

const b3: "foo" = "foo";
const b4: string = b3;

/**リテラル型と型推論 */
const c1 = "foo"; // c1は"foo"型を持つ(型推論)
const c2: "bar" = c1;

const c3 = "foo"; // c3はstring型に推論される
const c4: string = c3;
const c5: "foo" = c3;

let c6: "foo" = "foo"; // letで宣言する場合も型注釈をつければリテラル型を持たせることが可能
c6 = "bar";

/**オブジェクト型 */
interface MyObj {
  foo: string,
  bar: number,
}
const d1: MyObj = {
  foo: "foo",
  bar: 3,
}
const d2: MyObj = {
  foo: "foo",
  bar: "bar",
};
const d3: MyObj = {
  foo: "foo",
};

interface MyObj2 {
  foo: string;
}
const d4: MyObj = { foo: "foo", bar: 3 };
const d5: MyObj2 = d4; // MyObjはMyObj2の部分型
const d6: MyObj2 = { foo: "foo", bar: 3 }; // オブジェクトリテラルの代入はNG

d7({ foo: "foo", bar: 3 });
function d7(obj: MyObj2): void {
}

/**配列型 */
const e1: number[] = [0, 1, 2, 3];
e1.push(4);

/**関数型 */
const f1: (foo: string) => number = f2;
function f2(arg: string): number {
  return Number(arg);
}

/**関数の部分型関係 */
interface MyObj {
  foo: string;
  bar: number;
}
interface MyObj2 {
  foo: string;
}
const g1: (obj: MyObj2) => void = () => { };
const g2: (obj: MyObj) => void = g1; // 部分型関係
const g3: (foo: string) => void = () => { };
const g4: (foo: string, bar: number) => void = g3;

const g5: (foo: string) => void = () => { };
g5("foo", 3);

/**可変長引数 */
const h1 = (foo: string, ...bar: number[]) => bar;
h1("foo");
h1("bar", 1, 2, 3);
h1("baz", "hey", 2, 3);

/**void型 */
const i1: void = undefined;
const i2: undefined = i1;

function i3(): void {
  console.log("hello");
}
function i4(): undefined {
  console.log("world");
}

/**any型 */
const j1: any = 3;
const j2: string = j1;

/**クラスの型 */
class K {
  method(): void {
    console.log("Hello, world!");
  }
}
const k1: K = new K();

interface MyK {
  method: () => void;
}
const k2: MyK = new K();
const k3: K = k2;

/**ジェネリクス (多相型) */
interface L<S, T> {
  foo: S;
  bar: T;
}
const l1: L<number, string> = {
  foo: 3,
  bar: "hi",
};

class L2<T> {
  constructor(obj: T) {
  }
}
const l3 = new L2<string>("foo");
function l4<T>(obj: T): void {
}
l4<number>(3);

const l5: <T>(obj: T) => void = l4;

function identity<T>(value: T): T {
  return value;
}
const l6 = identity(3); // <number>省略可。valueはnumber型に型推論される
const l7: string = l6;

/**タプル型 (つまりイミュータブル)*/
const m1: [string, number] = ["foo", 5];
const m2: string = m1[0];
function makePair(x: string, y: number): [string, number] {
  return [x, y];
}

const tuple: [string, number] = ["foo", 3];
tuple.pop(); // イミュータブルといいつつ実態は配列なので配列操作が可能になる.
tuple.push("Hey!"); // ここらへんは型システムの限界なので、初めからタプルを控えるのが吉.
const num: number = tuple[1];

const unit: [] = [];

type NumAndStrings = [number, ...string[]];
const m3: NumAndStrings = [3, "foo", "bar"];
const m4: NumAndStrings = [5];
const m5: NumAndStrings = ["foo", "bar"];

type M = [string, number?]; // オプショナル.あってもなくても良い.最後につける、つまり[string?, number]はNG.
const m6: M = ["foo"];
const m7: M = ["foo", 3];

/**タプル型と可変長引数 */
type Args = [string, number, boolean];
const n1 = (...args: Args) => args[1];
const n2 = n1("foo", 3, true);

type Args2 = [string, ...number[]];
const n3 = (f: string, ...args: Args2) => args[0];
const n4 = n3("foo", "bar");
const n5 = n3("foo", "bar", 1, 2, 3);

/**関数呼び出しのspreadとタプル型 */
const o1 = (...args: string[]) => args[0];
const strings: string[] = ["foo", "bar", "baz"];
o1(...strings);

const o2 = (str: string, num: number, b: boolean) => args[0] + args[1];
const args: [string, number, boolean] = ["foo", 3, false];
o2(...args);

/**タプル型と可変長引数とジェネリクス */
function bind<T, U extends any[], R>(
  func: (arg1: T, ...rest: U) => R,
  value: T,
): ((...args: U) => R) {
  return (...args: U) => func(value, ...args);
}
const add = (x: number, y: number) => x + y;
const add1 = bind(add, 1);
console.log(add1(5)); // 6
add1("foo");