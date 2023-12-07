import { connectDB } from "@/util/database.js"

export default async function handle(req, res) {
    if (req.method == "POST") {
        if (req.body.title == "") {
            return res.status(500).json("제목을 안쓰셨어요")
        }
        try {
            const db = (await connectDB).db("forum")
            let result = await db.collection("post").insertOne(req.body);
            res.writeHead(302, { Location: '/list' });
            res.end();
        } catch (err) {
            console.log(err);
        }

    }
}