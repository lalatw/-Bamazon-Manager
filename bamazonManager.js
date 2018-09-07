var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
});

console.log("Welcome to Bamazon!");
start();

function start() {
    inquirer.prompt([
        {
            type: "list",
            name: "task",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
        }
    ]).then(function (answer) {
        switch (answer.task) {
        
            case "View Products for Sale":
                display();
                break;

            case "View Low Inventory":
                viewLowInv();
                break;

            case "Add to Inventory":
                addInv();
                break;

            case "Add New Product":
                addProduct();
                break;

            case "Quit":
                quitfun();
                break;                

        }

    });
}


function display() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var table = new Table({
            head: ["ID", "Product Name", "Department", "Price", "Stock Qty"],
            colWidths: [6, 45, 16, 11, 11]
        });
    
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity],
            );
        }
        console.log(table.toString());
        start()
    });
};



function viewLowInv() {
    var query = "SELECT * FROM products WHERE stock_quantity <=5";
    connection.query(query, function(err, res){
        if (err) throw err;

        var table = new Table({
            head: ["ID", "Product Name", "Department", "Price", "Stock Qty"],
            colWidths: [6, 45, 16, 11, 11]
        });
    
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity],
            );
        }
        console.log(table.toString());
        start()
    })
};



function addInv() {
    inquirer.prompt([
        {
            type: "input",
            name: "itemID",
            message: "What is the ID of the item you would like to add more quantity?",
            validate: function(inputID) {
                if (!isNaN(inputID)) {
                    return true;
                }
                console.log("Please enter a valid ID.");
                return false;
            }
        },
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to add to the inventory?",
            validate: function(inputQ) {
                if (!isNaN(inputQ)) {
                    return true;
                }
                console.log("Please enter a valid quantity.");
                return false;
            }
        }
    ]).then(function (answer) { 
        
        connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err;
        
            if((parseInt(answer.itemID)>res.length) || (parseInt(answer.itemID)<=0)) {
                console.log("Please enter a valid ID.");
            }
            var chosenItem ="";
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id === parseInt(answer.itemID)) {
                chosenItem = res[i];
                }
            }
            
            connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                    stock_quantity: chosenItem.stock_quantity += parseInt(answer.quantity)
                    },
                    {
                    item_id: chosenItem.item_id
                    }
                ],
                function(error) {
                    if (error) throw err;
                    console.log("Successfully updated/added "+ answer.quantity + " " + chosenItem.product_name + " to the inventory.");
                    display();
                }
                );

        });

    });

};



function addProduct() {
    inquirer.prompt([
        {
            type: "input",
            name: "newProductName",
            message: "What is the name of the product you would like to add?"
        },
        {
            type: "list",
            name: "department",
            message: "Which department does this product fall into?",
            choices: ["Electronics", "Beauty", "Shoes", "Sports", "Home", "Books"]
        },
        {
            type: "input",
            name: "cost",
            message: "How much does it cost?",
            validate: function(cost) {
                if (!isNaN(cost)) {
                    return true;
                }
                console.log("Please enter a valid cost.");
                return false;
            }
        },
        {
            type: "input",
            name: "iniQuantity",
            message: "How many do we have?",
            validate: function(iniQuantity) {
                if (!isNaN(iniQuantity)) {
                    return true;
                }
                console.log("Please enter a valid quantity.");
                return false;
            }
        }
    ]).then(function (answers){
        var queryString = "INSERT INTO products SET ?";
        connection.query(queryString, {
            product_name: answers.newProductName,
            department_name: answers.department,
            price: answers.cost,
            stock_quantity: answers.iniQuantity,
        })

        console.log(answers.newProductName + " has been added to Bamazon.");

        display();
    });     

};


function quitfun() {
    process.exit();
};









