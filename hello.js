import mongoose from "mongoose";

const uri = "mongodb+srv://bhaveshchauhanforcode_db_user:Test123@cluster0.hveuyp3.mongodb.net/project0?retryWrites=true&w=majority&authSource=admin ";

mongoose.connect(uri)
  .then(() => console.log("✅ Connected successfully"))
  .catch(err => console.error("❌ Error:", err));
