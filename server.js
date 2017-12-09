const mysql = require('mysql');
const inquirer = require('inquirer');
const exeDb = require('./method/method.js');
const validate = require('./method/validate.js')

var connection = mysql.createConnection(
{
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "m44t4236773T$",
  database: "bamazon"
}
);

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

var items = `("ice_cream", "dairy", 3.99, 10),("chicken_meat", "poultry",1.99, 20), ("tilapia", "seafood", 4.99, 5),("salmon", "seafood", 7.99, 10), ("green_pepper", "produces", 0.99, 40), ("spinach", "produces", 0.99, 35), ("cheese", "dairy", 2.99, 8), ("milk", "dairy", 1.99, 14),("bread", "bakery", 2.99, 4), ("jack_daniels", "alcohol", 74.99, 2), ("blue_moon", "alcohol", 12.99, 6)`;

var tableD =  "(item_id mediumint not null auto_increment,product_name varchar(32) not null,department_name varchar(32),price decimal(10,2) not null,stock_quantity int,PRIMARY KEY (item_id))"
  exeDb.cr8Db("bamazon");
var start = () => {

connection.query(
    `select * from product`,
    (err, res) => {
            if (err) throw (err);
      var itemsForSale  = [];
      // console.log(JSON.stringify(res))
      temp = JSON.stringify(res)
      itemFS =  JSON.parse(temp)
      itemFS.map(x => itemsForSale.push(x.product_name))
      // console.log(    items2.map(x => forSale.push(x.product_name)))
      console.log(itemsForSale)

  console.log("starting")
  inquirer.prompt([{
    type: "list",
    name: "toBuy",
    message: "What would you like to buy?",
    choices: itemsForSale
  }, {
    name: "quantityToBuy",
    message: "How many would you like to buy??",
    validate: validate.validateNum
  }])
  .then((answers) => {
    console.log(`toBuy = ${answers.toBuy}`)
    console.log(`QtoBuy = ${answers.quantityToBuy}`)
    itemQ = itemFS[itemsForSale.indexOf(answers.toBuy)]
    console.log(itemQ)
     itemQ.stock_quantity > answers.quantityToBuy ? exeDb.updateProduct(itemQ.item_id,answers.quantityToBuy ): console.log("sorry we do not have enough")
  })
      })
};


// exeDb.useDb("bamazon")
// exeDb.createTable("product",tableD);
// exeDb.createProduct("product(product_name, department_name, price, stock_quantity)", items)
// start();
// forSale();
start()


