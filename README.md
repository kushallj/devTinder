## devTinder
- Read documentation for express.router
- create routes folder for managing auth, profile, request routers
- create authRouter, profileRouter, requestRouter
- import these router in app.js
- create POST /logout API
- create PATCH /profile/edit
- create PATCH /profile/password API
- validate all data in every POST, PATCH apis
- create connection request schema
- send Connection Request API
- Proper validation of data
- think of all corver cases
- read more about $or query and $and query and all logical queries
- schema.pre("save") function
- read about compound indexes
- Read more about indexes in MongoDB
- why do we need an index
- what are the advantages and disadvantages of creating indexes

- always think about corner cases
- write code with proper validations for POST /request/review/:status/:requestId
- POST Apis vs GET Apis

- install cookie-parser
- just send a dummy cookie to user
- create GET /profile API & check if you get the cookie back
- install jsonwebtoken
- In Login API, after email and password validation, create a JWT token and send it to user in cookies
- adminAuth middleware
- add the adminAuth middle ware in profile API and a new sendConnectionRequest API
- Set the expiry of JWT token and cookies to 7 days
- create userSchema

- Write code with proper validation for '/request/:status/:requestId'
- post api vs get api thought process
- Create get api for /user/connections

