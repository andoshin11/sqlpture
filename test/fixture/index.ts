import * as schema from './schema'

export type DB = {
  dialect: 'postgres';
  schema: {
    actor: schema.actor
    actor_info: schema.actor_info
    address: schema.address
    category: schema.category
    city: schema.city
    country: schema.country
    customer: schema.customer
    customer_list: schema.customer_list
    film: schema.film
    film_actor: schema.film_actor
    film_category: schema.film_category
    film_list: schema.film_list
    inventory: schema.inventory
    language: schema.language
    nicer_but_slower_film_list: schema.nicer_but_slower_film_list
    payment: schema.payment
    rental: schema.rental
    sales_by_film_category: schema.sales_by_film_category
    sales_by_store: schema.sales_by_store
    staff: schema.staff
    staff_list: schema.staff_list
    store: schema.store
  }
}


export type query1 = "SELECT users.firstName, users.age, users.sex, team.name FROM users INNER JOIN teams AS team ON users.teamId = team.id"

export type query2 = "SELECT * FROM users INNER JOIN teams ON users.teamId = teams.id"

export type query3 = "SELECT * FROM users"

export type Q1 = 'SELECT first_name FROM customer;'

export type Q2 = 'SELECT first_name, last_name, email FROM customer;'

export type Q3 = 'SELECT * FROM customer;'

export type Q4 = "SELECT first_name, last_name AS surname FROM customer;"

export type Q5 = "SELECT first_name, last_name surname FROM customer;"

export type Q6 = "SELECT first_name || ' ' || last_name AS full_name FROM customer;"

export type Q7 = 'SELECT first_name, last_name FROM customer ORDER BY first_name ASC;'

export type Q8 = 'SELECT first_name, LENGTH(first_name) len FROM customer ORDER BY len DESC;'

export type Q9 = 'SELECT DISTINCT release_year FROM film;'

export type Q10 = 'SELECT DISTINCT release_year, rental_rate FROM film;'

export type Q11 = "SELECT last_name, first_name FROM customer WHERE first_name = 'Jamie';"

export type Q12 = "SELECT last_name, first_name FROM customer WHERE first_name = 'Jamie' AND last_name = 'Rice';"

export type Q13 = "SELECT last_name, first_name FROM customer WHERE first_name = 'Jamie' OR last_name = 'Rice';"

export type Q14 = "SELECT last_name, first_name FROM customer WHERE first_name IN ('Ann','Anne','Annie');"

export type Q15 = 'SELECT film_id, title, release_year FROM film ORDER BY film_id LIMIT NULL OFFSET NULL;'

export type Q16 = 'SELECT film_id, title, release_year FROM film ORDER BY film_id LIMIT 4 OFFSET 3;'

export type Q17 = "SELECT last_name, first_name FROM customer WHERE first_name = 'Jamie' OR last_name = 'Rice' LIMIT 4 OFFSET 3;"

export type Q18 = "SELECT customer_id, rental_id, return_date FROM rental WHERE customer_id IN (1, 2) ORDER BY return_date DESC;"

export type Q19 = "SELECT customer_id, rental_id, return_date FROM rental WHERE customer_id NOT IN (1, 2);"

export type Q20 = "SELECT customer_id, rental_id, return_date FROM rental WHERE customer_id <> 1 AND customer_id <> 2;"

export type Q21 = "SELECT customer_id, payment_id, amount FROM payment WHERE amount BETWEEN 8 AND 9;"

export type Q22 = "SELECT customer_id, payment_id, amount FROM payment WHERE amount NOT BETWEEN 8 AND 9;"

export type Q23 = "SELECT first_name, last_name FROM customer WHERE first_name LIKE 'Jen%';"

export type Q24 = "SELECT first_name, last_name FROM customer WHERE first_name NOT LIKE 'Jen%';"

export type Q25 = "SELECT first_name, last_name FROM customer WHERE first_name ILIKE 'Jen%';"

export type Q26 = "SELECT first_name, last_name FROM customer WHERE first_name NOT ILIKE 'Jen%';"

export type Q27 = "SELECT customer.first_name, customer.last_name, rental.rental_date FROM rental INNER JOIN customer ON rental.customer_id = customer.customer_id;"

export type Q28 = "SELECT customer.first_name, customer.last_name, rental.rental_date, rental.return_date, film.title film_title FROM rental INNER JOIN customer ON rental.customer_id = customer.customer_id INNER JOIN inventory ON rental.inventory_id = inventory.inventory_id INNER JOIN film ON inventory.film_id = film.film_id ORDER BY rental_date DESC LIMIT 10;"

