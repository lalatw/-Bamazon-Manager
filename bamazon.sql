DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(500) NOT NULL,
  department_name VARCHAR(500) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple iPad Air", "Electronics", 284.5, 78);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bose Bluetooth Speaker", "Electronics", 139.9, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kenneth Cole Black", "Beauty", 60, 210);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("LOreal Skincare Lotion", "Beauty", 9.99, 187);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Adidas Sandal", "Shoes", 21.38, 145);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("NIKE Run Sneakers", "Shoes", 55.28, 90);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Callaway Complete Golf Set", "Sports", 202.46, 82);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Burton Snowboard", "Sports", 349.95, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Utopia Cotton Towels", "Home", 19.23, 451);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("JavaScript The Good Parts by Douglas C.", "Books", 18.65, 321);

SELECT * FROM products;
