  import mongoose from "mongoose"


  export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Manuelkim:Manuelkim123@cluster0.bg6gben.mongodb.net/swiftbites').then(() => {
      console.log("DB Connected");
  }
    ).catch((error) => {
      console.error("DB Connection Error:", error);
    });
  }