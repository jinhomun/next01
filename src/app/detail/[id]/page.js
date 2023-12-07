import { connectDB } from "@/util/database.js";
import styles from './page.module.css';
import { ObjectId } from "mongodb";

export default async function Detail(props) {
    const db = (await connectDB).db("forum");
    let result = await db.collection("post").findOne({ _id: new ObjectId(props.params.id) })
    console.log(props.params.id)

    return (
        <div className={styles.detailWrap}>
            <h3>상세페이지</h3>
            <div>
                <h4>{result.title}</h4>
                <p> {result.content}</p>
            </div>
        </div>
    )
}