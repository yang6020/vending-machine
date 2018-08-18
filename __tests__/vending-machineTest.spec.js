const VendingMachine = require("../lib/vending-machine");
let exampleGoodsFull = [
  { 1: { Skittles: { price: 1.5, count: 2 } } },
  { 2: { Lays: { price: 4, count: 3 } } },
  { 3: { Hersheys: { price: 2, count: 1 } } },
  { 4: { SourGummies: { price: 3, count: 0 } } },
  { 5: { Cola: { price: 2.5, count: 0 } } },
  { 6: { Warheads: { price: 3.5, count: 2 } } },
  { 7: { Maltesers: { price: 5, count: 3 } } },
  { 8: { Toblerone: { price: 4, count: 5 } } },
  { 9: { Kisses: { price: 1, count: 10 } } },
  { 10: { Nerds: { price: 0.5, count: 8 } } }
];
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

let changeDefault = [
  { coinType: "toonie", count: 5, value: 2 },
  { coinType: "loonie", count: 10, value: 1 },
  { coinType: "quarter", count: 10, value: 0.25 },
  { coinType: "dime", count: 10, value: 0.1 },
  { coinType: "nickel", count: 10, value: 0.05 }
];
let changeEmpty = [
  { coinType: "toonie", count: 0, value: 2 },
  { coinType: "loonie", count: 0, value: 1 },
  { coinType: "quarter", count: 0, value: 0.25 },
  { coinType: "dime", count: 0, value: 0.1 },
  { coinType: "nickel", count: 0, value: 0.05 }
];

describe("vendingMachine", () => {
  describe("when there are no goods", () => {
    it("should return no goods inside", () => {
      expect(new VendingMachine([], changeDefault).showGoods()).toEqual(
        "there are no goods"
      );
    });
  });
  describe("when there are goods", () => {
    it("should return the good name list,price, and count", () => {
      expect(
        new VendingMachine(exampleGoods, changeDefault).showGoods()
      ).toEqual(exampleGoods);
    });
    it("should return the good name list", () => {
      expect(
        new VendingMachine(exampleGoodsFull, changeDefault).showGoodsName()
      ).toEqual([
        "Skittles",
        "Lays",
        "Hersheys",
        "SourGummies",
        "Cola",
        "Warheads",
        "Maltesers",
        "Toblerone",
        "Kisses",
        "Nerds"
      ]);
    });
  });

  describe("when we want to refill change", () => {
    it("should return the change we added", () => {
      const vM = new VendingMachine(exampleGoods, changeEmpty);
      for (let i = 0; i < vM.change.length; i++) {
        expect(vM.change[i].count).toEqual(0);
      }
      vM.refillChange(changeDefault);
      expect(vM.change).toEqual(changeDefault);
    });
  });
  describe("when we want buy a good", () => {
    it("given $ less than the cap, it should return the good and the change", () => {
      const vM = new VendingMachine(exampleGoods, changeDefault);
      expect(vM.buyGood(2, 5)).toEqual([
        "Lays",
        [{ coin: "loonie", count: 1 }]
      ]);
      expect(vM.change[1].count).toEqual(9);
      expect(vM.buyGood(2, 6)).toEqual([
        "Lays",
        [{ coin: "toonie", count: 1 }]
      ]);
      expect(vM.change[0].count).toEqual(4);
      expect(vM.buyGood(1, 4.5)).toEqual([
        "Skittles",
        [{ coin: "toonie", count: 1 }, { coin: "loonie", count: 1 }]
      ]);
      expect(vM.change[0].count).toEqual(3);
      expect(vM.change[1].count).toEqual(8);
    });
    it("given $ higher than the cap, it should return an error", () => {
      const vM = new VendingMachine(exampleGoods, changeDefault);
      expect(vM.buyGood(2, 100)).toEqual("please insert less cash");
    });
    it("if the machine does not have enough change then return an error", () => {
      const vM = new VendingMachine(exampleGoods, changeEmpty);
      expect(vM.buyGood(2, 4.1)).toEqual(
        "the machine does not have enough change"
      );
    });
    it("if the machine does not have enough of the product then return an error", () => {
      const vM = new VendingMachine(exampleGoods, changeEmpty);
      expect(vM.buyGood(5, 5)).toEqual("item is unavailable");
    });
    it("should return insufficient funds if the money isn't enough", () => {
      const vM = new VendingMachine(exampleGoods, changeDefault);
      expect(vM.buyGood(2, 1)).toEqual("insufficient funds");
    });
  });
  describe("when we want to refill a certain good", () => {
    it("should return count+5 of that good", () => {
      const vM = new VendingMachine(exampleGoods, changeDefault);
      expect(vM.goods[3][4]["SourGummies"].count).toEqual(0);
      vM.refillGood("SourGummies");
      expect(vM.goods[3][4]["SourGummies"].count).toEqual(5);
    });
  });

  describe("when we want to insert a new good", () => {
    describe("If there are slots available", () => {
      it("should add the new product to an empty slot", () => {
        const vM = new VendingMachine(exampleGoods, changeDefault);
        expect(vM.goods[4][5]).toEqual({});
        vM.addGood({ Gobstopper: { price: 2.5, count: 10 } });
        expect(vM.goods[4][5]).toEqual({
          Gobstopper: { price: 2.5, count: 10 }
        });
      });
    });
    describe("If there are no slots available", () => {
      it("it should return error no empty slots when using the add function", () => {
        const vM = new VendingMachine(exampleGoodsFull, changeDefault);
        expect(vM.addGood({ Gobstopper: { price: 2.5, count: 10 } })).toEqual(
          "all slots are full, please select an item to replace"
        );
      });
      it("should replace a product on the slot", () => {
        const vM = new VendingMachine(exampleGoodsFull, changeDefault);
        vM.replaceGood(9, { GummyBears: { price: 0.5, count: 20 } });
        expect(vM.goods[8][9]).toEqual({
          GummyBears: { price: 0.5, count: 20 }
        });
      });
    });
  });
  describe("when we want to remove a certain good", () => {
    const vM = new VendingMachine(exampleGoods, changeDefault);
    expect(vM.goods[4][5]).toEqual({ Cola: { price: 2.5, count: 0 } });
    vM.removeGood(5);
    expect(vM.goods[4][5]).toEqual({});
  });
});
