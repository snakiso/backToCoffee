import {Router, Request, Response} from "express";
import {lengthIdMiddleware} from "../middleware/length-id-middleware";
import { dessertService } from "../domain/desert-service";
import {DessertAdditivesType, DessertSizeType} from "../repositories/dessert-repository";

export const dessertRouter = Router()

dessertRouter.get('/', async (req: Request, res: Response) => {
        const allDessert = await dessertService.getAllDessert()
        return res.status(200).send(allDessert)
    }
)
dessertRouter.get('/:id', lengthIdMiddleware,async (req: RequestWithParamsType<{ id: string }>, res: Response) => {
    const dessertId = req.params.id
    if (!dessertId) return res.sendStatus(404)
    const result = await dessertService.getDessertById(dessertId)
    if (!result) return res.sendStatus(404)
    return res.status(200).send(result)
})
dessertRouter.post('/', async (req: RequestWithBodyType<RequestBodyType>, res: Response) => {
    const {name, description, size, additives, image} = req.body
    const createdDessert = await dessertService.createDessert(name, description, size, additives, image)
    if (!createdDessert) return res.sendStatus(400)
    return res.sendStatus(201)
})
dessertRouter.put('/:id', lengthIdMiddleware, async (req: RequestWithParamsAndBodyType<{ id: string }, RequestBodyType>, res: Response) => {
    const dessertId = req.params.id
    if (!dessertId) return res.sendStatus(404)
    const {name, description, size, additives, image} = req.body
    const updatedDessert = await dessertService.updateDessert(dessertId, name, description, size, additives, image)
    if (!updatedDessert) return res.sendStatus(400)
    return res.sendStatus(200)
})
type RequestWithParamsType<P> = Request<P, {}, {}, {}>
type RequestWithBodyType<B> = Request<{}, {}, B, {}>
type RequestBodyType = {
    name: string
    description: string
    size: DessertSizeType
    additives: DessertAdditivesType
    image: string
}
type RequestWithParamsAndBodyType<P,B> = Request<P, {}, B, {}>