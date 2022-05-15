// for relationdal data contains the info on the aws instance

console.log(process.env)
const passwords ={
    mysql : '',
    mongodb :process.env.MONGO_CONN_KEY
}
// for simple auth logic , contains the info on the mongo instance
const mongoConn = {
    url  : `mongodb+srv://astra:${passwords.mongodb}@cluster0.po4ay.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
}

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY


module.exports = {mongoConn, FIREBASE_API_KEY }