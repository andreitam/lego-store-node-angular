# lego-store-node-angular
E-commerce site with Angular, Node and MySql. 

# setup
- DB: create from schemas in `mysql` folder.
- Server: install dependencies in `server` folder with `npm install`. Start server with `npm run local`.
- Client: Stat server in `client` folder with `ng serve -o`.

# functionalities
- products view with sorting and filtering
![main2](https://user-images.githubusercontent.com/62688644/135043644-a27ef838-e1e5-4231-973b-f3cfed803c65.PNG)
- registration and authentication forms
![login-form](https://user-images.githubusercontent.com/62688644/135043797-40ac78ee-d423-4cfc-8322-8813d8032f2c.PNG)
- product detail view, add to cart with quantity, update or delete product only for Admin
![product](https://user-images.githubusercontent.com/62688644/135043947-12d2683c-71f7-4212-9c3e-57c9bafb8108.PNG)
- add product form only for Admin
![add-form](https://user-images.githubusercontent.com/62688644/135044361-fa91373b-5ec3-4085-883a-de1ab1d3b5dd.PNG)
- shopping cart view with delete button for each item and order calculation view with checkout button
![shopping-cart](https://user-images.githubusercontent.com/62688644/135044271-837cc999-db63-4729-8c8b-fb1b723e04b4.PNG)
- confirmation order created
![order](https://user-images.githubusercontent.com/62688644/135044506-fd528321-e9e7-4ed3-a723-3c4c2a797df1.PNG)

# rest api
- `GET /themes` -> get all themes
- `GET /themes/{id}` -> get theme by id

- `GET /products` -> get all products
- `GET /products/{id}` -> get product by id
- `POST /products` -> insert new product ONLY Admin 
- `DELETE /products/:id` -> delete product ONLY Admin
- `PUT /products/:id` -> update product ONLY Admin
- `//` products are sorted and filtered in the client side

- `POST /customers/auth/signup` -> signup new customer
- `POST /customers/auth/signin` -> signin customer
- `GET /customers` -> get all customers ONLY Admin
- `GET /customers/{id}` -> get customer by id ONLY Admin

- `//` shopping cart and order are created and stored in the client browser local storage
- `POST /orders` -> insert new order and order-product items from shopping cart 










