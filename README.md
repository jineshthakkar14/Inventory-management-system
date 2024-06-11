This is a brief overview of the implementation for inventory management application using Node.js, Express, and MongoDB. The application allows users to sign up, manage inventory, add items to their cart, apply discount coupons, and more.

Technologies Used
Node.js: JavaScript runtime environment.
Express: Web application framework for Node.js.
MongoDB: NoSQL database for storing application data.
Mongoose: MongoDB object modeling for Node.js.
bcryptjs: Library for hashing passwords.
jsonwebtoken: Library for generating JSON web tokens (JWTs) for user authentication.

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

##API Endpoints##

1. Authentication
   
POST https://inventory-management-system-pztw.onrender.com/api/v1/auth/signup: Register a new user.

POST https://inventory-management-system-pztw.onrender.com/api/v1/auth/login: Authenticate and log in a user.

2.Inventory Management

POST https://inventory-management-system-pztw.onrender.com/api/v1/inventory/addItemToInventory: Add an item to inventory.

POST https://inventory-management-system-pztw.onrender.com/api/v1/inventory/removeItemFromInventory: Remove an item in inventory.

POST https://inventory-management-system-pztw.onrender.com/api/v1/cart/addItemToCart: Add an item from the user's cart.

3.Discount Coupons

POST https://inventory-management-system-pztw.onrender.com/api/v1/discount/addDiscountCoupon: Create a new discount coupon.

POST https://inventory-management-system-pztw.onrender.com/api/v1/discount/applyDiscountCoupon: Apply a discount coupon to the cart.


##Deployed server on render##

link: https://inventory-management-system-pztw.onrender.com

##postman api's link##

link: https://api.postman.com/collections/32074520-bdac08e7-8da5-46b8-93d5-c1a7196b382f?access_key=PMAT-01J045CHEX5RV1A70VSFAHB75X

Its the postman api link, you have to import in postman using this link.


##Detailed explanation for authentication##

#Signup: Users can register by sending a POST request to /signup.'

    Required fields: firstName, lastName, email, password, confirmPassword, accountType.
    Password is hashed before storing in the database.
    Returns a JWT token for authentication.
    
#Login: Users can log in by sending a POST request to /login.

    Required fields: email, password.
    Validates credentials and returns a JWT token for authentication.


##Detailed explanation of inventory##

#Add Item to Inventory: Admins can add items to the inventory using POST /addItemToInventory.

    Required fields: name, price, description.
    Creates a new product in the database.
    
#Add Item to Cart: Customers can add items to their cart using POST /addItemToCart.

    Required fields: productId, quantity.
    Adds the specified quantity of the product to the user's cart.
    
#Remove Item from Inventory: Admins can remove items from the inventory using DELETE /removeItemFromInventory.

    Required fields: productId.
    Removes the specified product from the inventory.

##detailed explanation of Discount coupons##

#Add Discount Coupon: Admins can create a discount coupon using POST /addDiscountCoupon.

    Required fields: code, percentOff, maxDiscountAmount.
    Creates a new discount coupon in the database.

#Apply Discount Coupon: Customers can apply a discount coupon to their cart using POST /applyDiscountCoupon.
    
    Required fields: cartValue, discountId.
    Calculates the discounted price of the cart based on the coupon details.





