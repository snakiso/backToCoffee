import express, {Request, Response} from 'express'
import {coffeeRouter} from './routers/coffee-router'
import {teaRouter} from "./routers/tea-router";
import {dessertRouter} from './routers/desert-router';

export const app = express()

// app.use(cors());
app.use(express.json())

app.use('/coffee', coffeeRouter)
app.use('/tea', teaRouter)
app.use('/dessert', dessertRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Coffee Shop BackEnd is running!')
})

