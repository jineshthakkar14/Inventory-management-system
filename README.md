This is a brief overview of the implementation for inventory management application using Node.js, Express, and MongoDB. The application allows users to sign up, manage inventory, add items to their cart, apply discount coupons, and more.

Technologies Used:<br/>
1. Node.js: JavaScript runtime environment.<br/>
2. Express: Web application framework for Node.js.<br/>
3. MongoDB: NoSQL database for storing application data.<br/>
4. Mongoose: MongoDB object modeling for Node.js.<br/>
5. bcryptjs: Library for hashing passwords.<br/>
6. jsonwebtoken: Library for generating JSON web tokens (JWTs) for user authentication.<br/>
7. cookie-parser: Cookie-parser middleware is used to parse the cookies.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>


##Setup Instructions##

1. Clone the Repository
   
         git clone <repository-url>
         cd e-commerce-app

2. Install Dependencies

         npm install
   
3. Set Environment Variables

       PORT=4000
       MONGODB_URI=your_mongo_db_url
       JWT_SECRET=your_jwt_secret

4. Run the Application

       npm run dev




<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>





   

##API Endpoints##

1. Authentication
   
POST

      https://inventory-management-system-pztw.onrender.com/api/v1/auth/signup
      
:Register a new user.

POST 

      https://inventory-management-system-pztw.onrender.com/api/v1/auth/login
      
: Authenticate and log in a user.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

2.Inventory Management

POST 

      https://inventory-management-system-pztw.onrender.com/api/v1/inventory/addItemToInventory
      
: Add an item to inventory.

POST 

      https://inventory-management-system-pztw.onrender.com/api/v1/inventory/removeItemFromInventory
      
: Remove an item in inventory.

POST 

      https://inventory-management-system-pztw.onrender.com/api/v1/cart/addItemToCart
      
: Add an item from the user's cart.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

3.Discount Coupons

POST 
      
      https://inventory-management-system-pztw.onrender.com/api/v1/discount/addDiscountCoupon
      
: Create a new discount coupon.

POST 

      https://inventory-management-system-pztw.onrender.com/api/v1/discount/applyDiscountCoupon
      
: Apply a discount coupon to the cart.







<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>



##Workflow##

1. Signup(admin/customor)->login
2. Add item to the inventory (protected route for admin)
3. Remove item from the inventory (protected route for admin)
4. Add item to the cart (protected route for customer)
5. Add discount coupon in database (protected route for admin)
6. Apply discount coupon in cart (protected route foe customer)

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>





##Deployed server on render##

link: 

      https://inventory-management-system-pztw.onrender.com



<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>









##postman api's link##

link: 

      https://api.postman.com/collections/32074520-bdac08e7-8da5-46b8-93d5-c1a7196b382f?access_key=PMAT-01J045CHEX5RV1A70VSFAHB75X

Its the postman api link, you have to import in postman using this link.



<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>











##Detailed explanation for authentication##

#Signup: Users can register by sending a POST request to /signup.'

    Required fields: firstName, lastName, email, password, confirmPassword, accountType.
    Password is hashed before storing in the database.
    Returns a JWT token for authentication.
    
#Login: Users can log in by sending a POST request to /login.

    Required fields: email, password.
    Validates credentials and returns a JWT token for authentication.


<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

















##Detailed explanation of inventory##

#Add Item to Inventory: Admins can add items to the inventory using POST /addItemToInventory.

    Required fields: productId, quantity.
    Creates a new product in the database.
    
#Add Item to Cart: Customers can add items to their cart using POST /addItemToCart.

    Required fields: customerId, productId, quantity.
    Adds the specified quantity of the product to the user's cart.
    
#Remove Item from Inventory: Admins can remove items from the inventory using DELETE /removeItemFromInventory.

    Required fields: productId, quatity.
    Removes the specified product from the inventory.









<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>










##detailed explanation of Discount coupons##

#Add Discount Coupon: Admins can create a discount coupon using POST /addDiscountCoupon.

    Required fields: code, percentOff, maxDiscountAmount.
    Creates a new discount coupon in the database.

#Apply Discount Coupon: Customers can apply a discount coupon to their cart using POST /applyDiscountCoupon.
    
    Required fields: cartValue, discountId.
    Calculates the discounted price of the cart based on the coupon details.





