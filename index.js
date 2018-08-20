let exampleGoods = [
  { 1: { Skittles: { price: 1.5, count: 2 } } },
  { 2: { Lays: { price: 4, count: 3 } } },
  { 3: { Hersheys: { price: 2, count: 1 } } },
  { 4: { SourGummies: { price: 3, count: 0 } } },
  { 5: { Cola: { price: 2.5, count: 0 } } },
  { 6: {} },
  { 7: {} },
  { 8: {} },
  { 9: {} },
  { 10: {} }
];
let exampleChange = [
  { coinType: "toonie", count: 5, value: 2 },
  { coinType: "loonie", count: 10, value: 1 },
  { coinType: "quarter", count: 10, value: 0.25 },
  { coinType: "dime", count: 10, value: 0.1 },
  { coinType: "nickel", count: 10, value: 0.05 }
];
const vendingMachine = new VendingMachine(exampleGoods, exampleChange);

module.exports = vendingMachine;
