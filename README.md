## How to run the app

**Root url for api:**   `http://localhost:3000`

* Clone the repo in local environment and make `.env` file (optional, no need for this, database deployed on mongod )
* run `npm install`
* <del>run local mongod server command--`mongod`</del>
* No need to run mongo server locally, I have deployed it on mongod ATLAS cluster. Now, just run `nodemon app.js`
* run `nodemon app.js` or `node app.js`

```
Please let me know if you have any problem with connecting to database and any error or bug.

sourabhsahu69733@gmail.com
```
## Main Functions

A)
For Admin:
1) Add account    (Basic JWT token issue and authorization, Assuming it to be registering account of webadmin --admin:bool(true|false))
2) Add products   (adding product with passing only after register and login)

3) View Orders    (
    login required, --it is linked to users and seller id.
    basic struture is like you have lot of seller id, products and users. It is intersection of particular seller id, all user id's that 
    have order from that seller and products id's.
    )

B)
For End Customers

1) Add account        (Assuming it to be register account of user)
2) Login              (Basic JWT token authorization)
3) Browse Products    (login not required, all the available products in the database or added by all webadmins)
4) Order products     (login required, no payment integration, storing seller id and product id)  
5) View Orders        (login required, view all placed orders)

## File Strutures

*   config  --database (mongodb) connection
---database.js

*   lib    --It will issue jwt token with the help of jsonwebtoken library, validating hash and salt, and authenticating requests
---utils.js

*   models --mongodb models, it has three models each for user, admin, product
---user.js

*   routes  --middleware for handling all api's   
---index.js
---users_routes.js
---auth_routes.js
---admin_routes.js

*   app.js   --server connection on given port and main interference for express and mongodb database.

*   generateKeyPair.js  ---It generate private and public key pair with the help of node.js crypto library and RSA algorithm.
RSA algorithm is asymmetric cryptography algorithm. Asymmetric actually means that it works on two different keys i.e. Public Key and Private Key


## API and main functions

| API end point  | (REQUEST) main funtion | (jwt token at request header) Authetication required or not  |
| ------|-------|
| api/auth/register       | (POST) It can handle users and admin register, issuesing JWT token on success, storing username, hash and salt. `username`, `password` and `isAdmin` are sent with request body and required.   | NO |
| api/auth/login     | (POST) It can handle users and admin login, generating hash and matching that with stored hash. `username`, `password` and `isAdmin` are sent with request body and required.  | NO |
| api/auth/reset-password/authenticate/:id |  (POST) Here `id` is user or admin id, current password and new password are sent with request body. Reset user or admin password, validated then generated new hash and salt for new password. | YES|
| api/auth/reset-username/authenticate/:id |  (POST) Here `id` is user or admin id, new username and current password are sent with request body. Reset user or admin username or adminname, validated then set new username or adminname. | YES |
| /api/users/order-product/:id     | (POST) Here `id` is user id and product id, seller id are sent with request to place order.   | YES |
| api/users/view-orders/:id      | (GET) Here `id` is user id     | YES |
| /api/users/browse-products    | (GET) Get all products uploaded by all sellers. No authorization needed    | NO |
| /api/admin/add/products/:id       | (POST) Here `id` is seller id (admin id). Products details sent with request body.     | YES |
| /api/admin/view-orders/:id      | (GET) Here `id` is seller id (admin id). Returns all orders made by users for seller id products.   | YES |
| /api/admin/view-products/:id | (GET) Here `id` is seller id (admin id). Returns all products uploaded by seller id (admin).     | YES |

## API testing Responses

*There are three main API endpoints `api/auth` for handling user and admin authorization, `api/users` for handling all api endpoints for users
, `api/admin` for handling all api endpoints for admin.*


### FOR AUTHORIZATION (USERS AND ADMIN)

