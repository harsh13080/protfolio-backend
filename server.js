import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
 let connectDb = async()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to MongoDB")

  }catch(err){
    console.log("db not connected",err);
  }
}
// Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
    
  email: {
    type: String,

    required:true
  },
  subject:{
    type:String,
    required:true
  },
  message:{
    type:String,
    required:true

  } 
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

app.get("/",(req,res)=>{
  res.send("Hello World");
})

// API to save contact form
app.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await Contact.create({ name, email, subject, message });
    res.status(201).json({ message: "Message send successfully!" });

  } catch (err) {
    console.error("❌ Error saving contact:", err); 
    res.status(500).json({ message: "Server error" });
  }
});


const PORT = process.env.PORT || 5000;
connectDb()
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
