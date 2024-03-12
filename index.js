

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const FurnitureModel = require("./model/Furniture");

// const app = express(); // Create an instance of express

// app.use(express.json());
// app.use(cors());

// mongoose.connect("mongodb://127.0.0.1:27017/Furniture");

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   FurnitureModel.findOne({ email: email }).then((user) => {
//     if (user) {
//       if (user.password === password) {
//         res.json("Success");
        
//       } else {
//         res.json("Password is Wrong");
//       }
//     }
//     else {
//       res.json("No Record Found on this data")
//     }
//   });
// });

// app.post("/register", (req, res) => {
//   FurnitureModel.create(req.body)
//     .then((Furniture) => res.json(Furniture))
//     .catch((err) => res.json(err));
// });

// // For Order Detail  checkout 




// app.listen(3011, () => {
//   console.log("Server is Running");
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const FurnitureModel = require("./model/Furniture");

const app = express(); // Create an instance of express

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/Furniture");


// ... existing imports

// Assuming you have an Order model similar to your Furniture model
const OrderModel = require("./model/ProductsStore");

// ... existing code

app.post("/checkout", async (req, res) => {
  try {
    const orderDetails = req.body;

    // Assuming you have a separate Order model
    const order = new OrderModel(orderDetails);
    const savedOrder = await order.save();

    // Clear the cart after successful checkout
    // You may need to implement a method for clearing the cart in your CartContext
    // For example: clearCart()
    // Note: This depends on your specific implementation of the CartContext
    // For simplicity, you can assume a successful checkout clears the entire cart
    // Implement the clearCart() method accordingly in your context.
    // Example: clearCart();

    res.status(200).json({ message: 'Checkout successful!', order: savedOrder });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ... existing code

// app.post("/checkout", async (req, res) => {
//   try {
//     const { name, price, quantity } = req.body;

//     // Create a new instance of the ProductDataModel
//     const productData = new ProductDataModel({
//       name,
//       price,
//       quantity,
//     });

//     // Save the data to MongoDB
//     const savedProductData = await productData.save();

//     res.status(200).json({ message: 'Checkout successful!', productData: savedProductData });
//   } catch (error) {
//     console.error('Error during checkout:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  FurnitureModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
        
      } else {
        res.json("Password is Wrong");
      }
    }
    else {
      res.json("No Record Found on this data")
    }
  });
});

app.post("/register", (req, res) => {
  FurnitureModel.create(req.body)
    .then((Furniture) => res.json(Furniture))
    .catch((err) => res.json(err));
});

// For Order Detail  checkout 




app.listen(3011, () => {
  console.log("Server is Running");
});