*POST*  **/api/auth/register/** 
```
{
    "success": true,
    "user": {
        "orders": [],
        "_id": "60f9caba4683c333509013b5",
        "username": "sourabh user",
        "hash": "27e039c45e2f76e218a53cfa60c089cbdd1e7e5062dd7a4903054ff79c0cda2cdf6c13bdd7aaeaf633ce78600ca44e8e9ba0132e0d7bec3a5639a9f60d2b2fe6",
        "salt": "4443780657b53858ee2b3c90fe27bdca95e2bee0d9cc08747d289f2732878248",
        "__v": 0
    },
    "token": "Bearer 
    eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGY5Y2FiYTQ2ODNjMzMzNTA5MDEzYjUiLCJpYXQiOjE2MjY5ODMwOTg4NTgsImV4cCI6MTYyNjk4MzUzMDg1OH0.XKorNWqO8XHZ7tk9woY6H933y4PP3oNpV5GaSh-6oxDPfSyHTJD573RX4LLo8CsJHGIeX3cUi7-0WdTUe3DTzN55uV14WsrUaaeHL9OI2CPTeaQZ8fJbI7MXU8VCbt2BeMMU7xoM83BDJyaFAvIYfG4JYzqgsrVwE0p_GxbUAth5d5YMZpJtgH664aE9vYCwJi2iGA0arRLrl8DdpgI7djqMJKJ9_1WilTp9BWsg7_NbVlYw7DVP5joMyjxwA_M0bDIdf74CC8Tkj1Y395S996t-vrGeOlaLaKD6jrO7Ez67fV10T5f3IEo2cjJJ3lnyBlhOi5-vRl-owW3bf5ASl76slXhzHMZ6n-A1nBiHUrZGbFtmTmCo1s5h6HHahwi-5p6zxw4cLSiX9ACuC3Z4rfcjqk83jVoXb9NID9eEywyjQNwGtXY9EMSRM0hrx2DKpetASQw-APF1Ca1OWVIYzLi_HNnIBBXBds4mF8_8d_ZZup5_equ11k98s1e40zFP2VXO_9SOBGca9w9rPtQbtGh09MGliLMJvMfJEHAwqK__vd_rdRMj8ajlW9Q26Gq4ZHgirRIP8PSBNXlLlGHyQ5yDlvZuOCT7wjfp2bK2aQ8k058TwBNOoWp3NI2AdnvNJG-gudow9hvwvTG_9knxzn1l7_IVMgVW8yjsDEGJ0_o",
    "expiresIn": "5d"
}
```

*POST* **/api/auth/login/** 
```
{
    "success": true,
    "msg": "Successflly login user sourabh user",
    "user": {
        "orders": [],
        "_id": "60f9caba4683c333509013b5",
        "username": "sourabh user",
        "hash": "27e039c45e2f76e218a53cfa60c089cbdd1e7e5062dd7a4903054ff79c0cda2cdf6c13bdd7aaeaf633ce78600ca44e8e9ba0132e0d7bec3a5639a9f60d2b2fe6",
        "salt": "4443780657b53858ee2b3c90fe27bdca95e2bee0d9cc08747d289f2732878248",
        "__v": 0
    },
    "token": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGY5Y2FiYTQ2ODNjMzMzNTA5MDEzYjUiLCJpYXQiOjE2MjY5ODMyMTI3NjcsImV4cCI6MTYyNjk4MzY0NDc2N30.Wt23UIifT5UtZoapCb79SXZFvGC7SpEEGAcj_fB-ukd77n_BvtaAjxK2IvsZvuuTMIrXUKmukZU-SSIJVzXx0xIN1ELO6Ip_parzdVCrC3G7eR1WlHMnWdQgKNKiKL18_Mvf3LnM-wRIvcLBNbx2CObYcxSDISEPQW7ofTHoklY243PGYE467H4gV46GMZct-0QnQU6UFcxj4551e8q0KdfABi1MjNc5FkklE8FBeKKczzRIhWwm3Vr3EKhJyALSiOnnkoPHs3hFqTfftpNOWPxolyzuWoSSfjRMcE-982R68ySahqnLhd4fKt2eCoqK_-ptV0SqiWhIgeI8zp0_f_44mxs-CYdb-mvL_1DlHSwD7HMA0SHpe3pubX3ykkHfy18ejV8fxolv37dxYv4nQJKO25IRxbI89XaGZYcuh_Yphi6LoLXR5izIIR0OTgwTzJrr-CP4SIWvM4WAeltokSsIpZPVFxY5Rv3vvQ5xbr79NtbpweWjlIKyHI11GOAdTDNuw0VLcVQFgH2H_y62gTAwJwGppTcevjovKet7TxeskPZQqSbk4O9qerIBi766XFuWR9vO8BpHz3AagxLCtIj2wfM9xVP4ER-0WxGj5Rnp_e7DSiUxPaa3h-Q2S1NKG9wXydkb6aDVW7pxTT3CO_djdXJYFvasOgC-V5EJ5pU",
    "expiresIn": "5d"
}
```
```
{
    "success": true,
    "msg": "Successflly login admin Sourabh admin1",
    "adminname": {
        "orders": [],
        "_id": "60f9bb520c1d1e167c8cbdf4",
        "adminname": "Sourabh admin1",
        "hash": "16a140c75e7654c1e4ed60245d8c1ad9c341dd213204d0060e55e011ef08bcb134a992fd9146793ab06a398691cb897005c66bf6f4182f3a8ac0663eceaa94b3",
        "salt": "bae58fad746a9a93d67f11413100ac13b831a0ffc66813328315112725f4a32f",
        "isAdmin": true,
        "__v": 0
    },
    "token": "Bearer 
    eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGY5YmI1MjBjMWQxZTE2N2M4Y2JkZjQiLCJpYXQiOjE2MjY5NzkxODgyMTUsImV4cCI6MTYyNjk3OTYyMDIxNX0.Pkw0BI9Ug52zkKpTXQ4a7BXGFX_-vLKrQ5pQhki0sf2tDeLJhu0Kc88wuajuYAZ5xEPQwnMQYwbWbdx6W2sJsqgZ59StJVPOKb59trGqFVnUHZQz8vDGmoiQGAQpn4y21mBlOAmE4QMmnXweTCiq-VBmdVhMgkhOZE0cc7eWcS_BIUHILLNEsrTwVmduX_XfctL0Qa1fAeHoobqeU_3QOgzvO2DZtvFJcAGsL5BnPFZJUdf--taJs9tDQeislBrLB0AftzcsWcREVHcTE8D4e6FVtHJQwK30wIFrE332XO-RXbXHIL23DPGXXe8DPqJGEeokiweZ1-BKv-5Fvrmkz__ZZ4fNqyTUf0ZWdZsdGh4yd0xg5sAQxWrDDmuoCatXziAqE4uEmL0c78VCmqgXWxo_q44xMvzXsKoH7XetENEye_12V2KFZuuoJDN8mvRKdn_IW-nCaTFkb8xHW1K9l0zOjLfpiSZBGrgIPDDiYLU14UJkqUytuLot6hKsOBiI57luaBjSyFDcDDADV2yZavIuWyB1yMXDfWlpp3TQJAkIyHiKYia3JgXMDzqsfnzjUG_ZhJQTnyVmfQYeoUIDTJPJ8PjhVKquIT6GBrmB8UVUBB1HeMRt8bw01oFAIOUjBPhqfYzgYKPYygyzA_E4c_5zVmPdr7tidrCD0C9Ahho",
    "expiresIn": "5d"
}
```


### FOR USERS

*POST* **/api/users/order-product/:id**
```
{
    "success": true,
    "user_id": "60f9caba4683c333509013b5",
    "seller_id": "60f9bb520c1d1e167c8cbdf4",
    "msg": "product added sucessfully"
}
```
*GET* **api/users/view-orders/:id**