export type Q29 = 'SELECT first_name FROM customer LIMIT $1'

export type Q30 = "SELECT first_name, c.last_name, rental.rental_date rented FROM rental INNER JOIN customer AS c ON rental.customer_id = c.customer_id;"

export type Q31 = "SELECT * FROM rental INNER JOIN customer ON rental.customer_id = customer.customer_id;"

export type Q32 = "SELECT first_name, c.last_name surname, c.email FROM customer AS c;"

export type Q33 = "SELECT c.first_name, _c.first_name _first_name , c.last_name, rental.rental_date, rental.return_date, film.title film_title FROM rental INNER JOIN customer AS c ON rental.customer_id = c.customer_id INNER JOIN inventory ON rental.inventory_id = inventory.inventory_id INNER JOIN film ON inventory.film_id = film.film_id INNER JOIN customer _c ON c.customer_id = _c.customer_id ORDER BY rental_date DESC LIMIT 10;"

export type Q34 = "SELECT customer.first_name, customer.last_name, rental.rental_date FROM rental INNER JOIN customer USING(customer_id);"

export type Q35 = "SELECT customer.first_name, customer.last_name, rental.rental_date FROM rental LEFT JOIN customer ON rental.customer_id = customer.customer_id;"

export type Q36 = "SELECT customer.first_name, customer.last_name, rental.rental_date FROM rental LEFT JOIN customer USING(customer_id);"

export type Q37 = "SELECT film.film_id, film.title, inventory_id FROM film LEFT JOIN inventory ON inventory.film_id = film.film_id WHERE inventory.film_id IS NULL ORDER BY title;"

export type Q38 = "SELECT customer.first_name, customer.last_name, rental.rental_date FROM rental RIGHT JOIN customer ON rental.customer_id = customer.customer_id;"

export type Q39 = "SELECT customer.first_name, customer.last_name, rental.rental_date FROM rental RIGHT JOIN customer USING(customer_id);"

export type Q40 = 'SELECT c.customer_id id, c.first_name, c.last_name, c.email, country.country, city.city, a.district, a.address, a.address2 FROM customer AS c INNER JOIN address AS a ON c.address_id = a.address_id INNER JOIN city ON a.city_id = city.city_id INNER JOIN country ON city.country_id = country.country_id WHERE customer_id = $1'

/**
 * Insert
 */
export type Q200 = "INSERT INTO rental (rental_date, inventory_id, customer_id, staff_id) VALUES('2021-02-25', 2666, 393, 2);"

export type Q201 = "INSERT INTO rental (rental_date, inventory_id, customer_id, staff_id) VALUES('2021-02-25', 2666, 393, 2), ('2021-02-26', 2666, 393, 2) RETURNING *;"

export type Q202 = "INSERT INTO rental (rental_date, inventory_id, customer_id, staff_id) VALUES('2021-02-25', 2666, 393, 2) RETURNING rental_date, inventory_id inventory;"

export type Q203 = 'INSERT INTO customer (store_id, first_name, last_name, email, address_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;'

/**
 * Update
 */
export type Q300 = "UPDATE customer SET activebool = true;"

export type Q301 = "UPDATE customer SET activebool = true RETURNING *;"

export type Q302 = "UPDATE customer SET activebool = true WHERE customer_id = 1;"

export type Q303 = "UPDATE customer SET activebool = true WHERE first_name = 'John' AND last_name = 'Smith' RETURNING customer_id AS id, email;"

export type NQ1 = 'SELECT * FROM invalid;'

export type NQ2 = "SELECT * FROM rental INNER JOIN customers ON rental.customer_id = customers.customer_id;"

export type NQ3 = "SELECT customer.first_name, customer.last_name, rental.rental_date, rental.return_date, film.title film_title FROM rental INNER JOIN customer ON rental.customer_id = customer.customer_id INNER JOIN inventory ON rental.inventory_id = inventory.inventory_id INNER JOIN films ON inventory.film_id = films.film_id ORDER BY rental_date DESC LIMIT 10;"

export type NQ4 = "SELECT last_name, first_name FROM customer WHERE first_names = 'Jamie';"

export type NQ5 = "SELECT first_name, c.last_name surname, c.email FROM customers AS c;"

export type NQ6 = "SELECT first_names, c.last_name, rental.rental_date rented FROM rental INNER JOIN customer AS c ON rental.customer_id = customer.customer_id;"

