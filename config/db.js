import { connect } from "mongoose";
export const connectDB = async () => {
    try {
        const dbURL='mongodb+srv://rachie647_db_user:ZZJiCn4TgQCg3xAq@cluster0.buv81kk.mongodb.net/library';
        await connect(dbURL);
        console.log("sss");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}