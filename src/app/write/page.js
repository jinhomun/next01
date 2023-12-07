import styles from "./page.module.css"
export default function Write() {

    return (
        <div className={styles.writeWrap}>
            <h4>글 작성하기</h4>
            <form action="/api/post/new" method="POST">
                <input name="title" placeholder="글 제목" />
                <input name="content" placeholder="글 내용" />
                <button type="submit">작성하기</button>
            </form>
        </div>
    )
}