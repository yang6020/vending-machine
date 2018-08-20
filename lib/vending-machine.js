class VendingMachine {
  constructor(goods, change) {
    this.goods = goods;
    this.change = change;
  }

  setup() {
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
    let vendingMachine = new VendingMachine(exampleGoods, changeDefault);
  }

  showGoods() {
    let result = [];
    if (this.goods.length == 0) {
      return "there are no goods";
    } else {
      this.goods.map(good => {
        result.push(good);
      });
    }
    return result;
  }

  showGoodsName() {
    let result = [];
    let final = [];
    if (this.goods.length == 0) {
      return "there are no goods";
    } else {
      this.goods.map(slot => {
        if (Object.keys(slot[Object.keys(slot)]).length > 0)
          result.push(Object.keys(slot[Object.keys(slot)]));
      });
    }
    result.map(names => {
      final.push(names[0]);
    });
    return final;
  }
  addGood(good, price, count) {
    let index = -1;
    for (let i = 0; i < this.goods.length; i++) {
      if (!this.goods[i][i + 1][Object.keys(this.goods[i][i + 1])]) {
        index = i;
        break;
      }
    }
    if (index == -1) {
      return "all slots are full, please select an item to replace";
    } else {
      this.goods[index][index + 1] = {
        [good]: { price: [price][0], count: [count][0] }
      };
    }
  }
  replaceGood(slotNumber, good, price, count) {
    if (slotNumber > 10) {
      return "no slot exists";
    }
    this.goods[slotNumber - 1][slotNumber] = {
      [good]: { price: [price][0], count: [count][0] }
    };
  }

  refillGood(slotNumber) {
    if (slotNumber > 10) {
      return "no slot exists";
    }
    let good = this.goods[slotNumber - 1][slotNumber];
    good[Object.keys(good)].count += 5;
  }

  refillChange(changeToAdd) {
    this.change = changeToAdd;
  }
  removeGood(slotNumber) {
    if (slotNumber > 10) {
      return "no slot exists";
    }
    this.goods[slotNumber - 1][slotNumber] = {};
  }

  buyGood(slotNumber, money) {
    if (slotNumber > 10) {
      return "no slot exists";
    }
    let good = this.goods[slotNumber - 1][slotNumber][
      Object.keys(this.goods[slotNumber - 1][slotNumber])
    ];
    if (money > 20) {
      return "please insert less cash";
    }
    if (good == undefined || good.count == 0) {
      return "item is unavailable";
    }
    if (good.price > money) {
      return "insufficient funds";
    }
    let totalChangeValue = 0;
    for (let j = 0; j < this.change.length; j++) {
      totalChangeValue += this.change[j].count * this.change[j].value;
    }
    let change = money - good.price;
    if (totalChangeValue < change) {
      return "the machine does not have enough change";
    }
    let coinsReturned = [];
    let j = 0;
    let coinCount = 0;
    do {
      if (this.change[j].count == 0 || change - this.change[j].value < 0) {
        if (coinCount !== 0) {
          coinsReturned.push({
            coin: this.change[j].coinType,
            count: coinCount
          });
          j++;
          coinCount = 0;
        } else {
          j++;
        }
      } else {
        change -= this.change[j].value;
        this.change[j].count -= 1;
        coinCount += 1;
        if (change === 0) {
          coinsReturned.push({
            coin: this.change[j].coinType,
            count: coinCount
          });
        }
      }
    } while (change !== 0);
    good.count -= 1;
    return [
      Object.keys(this.goods[slotNumber - 1][slotNumber])[0],
      coinsReturned
    ];
  }
}

module.exports = VendingMachine;
