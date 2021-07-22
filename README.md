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
{
    "success": true,
    "user": {
        "orders": [],
        "_id": "60f992f0c913c328e0478d13",
        "username": "Sourabh Sahu",
        "hash": "43db92d6045282d578da829e915b24b7bdbe40012c7cbe52c04a393a8edb62dd4e6b6c2adeb7f47f4a3da7a5a56bf2ccd893dd4f665448a8109b43b13ff2bb21",
        "salt": "4ad45a3685c2d7f13832836f4d0945eb1355d07622265c7fac3b095a4e5a549d",
        "__v": 0
    },
    "token": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGY5OTJmMGM5MTNjMzI4ZTA0NzhkMTMiLCJpYXQiOjE2MjY5Njg4MTY5NjYsImV4cCI6MTYyNjk2OTI0ODk2Nn0.Y2PIKlbpLEa1M2WG-wzCU7bH5LB1yJ1oTkiOZjs3E5b--7dUtIHymIX2VsYzeSv7BTClNSDRTYS8uiEfMNUizGaa089tbQZcg9hWMn4hqsZ38IrdudFHO2S05Luplb0g5SkFrDeueFoMISsbn78EqqYUW3Xrzb0gLkkLX_sJP_AlCtoSqLP5YraDdwXrKQfb_ke75hlhHdGZ0PUbEMBKQGeEiHBtyp6_yqDMJJaQE84YDClVDtmfP86UuSyggpA9FvNJsKoXc-zlchr9kbBxNrnuU89llqWlm9ANuTrwTdKznFadIR5-ytzns3hvrZDkkgA2TpMomiDPRxBuaCw6-aHhrbzu9ZFXrmal6Lh_XH8ybKfi1viBZErLQJgdAJh4BUVxdV58NFTbzTPFGJAgQr6DVnQjB3le9xaECKxhWoD-r_YrcqmDrWZP2EXF7mVLu_ctHdwUV6PNLdPTjkG-zcoWIVPtHhLfUo90km7Wq5Ugt0jA6Vm1dOt5fdylpKpoNej3R1O0HNtyZI5PDDkc2TiP4qo8SqrN6T2DD39oMHu3bGbWhmyFfhk2xgH3huyqY_U3Z4xJ3ykRB6gRclri1lTMYmUxSXlB7mQgzVRbVFwhICM9PTu-0XNK4ynG1dCA3roGuES4RyH7kjxluOQgCFF-ezkcaEWapyKKmIRtVxc",
    "expiresIn": "5d"
}

POST **/api/users/login/** 
{
    "success": true,
    "msg": "Successflly login user Sourabh Sahu",
    "user": {
        "orders": [],
        "_id": "60f992f0c913c328e0478d13",
        "username": "Sourabh Sahu",
        "hash": "43db92d6045282d578da829e915b24b7bdbe40012c7cbe52c04a393a8edb62dd4e6b6c2adeb7f47f4a3da7a5a56bf2ccd893dd4f665448a8109b43b13ff2bb21",
        "salt": "4ad45a3685c2d7f13832836f4d0945eb1355d07622265c7fac3b095a4e5a549d",
        "__v": 0
    },
    "token": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGY5OTJmMGM5MTNjMzI4ZTA0NzhkMTMiLCJpYXQiOjE2MjY5NjkxMTQ3MTgsImV4cCI6MTYyNjk2OTU0NjcxOH0.R0VPhbxaQduARqX3gTP60Vo7jKyhw4_0ndglO1CYt8G3frNngVN3cuIkGUmuOo1KYN0dgflZK_tec902pDiQY6vfAzmISli7wr5Qv6psBWXdDi4wi4NxZKngGlqQHshcvlSKBka8OoddchuAOSM152uld64W88yPxVhiFOh5anv3llXfjPIZiZSIO8TIiT0lu0JxGvr6YZrrGR9rwfWODoPNoYBRhXTxkIRlET-2qz-P-Kw_G1lWGPk--_SoBHhCEqf2mFstuYWFIUepB1tKnZ_E7kwJoYLbrwsoUdcL4Im5PSPO2q2NmM-BLyzkqfc4xjw2LH73lyVo-UrEHxRyxCaFXWnkUK5_oZjEfthp4e1qAFFE2FnFHiubygns-5RX_Up6MKlzj0ueIhHEaIg0TsI4O4KRfPot67rlKekkVNbe9vymGbEjr9fGEeCXgtPnYtHh1pxr8NqpgzeWh2OKTLRLJ1_BCeluNQFjNbF7PbWyScT6ykH33PLCLIArc64GoK_KZ4Wi7S7sIMHOXdIvpFIbN_AcTH13_2HVgdM2BQq5nB7ZAjqtAYzzfM2PTqAqSOCR6FV_Dh5Rv2-DXh2Q7PKwzR2nbLewsLeTH6RcTF0P3aJt_44aCUrgF5B24LQev0B1xDr-q_MkQsozAr91gVXbRVO8nq8xAy2lFbkXgaw",
    "expiresIn": "5d"
}


**FOR ADMIN**

POST **/api/admin/register/**

{
    "success": true,
    "admin": {
        "orders": [],
        "_id": "60f9a605564ec33514bc5abd",
        "hash": "f212786c9a84a45de828153574b10fcfaab392b99bc43fe0a7ab13bb2f0a0e5a19be72453bcf44746336d53cbde125923318e31ed1e33958864d782627f02eea",
        "salt": "df0acc0a6aedec60645a86e03b486d61b00f33c6eec718af56bc86441dfea9bc",
        "__v": 0
    },
    "token": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGY5YTYwNTU2NGVjMzM1MTRiYzVhYmQiLCJpYXQiOjE2MjY5NzM3MDIxMzMsImV4cCI6MTYyNjk3NDEzNDEzM30.qnUSZEbs2dQTJZTgyRMqkFfo0t68rx6vlhNj4GRM1rSw16nBDHob0XDc8zvz48H9El_-8yGJrD_RTVL0j4uMvmipxkIGXg9HHMvJ9M7FVITcxt8h4FJ60WD2uypdTSgYmTG_8hzFJb67IHzbbOdiFJc81kNgoAO2vMNzqvvhMt1p_xnCwq-unfT3Q-GYhyq394NQMEHACgbeqUPQOTmb4qgbMWzDgJUDgQZVnvHbL7GiE9PCbTK1vA7X_Yvbz9BjVUVfRTIMToD4o0NsdKoySGP3MP05NTnmW4DJiDkpd__H1n5cq3C0P_w9zBpZNPxUy5tO95ylW0PdzC2nvijS7BPdIhJZGPhAMXJuOiVjUAjVXcrR7rLA8xHl6H6kVPDmYZ0evYhir7GqwBapVex7IcGkgqKgOIpIP4lHL7NYLR_Ca-M5YVXrveqJZe338_L6SzUMP7x-kn9HUI4yxlhPEUh5qXAw_uCz_z1DYXLpo0Sfu-5nxbVhdpqjkZ2i5gD1SRo1p1uZHdCQS-EBgRpQmCsyyt9zhVppLQsdUQ19n-JGMiJ7ggEyIDQZf7oElITp-xluaSfkF9yfXYglXMC_Y_XX8us9NPBWxFpMQPD5N_VZUdwtM86LVA4sJN0sHRxLB0YZdbBxmcnUnMZ48W7vHygvXIs2it_WKeOYXA3XHmQ",
    "expiresIn": "5d"
}

POST **/api/admin/login/**