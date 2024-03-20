const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const FurnitureModel = require("./model/Furniture");
const port = process.env.PORT || 3011;
const app = express(); // Create an instance of express

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/Furniture");

const OrderModel = require("./model/ProductsStore");
const ProductDataModel = require("./model/ProductsStore");
const ProductsModel = require("./model/AddProducts");
const SofasModel = require("./model/Sofas");
const StudyTableModel = require("./model/StudyTable");

app.post("/checkout", async (req, res) => {
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
    console.error("Error during checkout:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Login  Process
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  FurnitureModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("The Password is incorrect");
      }
    } else {
      res.json("No record Exits");
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

// retrive User Login Data for Admin Panel
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

// Retrive Products Order Data For Adminn  
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

// Add Products CODE  
app.post("/Addproduct", (req, res) => {
  ProductsModel.create(req.body)
    .then((Furniture) => res.json(Furniture))
    .catch((err) => res.json(err));
});

// Show Products

app.get("/Addproducts", async (req, res) => {
  try {
    const products = await ProductsModel.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching registered users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add Sofas
app.post("/Sofas", (req, res) => {
  SofasModel.create(req.body)
    .then((Furniture) => res.json(Furniture))
    .catch((err) => res.json(err));
});
app.get("/Sofas", async (req, res) => {
  try {
    const Sofas = await SofasModel.find();
    res.json(Sofas);
  } catch (error) {
    console.error("Error fetching registered users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Study Table
app.post("/StudyTable", (req, res) => {
  StudyTableModel.create(req.body)
    .then((Furniture) => res.json(Furniture))
    .catch((err) => res.json(err));
});
app.get("/StudyTable", async (req, res) => {
  try {
    const tbl = await StudyTableModel.find();
    res.json(tbl);
  } catch (error) {
    console.error("Error fetching registered users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(port, () => {
  console.log("Server is Running");
});
