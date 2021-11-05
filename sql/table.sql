drop table if exists fruit_basket;
create table fruit_basket ( 
  id serial not null primary key,
  fruit_name text, 
  quantity int, 
  price decimal(10,2)
  );

INSERT INTO fruit_basket (fruit_name, quantity, price) VALUES ('Banana', 1, 3);
INSERT INTO fruit_basket (fruit_name, quantity, price) VALUES ('Apple', 1, 3.50);
INSERT INTO fruit_basket (fruit_name, quantity, price) VALUES ('Orange', 1, 3.50);
