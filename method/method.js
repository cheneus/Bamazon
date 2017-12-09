const mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "m44t4236773T$",
  database: ""
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

var cr8Db = (dbName) => {
  console.log(`creating a new database`)
  var query = connection.query(
    `create database ${dbName}`,
    (err, res) => {
      if (err) {
        console.log(err);
      }
    })
  useDb(dbName);
  // dropTable("product")
  // createTable("product");
  // createProduct()
}

var useDb = (dbName) => {
  var query = connection.query(
    `use ${dbName}`,
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`connected to ${dbName}`)
      }
    })
}

var dropTable = (table) => {
  var query = connection.query(
    `drop table if exists ${table}`,
    (err, res,) => {
      if (err)
        console.log(err);
    })

}

var createTable = (table, tableCol) => {
  var query = connection.query(
    `create table ${table}${tableCol};`,
    (err, res) => {
      if (err)
        console.log(err);
    }
  )
}

var  createProduct = (table, values) => {
  console.log("Inserting a new product...\n");
  var query = connection.query(
    `INSERT INTO product(product_name, department_name, price, stock_quantity) values ${values}`,
    function(err, res) {
      // console.log(res.affectedRows + " product inserted!\n");
      console.log("product inserted!\n");
      // Call updateProduct AFTER the INSERT completess
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

var updateProduct = (item, q) => {
  var query = connection.query(`update product set stock_quantity=stock_quantity-${q} where item_id = ${item}`,
   (err, res) => {
    if (err) throw (err);
    console.log(`updated ${item}`)

  })
  console.log(query.sql)
}

var queryTable = (cols ,table, where) => {
  var query =  connection.query(`select ${cols} from ${table} where ${where}`,
    (err, res) => {
      if (err) throw (err);
      console.log()
    })
  console.log(query.sql)
}

module.exports = {
  cr8Db,
  useDb,
  dropTable,
  createTable,
  createProduct,
  updateProduct
}