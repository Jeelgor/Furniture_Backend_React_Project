

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const FurnitureModel = require("./model/Furniture");

const app = express(); // Create an instance of express

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/Furniture");

const OrderModel = require("./model/ProductsStore");
const ProductDataModel = require("./model/ProductsStore");
const AdminModel = require("./model/Admin");

// app.post("/checkout", async (req, res) => {
//   try {
//     const orderDetails = req.body;

//     // Assuming you have a separate Order model
//     const order = new OrderModel(orderDetails);
//     const savedOrder = await order.save();

//     // Clear the cart after successful checkout
//     // You may need to implement a method for clearing the cart in your CartContext
//     // For example: clearCart()
//     // Note: This depends on your specific implementation of the CartContext
//     // For simplicity, you can assume a successful checkout clears the entire cart
//     // Implement the clearCart() method accordingly in your context.
//     // Example: clearCart();

//     res
//       .status(200)
//       .json({ message: "Checkout successful!", order: savedOrder });
//   } catch (error) {
//     console.error("Error during checkout:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.post('/checkout', async (req, res) => {
  try {
    const { name, price, quantity, imgpath } = req.body;

    // Create a new order document and save it to the database
    const order = new OrderModel({
      name,
      price,
      quantity,
      imgpath,
    });

    const savedOrder = await order.save();

    res.json({ success: true, order: savedOrder });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


app.post("/login", (req, res) => {
  const { email, password } = req.body;
  FurnitureModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Password is Wrong");
      }
    } else {
      res.json("No Record Found on this data");
    }
  });
});

// For Admin Login

app.post("/Adminlogin", (req, res) => {
  const { email, password } = req.body;
  AdminModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Password is Wrong");
      }
    } else {
      res.json("No Record Found on this data");
    }
  });
});
// CODE OVER
app.post("/register", (req, res) => {
  FurnitureModel.create(req.body)
    .then((Furniture) => res.json(Furniture))
    .catch((err) => res.json(err));
});

// For Order Detail  checkout

// retrive User Login Data
app.get("/admin/users", async (req, res) => {
  try {
    const registeredUsers = await FurnitureModel.find();
    res.json(registeredUsers);
  } catch (error) {
    console.error("Error fetching registered users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// code over

// DELETE USERS

app.delete("/admin/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    await FurnitureModel.findByIdAndDelete(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




// Retrive Products Order Data 
app.get("/admin/product", async (req, res) => {
  try {
    const product = await ProductDataModel.find();
    res.json(product);
  } catch (error) {
    console.error("Error fetching registered users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete products 
app.delete("/admin/product/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    await ProductDataModel.findByIdAndDelete(productId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// code over


app.listen(3011, () => {
  console.log("Server is Running");
});
