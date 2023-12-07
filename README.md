## Getting started
```
`npx create-next-app@latest`
`npm install mongodb`

```
```
PS C:\Users\line\Desktop\next01> npx create-next-app@latest
√ What is your project named? ... .
√ Would you like to use TypeScript? ... `No` / Yes
√ Would you like to use ESLint? ... No / `Yes`
√ Would you like to use Tailwind CSS? ... `No`/ Yes
√ Would you like to use `src/` directory? ... No / `Yes`
√ Would you like to use App Router? (recommended) ... No / `Yes`
√ Would you like to customize the default import alias (@/*)? ... No / `Yes`
√ What import alias would you like configured? ... @/*
Creating a new Next.js app in C:\Users\line\Desktop\next01.

Using npm.

Initializing project with template: app


Installing dependencies:
- react
- react-dom
- next

Installing devDependencies:
- eslint
- eslint-config-next
```

```js
src --> page.js(index) --> 셋팅

export default function Home() {
  return (
    <div>
      home
    </div>
  )
}

```

몽고디비 데이터 가져오기
src--> util --> database.js
```js
import { MongoClient } from 'mongodb'
const url = 'mongodb+srv://answlsgh95:password@cluster0.vyhevh2.mongodb.net/?retryWrites=true&w=majority'
let connectDB

if (process.env.NODE_ENV === 'development') {
    if (!global._mongo) {
        global._mongo = new MongoClient(url).connect()
    }
    connectDB = global._mongo
} else {
    connectDB = new MongoClient(url, options).connect()
}
export { connectDB }
```

database.js ---> page.js 에 연결
```js
import { connectDB } from "@/util/database.js"

export default async function Home() {
  const client = await connectDB;
  const db = client.db("forum")
  let result = await db.collection("post").find().toArray();
  console.log(result)


  return (
    < div >
      home
    </div>
  )
}
간소화
import { connectDB } from "@/util/database.js"

export default async function Home() {

  const db = (await connectDB).db("forum")
  let result = await db.collection("post").find().toArray();


  return (
    < div >
      home
    </div>
  )
}
```

Next.js<br>
app --> list(페이지) --> page.js(list페이지의 인덱스), page.module.css<br>
app --> detail(페이지) --> [id] --> page.js(detail페이지의 인덱스), page.module.css<br>

page.js(list)
map를 이용해서 데이터를 가져오기, 데이터를 누르면 detail페이지로 넘어가게 해주는 방식
```js
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
                </div>
            ))}
        </div>
    )
}
```

page.js(detail)
몽고디비에서 데이터의 id값을 가져와서 데이터 나타내기
```js
import { connectDB } from "@/util/database.js";
import styles from './page.module.css';
import { ObjectId } from "mongodb";

export default async function Detail(props) {
    const db = (await connectDB).db("forum");
    let result = await db.collection("post").findOne({ _id: new ObjectId("65711979ebc80f1a7955529d") })
    console.log(props.params.id)

    return (
        <div className={styles.detailWrap}>
            <h3>상세페이지</h3>
            <div>
                <h4>글 제목</h4>
                <p> 글 내용</p>
            </div>
        </div>
    )
}
```

Client --> Server
GET<br>
POST<br>
PUT<br>
PATCH<br>
DELETE<br>

NEXT01 --> pages폴더 생성 --> api 폴더 생성 --> pages.js<br>
http://localhost:3000/api/page  --> json

```js
export default function handle(req, res) {
    console.log(123)
    return res.status(200).json({ title: "안녕" })
}
```
