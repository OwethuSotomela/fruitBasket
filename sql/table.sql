drop table if exists fruit_basket;
create table fruit_basket ( 
  id serial not null primary key,
  fruit_name varchar(255) not null, 
  quantity numeric not null, 
  price decimal(10,2),
  original_price decimal(10,2)
  );

INSERT INTO fruit_basket (fruit_name, quantity, price, original_price) VALUES ('Banana', 1, 3, 3);
INSERT INTO fruit_basket (fruit_name, quantity, price, original_price) VALUES ('Apple', 1, 3.50, 3.50);
INSERT INTO fruit_basket (fruit_name, quantity, price, original_price) VALUES ('Orange', 1, 3.50, 3.50);
