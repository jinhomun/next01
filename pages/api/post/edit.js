import { connectDB } from "@/util/database.js";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { id, title, content } = req.body;

        // 이제 함수가 비동기 함수로 정의되어 있습니다.
        const db = (await connectDB).db("forum");

        const updatedPost = {
            title: title,
            content: content
        };

        await db.collection("post").updateOne({ _id: new ObjectId((id)) }, { $set: updatedPost });
        res.status(200).json({ message: "글이 수정되었습니다." });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}