export type NQ7 = "SELECT first_name, d.last_name, rental.rental_date rented FROM rental INNER JOIN customer AS c ON rental.customer_id = customer.customer_id;"

export type NQ8 = "SELECT first_name, c.last_name, rentals.rental_date rented FROM rental INNER JOIN customer AS c ON rental.customer_id = customer.customer_id;"

export type NQ9 = "SELECT first_name, c.last_name, rental.rental_dates rented FROM rental INNER JOIN customer AS c ON rental.customer_id = customer.customer_id;"

export type NQ10 = "SELECT first_name, c.last_name, rental.rental_dates rented FROM rental INNER JOIN customers AS c ON rental.customer_id = customer.customer_id;"

// new
export type NQ11 = "SELECT last_name, first_name FROM customer WHERE first_name = 'Jamie' OR last_names = 'Rice' LIMIT 4 OFFSET 3;"

export type NQ12 = "SELECT customer_id, rental_id, return_date FROM rental WHERE customer_ids IN (1, 2) ORDER BY return_date DESC;"

export type NQ13 = "SELECT customer_id, rental_id, return_date FROM rental WHERE rentals.customer_id NOT IN (1, 2);"

export type NQ14 = "SELECT customer_id, rental_id, return_date FROM rental WHERE customers_id <> 1 AND customers_id <> 2;"

export type NQ15 = "SELECT customer_id, payment_id, amount FROM payment WHERE payments.amount BETWEEN 8 AND 9;"

export type NQ16 = "SELECT customer_id, payment_id, amount FROM payment WHERE amounts NOT BETWEEN 8 AND 9;"

export type NQ17 = "SELECT first_name, last_name FROM customer WHERE first_names LIKE 'Jen%';"

export type NQ18 = "SELECT first_name, last_name FROM customer WHERE first_names NOT LIKE 'Jen%';"

export type NQ19 = "SELECT first_name, last_name FROM customer WHERE customers.first_name ILIKE 'Jen%';"

export type NQ20 = "SELECT first_name, last_name FROM customer WHERE first_names NOT ILIKE 'Jen%';"

export type NQ21 = "SELECT customer_id, rental_id, return_date FROM rental WHERE customer_id <> 1 AND customer_ids <> 2;"

export type NQ22 = "SELECT customer.first_name, customer.last_name, rental.rental_date FROM rental INNER JOIN customer USING(customer_ids);"

export type NQ23 = "SELECT customer.first_name, customer.last_name, rental.rental_date FROM rental INNER JOIN customer USING(first_name);"

export type NQ24 = "SELECT customer.first_name, customer.last_name, rental.rental_date FROM rental LEFT JOIN customer ON rental.customer_ids = customer.customer_id;"

export type NQ25 = "SELECT customer.first_name, customer.last_name, rental.rental_date FROM rental LEFT JOIN customer USING(customer_ids);"

export type NQ26 = "SELECT customer.first_name, customer.last_name, rental.rental_date FROM rental RIGHT JOIN customer ON rental.customer_ids = customer.customer_id;"

export type NQ27 = "SELECT customer.first_name, customer.last_name, rental.rental_date FROM rental RIGHT JOIN customer USING(customer_ids);"

/**
 * Insert
 */
export type NQ200 = "INSERT INTO rental (rental_dates, inventory_id, customer_id, staff_id) VALUES('2021-02-25', 2666, 393, 2);"

export type NQ201 = "INSERT INTO rentals (rental_date, inventory_id, customer_id, staff_id) VALUES('2021-02-25', 2666, 393, 2);"

export type NQ202 = "INSERT INTO rental (rental_date, inventory_id, customer_id, staff_id) VALUES(2, 2666, 393, 2);"

export type NQ203 = "INSERT INTO rental (rental_date, inventory_id, customer_id, staff_id) VALUES('Invalid', 2666, 393, 2);"

export type NQ204 = "INSERT INTO rental (rental_date, inventory_id, customer_id, staff_id) VALUES('2021-02-25', 2666, 393);"

export type NQ205 = "INSERT INTO rental (rental_date, inventory_id, customer_id, staff_id) VALUES('2021-02-25', 2666, 393, 2), ('2021-02-26', 2666, NULL, 2);"

export type NQ206 = "INSERT INTO rental (rental_date, inventory_id, customer_id, staff_id) VALUES('2021-02-25', 2666, 393, 2) RETURNING rental_date, inventory_ids inventory;"
