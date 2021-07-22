## How to run the app

**Root url for api:**  `http://localhost:3000`

* run local mongod server command--`mongod`
* run `nodemon app.js` or `node app.js`

## Main Functions
A)

For Admin:
1) Add account    (Assuming it to be registere account of webadmin --admin:bool(true|false))
2) Add products   (adding product with passing only after register and login)

3) View Orders    (
    allowed only after login, --it is linked to users and seller id
    basic struture is like you have lot of seller id, products and users. It is intersection of particular seller id, all user id that 
    have order from that seller.
    )


B)

For End Customers

1) Add account  (Assuming it to be registere account of user)
2) Login       
3) Browse Products   (all the available products in database or added by all webadmin)
4) Order products(no payment integration)  
5) View Orders       

## File Strutures

<!-- Same product from different admin handling (product has some id that is linked to admin, all orders of admin are) -->

<!--  -->

## API testing results

**FOR USER**

POST  **/api/users/register/** 
`
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
}`

POST **/api/users/login/** 
`
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
}`

POST **/order-product/:id**
`
{
    "success": true,
    "user_id": "60f9caba4683c333509013b5",
    "seller_id": "60f9bb520c1d1e167c8cbdf4",
    "msg": "product added sucessfully"
}
`
GET **/view-orders/:id**

`
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
`
GET **/browse-products**

`
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
`
**FOR ADMIN**

POST **/api/admin/register/**

`{
    "success": true,
    "admin": {
        "orders": [],
        "_id": "60f9bb520c1d1e167c8cbdf4",
        "hash": "16a140c75e7654c1e4ed60245d8c1ad9c341dd213204d0060e55e011ef08bcb134a992fd9146793ab06a398691cb897005c66bf6f4182f3a8ac0663eceaa94b3",
        "salt": "bae58fad746a9a93d67f11413100ac13b831a0ffc66813328315112725f4a32f",

        "__v": 0
    },
    "token": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiI2MGY5YmI1MjBjMWQxZTE2N2M4Y2JkZjQiLCJpYXQiOjE2MjY5NzkxODgyMTUsImV4cCI6MTYyNjk3OTYyMDIxNX0Pkw0BI9Ug52zkKpTXQ4a7BXGFX_-vLKrQ5pQhki0sf2tDeLJhu0Kc88wuajuYAZ5xEPQwnMQYwbWbdx6W2sJsqgZ59StJVPOKb59trGqFVnUHZQz8vDGmoiQGAQpn4y21mBlOAmE4QmnXweTCiq-VBmdVhMgkhOZE0cc7eWcS_BIUHILLNEsrTwVmduX_XfctL0Qa1fAeHoobqeU_3QOgzvO2DZtvFJcAGsL5BnPFZJUdf--taJs9tDQeislBrLB0AftzcsWcREVHcTE8D4eFVtHJQwK30wIFrE332XO-RXbXHIL23DPGXXe8DPqJGEeokiweZ1-BKv-5Fvrmkz__ZZ4fNqyTUf0ZWdZsdGh4yd0xg5sAQxWrDDmuoCatXziAqE4uEmL0c78VCmqgXWxo_q44xMvzXKoH7XetENEye_12V2KFZuuoJDN8mvRKdn_IW-nCaTFkb8xHW1K9l0zOjLfpiSZBGrgIPDDiYLU14UJkqUytuLot6hKsOBiI57luaBjSyFDcDDADV2yZavIuWyB1yMXDfWlpp3TQJAkyHiKYia3JgXMDzqsfnzjUG_ZhJQTnyVmfQYeoUIDTJPJ8PjhVKquIT6GBrmB8UVUBB1HeMRt8bw01oFAIOUjBPhqfYzgYKPYygyzA_E4c_5zVmPdr7tidrCD0C9Ahho",
    "expiresIn": "5d"

}`
POST **/api/admin/login/**

`
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
`

POST **/add/products/:id**
`
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
`



GET **/view-orders/:id**
`
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
`