// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51MKz5jIu59DNSfY8LnDr5cbEZvV1rFw9Fr4WBeRP8Gn9Y0IMlnIgXvy9C0wUUCWQYSwLtoqrq4TR8F0gVuNKfaVh00z0lbCwX5"
);
const app = express();
app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello from Amazon Backend");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log("Payment Request Recieved for this amount >>> ", total);
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // subunits of the currency
      currency: "usd",
    });

    // OK - Created
    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(400).send({ message: "no amaunt provided" });
  }
});

app.listen(5001, console.log(`Amazon server running on port: 5001`));
// exports.api = onRequest(app);
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
