INSERT INTO users (id, name, email)
VALUES
  (1, 'Emily Johnson', 'emilyjohnson@example.com'),
  (2, 'David Brown', 'davidbrown@example.com'),
  (3, 'Olivia Davis', 'oliviadavis@example.com'),
  (4, 'James Wilson', 'jameswilson@example.com'),
  (5, 'Emma Taylor', 'emmataylor@example.com'),
  (6, 'Daniel Anderson', 'danielanderson@example.com'),
  (7, 'Sophia Martinez', 'sophiamartinez@example.com'),
  (8, 'Matthew Robinson', 'matthewrobinson@example.com'),
  (9, 'Ava Clark', 'avaclark@example.com'),
  (10, 'Logan Rodriguez', 'loganrodriguez@example.com');


INSERT INTO products (id, name, price, category)
VALUES
  (1, 'Laptop', 1000.00, 'Electronics'),
  (2, 'Smartphone', 800.00, 'Electronics'),
  (3, 'Headphones', 150.00, 'Electronics'),
  (4, 'TV', 1200.00, 'Electronics'),
  (5, 'Tablet', 500.00, 'Electronics'),
  (6, 'Camera', 800.00, 'Electronics'),
  (7, 'Gaming Console', 400.00, 'Electronics'),
  (8, 'Smart Watch', 300.00, 'Electronics'),
  (9, 'Wireless Earbuds', 150.00, 'Electronics'),
  (10, 'Printer', 200.00, 'Electronics'),
  (11, 'Bluetooth Speaker', 100.00, 'Electronics'),
  (12, 'Monitor', 400.00, 'Electronics'),
  (13, 'External Hard Drive', 150.00, 'Electronics'),
  (14, 'Router', 100.00, 'Electronics');


INSERT INTO orders (id, user_id, product_id, quantity, created_at)
VALUES
  (1, 1, 1, 2, NOW()),
  (2, 1, 2, 1, NOW()),
  (3, 1, 3, 3, NOW()),
  (4, 2, 1, 1, NOW()),
  (5, 2, 2, 2, NOW()),
  (6, 2, 3, 1, NOW()),
  (7, 3, 1, 1, NOW()),
  (8, 3, 2, 4, NOW()),
  (9, 3, 3, 2, NOW()),
  (10, 3, 4, 1, NOW()),
  (11, 5, 5, 2, NOW()),
  (12, 5, 8, 1, NOW()),
  (13, 6, 6, 1, NOW()),
  (14, 6, 9, 3, NOW()),
  (15, 6, 10, 1, NOW()),
  (16, 7, 7, 2, NOW()),
  (17, 7, 11, 1, NOW()),
  (18, 8, 5, 1, NOW()),
  (19, 8, 12, 2, NOW()),
  (20, 9, 8, 1, NOW()),
  (21, 9, 13, 1, NOW()),
  (22, 10, 6, 2, NOW()),
  (23, 10, 9, 1, NOW());