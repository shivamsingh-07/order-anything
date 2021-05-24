# Order Anything

## Steps to setup

1. Run `npm i`
2. Add MongoDB connection string in the `utils/database.js`
3. Run `npm start` to start the application at `http://127.0.0.1:5000`
4. Use postman or similar REST client to request API endpoints.

## API Endpoints Requests

**1. User Authentication**

-   **Login**

```http
POST /auth/login
Content-Type: application/json

{
	"email": "",
	"password": ""
}
```

-   **Sign Up**

```http
POST /auth/signup
Content-Type: application/json

{
	"name": "",
	"email": "",
	"password": "",
	"auth_type": "" 		// seller, customer, admin
}
```

---

**2. Products**

-   **Get Products**

```http
GET /product/?prod_id=<product-id>	// optional
Content-Type: application/json

{}
```

-   **Add Products**

```http
POST /product/add
Authentication: Bearer <auth-token> 	// Admin Only
Content-Type: application/json

{
	"name": "Chips",
	"category": "Food and Beverages",
	"location": ["Loc1", "Loc2"]
}
```

-   **Update Products**

```http
PUT /product/update/:product_id
Authentication: Bearer <auth-token> 	// Admin Only
Content-Type: application/json

{
	"name": "",
	"category": "",
	"location": ["", ""]		// Any field you want to update
}
```

-   **Delete Products**

```http
DELETE /product/delete/:product_id
Authentication: Bearer <auth-token>	// Admin Only
Content-Type: application/json

{}
```

---

**3. Orders**

-   **Get Orders**

```http
GET /order/?status=<order-status>	// optional
Authentication: Bearer <auth-token>	// Admin and Seller Only
Content-Type: application/json

{}
```

-   **Create Order**

```http
POST /order/add
Authentication: Bearer <auth-token>	// Customer Only
Content-Type: application/json

{
	"products": [
		{
			"name": "Coldrink",
			"quantity": 2
		},
		{
			"name": "Chips",
			"quantity": 5
		}
	]
}
```

-   **Update Order**

```http
PUT /order/update/:product_id
Authentication: Bearer <auth-token>	// Admin and Seller Only
Content-Type: application/json

{
	"seller": "",
	"status": "",	// Any field you want to update
}
```

-   **Delete Order**

```http
DELETE /order/delete/:order_id
Authentication: Bearer <auth-token>	// Admin Only
Content-Type: application/json

{}
```

## Tools and Technology used

1. Node.js
2. Express.js
3. MongoDB
4. Mongoose
5. JWT
6. Bcrypt
7. Uniqid
