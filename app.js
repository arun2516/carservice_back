const express = require("express")
require("dotenv").config();
const PORT = process.env.PORT;
const cors = require("cors");
const app = express();
const stripe = require("stripe")(process.env.STRIPEKEY);
const {v4:uuidv4} = require("uuid")
const mongo = require("./connect");
const userrouter = require("./routes/user");
const batteryrouter = require("./routes/battery")
const checkuprouter = require("./routes/checkup")
const servicerouter = require("./routes/service")
const onboardrouter = require("./routes/onboard");
const res = require("express/lib/response");



       mongo.connect();
     
  
      app.use(express.json());
  
      app.use(cors());

     app.post("/payment",(req,res)=>{
       const {product,token} = req.body;
       const idempontencyKey = uuidv4()

       return stripe.customers
       .create({
         email: token.email,
         source: token.id
       })
       .then(customer=>{
         stripe.charges.create(
           {
           amount:product.price * 100,
           currency:'usd',
           customer:customer.id,
           receipt_email:token.email,
           description:`Purchase of ${product.name}`,
           shipping :{
             name:token.card.name,
             address:{
               country:token.card.address_country
             }
           }
         }, {idempontencyKey}
         );
       })
       .then(result => res.status(200).json(result))
     .catch(err => console.log(err))
     })

      app.use("/client", userrouter);
      app.use("/battery", batteryrouter);
      app.use("/general",checkuprouter);
      app.use("/general", servicerouter);
      app.use("/onboard",onboardrouter);

      app.listen(PORT, () => {
        console.log(`API is ready on http://localhost:${PORT}`);
      });
    