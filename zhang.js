let Product = function (name, price, stock) {
  this.name = name;
  this.price = price;
  this.stock = stock;
  this.addStock = function(quantity) {
    this.stock += quantity;
  }
  this.show = function(){
    console.log(`${this.name}, ${this.price}元, ${this.stock}件`);
  }
}

let SellingMachine = function () {
  this.products = [
    new Product('水', 2, 10),
    new Product('可乐', 3, 10),
    new Product('牛奶', 5, 10),
  ];
  this.list = function() {
    console.log(`销售以下商品：`);
    this.products.forEach(m => m.show());
  }
  this.replenishment = function(name, quantity){
    if (quantity <= 0) {
      throw new Error('quantity必须大于0');
    }
    const product = this.products.find(x => x.name == name);
    if (product === undefined) {
      console.log(`不销售${name}`);
      return;
    }
    product.addStock(quantity);
    console.log(`补货成功，${product.name}剩余${product.stock}件`);
  }
  this.sell = function(name, quantity, money) {
    const product = this.products.find(x => x.name == name);
    if (product === undefined) {
      console.log(`不销售${name}`);
      return;
    }

    if (product.stock < quantity) {
      console.log(`库存不足，${product.name} 仅剩 ${product.stock} 件`);
      return;
    }

    const totalPrice = quantity * product.price;
    if (money < totalPrice) {
      console.log(`金额不足，${name} ${quantity}件应付￥${totalPrice}`);
      return;
    }

    product.addStock(-quantity);
    const rest = money - totalPrice;
    console.log(`成功购买商品：${name}, ${quantity}件, 共${totalPrice}元，请取走您的商品。${rest>0?`以及零钱${rest}元。`:''}`);
    return rest;
  }
}

const machine = new SellingMachine();
machine.list();
machine.sell('饼干');
machine.sell('水', 20, 10);
machine.sell('水', 10, 1);
machine.list();
machine.replenishment('水', 10);
machine.sell('水', 15, 50);
machine.list();
