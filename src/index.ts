import {app} from "./app";
import dotenv from 'dotenv'
import {runDb} from "./repositories/db";

dotenv.config()

const port = process.env.PORT || 3000


const startApp = async () => {
    try{
     let res =  await runDb()
        console.log(res)
    }catch (e){
        console.log(e)
    }


    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
startApp()