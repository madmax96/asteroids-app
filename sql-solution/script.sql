SELECT
  u.name,
  u.email,
  SUM(o.quantity * p.price) AS money_total
FROM
  users u
  INNER JOIN orders o ON u.id = o.user_id
  INNER JOIN products p ON o.product_id = p.id
WHERE
  p.category = 'Electronics'
GROUP BY
  u.id, u.name, u.email
HAVING
  COUNT(o.id) >= 3
  AND SUM(o.quantity * p.price) > 1000
ORDER BY
  money_total DESC;
