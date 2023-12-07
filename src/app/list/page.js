import Link from 'next/link';
import styles from './page.module.css'
import { connectDB } from "@/util/database.js"

export default async function List() {
    const db = (await connectDB).db("forum")
    let result = await db.collection("post").find().toArray();

    return (
        <div className={styles.listWrap}>
            {result.map((list, key) => (
                <div className={styles.listItem} key={key}>
                    <Link href={`/detail/${list._id}`}>
                        <h4>{list.title}</h4>
                        <p>{list.content}</p>
                    </Link>
                    <Link className={styles.modify} href={`/edit/${list._id}`}>✏수정하기</Link>
                </div>
            ))}
        </div>
    )
}