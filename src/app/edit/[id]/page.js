import styles from './page.module.css';
import { connectDB } from "@/util/database.js";
import { ObjectId } from "mongodb";

export default async function Edit(props) {
    const db = (await connectDB).db("forum");
    let result = await db.collection("post").findOne({ _id: new ObjectId(props.params.id) })
    console.log(props.params.id)




    return (
        <div className={styles.editWrap}>
            <h4>글 수정하기</h4>
            <form action="/api/post/edit" method="POST">
                <input type="hidden" name="id" value={result._id} />
                <input name="title" placeholder="글 제목" defaultValue={result.title} />
                <input name="content" placeholder="글 내용" defaultValue={result.content} />
                <button type="submit">수정하기</button>
            </form>
        </div>
    );
}
