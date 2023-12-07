import { MongoClient } from 'mongodb'
const url = 'mongodb+srv://answlsgh95:UGG7QMfWPOyW3UpV@cluster0.vyhevh2.mongodb.net/?retryWrites=true&w=majority'
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