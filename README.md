 1️⃣ Top 3 customers who spent the most money on books
sql
Copy code
SELECT c.customer_id, c.name AS customer_name, 
       SUM(b.price * o.quantity) AS total_spent
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
JOIN books b ON o.book_id = b.book_id
GROUP BY c.customer_id, c.name
ORDER BY total_spent DESC
LIMIT 3;
✅ 2️⃣ Second most expensive book purchased
sql
Copy code
SELECT DISTINCT b.book_id, b.title, b.price
FROM books b
JOIN orders o ON b.book_id = o.book_id
ORDER BY b.price DESC
LIMIT 1 OFFSET 1;
✅ 3️⃣ Books purchased by more than one customer
sql
Copy code
SELECT b.book_id, b.title, COUNT(DISTINCT o.customer_id) AS total_customers
FROM books b
JOIN orders o ON b.book_id = o.book_id
GROUP BY b.book_id, b.title
HAVING COUNT(DISTINCT o.customer_id) > 1;
✅ 4️⃣ Most recent order date per customer
sql
Copy code
SELECT c.customer_id, c.name AS customer_name, MAX(o.order_date) AS last_order_date
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name;
✅ 5️⃣ Running total of books sold over time (cumulative sum)
sql
Copy code
SELECT o.order_id, o.order_date,
       SUM(o.quantity) OVER (ORDER BY o.order_date) AS total_books_sold_till_date
FROM orders o;
✅ 6️⃣ Customer who placed the earliest order
sql
Copy code
SELECT c.customer_id, c.name AS customer_name, o.order_date AS first_order_date
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
ORDER BY o.order_date ASC
LIMIT 1;
✅ 7️⃣ Revenue % contribution of each book
sql
Copy code
SELECT b.book_id, b.title,
       SUM(o.quantity * b.price) AS revenue_generated,
       ROUND(SUM(o.quantity * b.price) * 100.0 / 
             SUM(SUM(o.quantity * b.price)) OVER (), 2) AS revenue_percentage
FROM books b
JOIN orders o ON b.book_id = o.book_id
GROUP BY b.book_id, b.title;
✅ 8️⃣ Customers who bought at least two different books
sql
Copy code
SELECT c.customer_id, c.name AS customer_name,
       COUNT(DISTINCT o.book_id) AS distinct_books_bought
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name
HAVING COUNT(DISTINCT o.book_id) >= 2;
✅ 9️⃣ Customers with multiple orders on same day
sql
Copy code
SELECT c.customer_id, c.name AS customer_name,
       o.order_date, COUNT(*) AS total_orders_same_day
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name, o.order_date
HAVING COUNT(*) > 1;
✅ 🔟 Month with the highest revenue
sql
Copy code
SELECT MONTH(o.order_date) AS month, 
       SUM(b.price * o.quantity) AS total_revenue
FROM orders o
JOIN books b ON o.book_id = b.book_id
GROUP BY MONTH(o.order_date)
ORDER BY total_revenue DESC
LIMIT 1;
📌 Note: If you're using PostgreSQL, replace MONTH(o.order_date) with EXTRACT(MONTH FROM o.order_date).

💡 Bonus: Customers who have never ordered a book priced above $10
sql
Copy code
SELECT c.customer_id, c.name AS customer_name
FROM customers c
WHERE NOT EXISTS (
    SELECT 1
    FROM orders o
    JOIN books b ON o.book_id = b.book_id
    WHERE o.customer_id = c.customer_id AND b.price > 10
);

# new