```
{
    "msg": "Successfully fetched user orders",
    "orders": {
        "orders": [
            {
                "product_id": "60f9ca52fda2001a2c67531d",
                "seller_id": "60f9bb520c1d1e167c8cbdf4"
            },
            {
                "product_id": "60f9bec6989575287c951bb7",
                "seller_id": "60f9bb520c1d1e167c8cbdf4"
            }
        ],
        "_id": "60f9caba4683c333509013b5",
        "username": "sourabh user",
        "hash": "27e039c45e2f76e218a53cfa60c089cbdd1e7e5062dd7a4903054ff79c0cda2cdf6c13bdd7aaeaf633ce78600ca44e8e9ba0132e0d7bec3a5639a9f60d2b2fe6",
        "salt": "4443780657b53858ee2b3c90fe27bdca95e2bee0d9cc08747d289f2732878248",
        "__v": 2
    }
}
```
*GET* **/api/users/browse-products**

```
{
    "success": true,
    "products": [
        {
            "products": {
                "data": [
                    "it first product added to from admin sourabh admin1"
                ],
                "name": "tea",
                "price": 12
            },
            "_id": "60f9bd6d3d9f7f19d8354e0c",
            "seller_id": "60f9bb520c1d1e167c8cbdf4",
            "__v": 0
        },
    ]
}
```
### FOR ADMIN


*POST* **/api/admin/add/products/:id**
```
{
    "msg": "Success Prodcut Added!",
    "products": {
        "products": {
            "data": [
                "it last product added to from admin sourabh admin1"
            ],
            "name": "software for ecommerce",
            "price": 12
        },
        "_id": "60f9d00a3bac6d140c2cb055",
        "seller_id": "60f9bb520c1d1e167c8cbdf4",
        "__v": 0
    }
}
```

*GET* **/api/admin/view-orders/:id**
```
{
    "success": true,
    "seller_id": "60f9bb520c1d1e167c8cbdf4",
    "products": {
        "orders": [
            {
                "user_id": "60f9caba4683c333509013b5",
                "product_id": "60f9ca52fda2001a2c67531d"
            }
        ],
        "_id": "60f9bb520c1d1e167c8cbdf4",
        "adminname": "Sourabh admin1",
        "hash": "16a140c75e7654c1e4ed60245d8c1ad9c341dd213204d0060e55e011ef08bcb134a992fd9146793ab06a398691cb897005c66bf6f4182f3a8ac0663eceaa94b3",
        "salt": "bae58fad746a9a93d67f11413100ac13b831a0ffc66813328315112725f4a32f",
        "isAdmin": true,
        "__v": 1
    }
}
```