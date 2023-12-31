import express, {Request, Response} from 'express'
import {coffeeRouter} from './routers/coffee-router'
import {teaRouter} from "./routers/tea-router";
import {dessertRouter} from './routers/desert-router';
import cors from 'cors';

export const app = express()

app.use(
    cors({
        origin: '*',
        // Allow follow-up middleware to override this CORS for options
        preflightContinue: true,
    }),
);
app.use(express.json())

app.use('/coffee', coffeeRouter)
app.use('/tea', teaRouter)
app.use('/dessert', dessertRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Coffee Shop BackEnd is running!')
})

