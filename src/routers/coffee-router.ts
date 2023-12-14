import {Router, Request, Response} from "express";
import {coffeeService} from "../domain/coffee-service";
import {CoffeeAdditivesType, CoffeeSizeType} from "../repositories/coffee-repository";
import {lengthIdMiddleware} from "../middleware/length-id-middleware";

export const coffeeRouter = Router()

coffeeRouter.get('/', async (req: Request, res: Response) => {
        const allCoffee = await coffeeService.getAllCoffee()
        return res.status(200).send(allCoffee)
    }
)
coffeeRouter.get('/:id', lengthIdMiddleware,async (req: RequestWithParamsType<{ id: string }>, res: Response) => {
    const coffeeId = req.params.id
    if (!coffeeId) return res.sendStatus(404)
    const result = await coffeeService.getCoffeeById(coffeeId)
    if (!result) return res.sendStatus(404)
    return res.status(200).send(result)
})
coffeeRouter.post('/', async (req: RequestWithBodyType<RequestBodyType>, res: Response) => {
    const {name, description, size, additives, image} = req.body
    const createdCoffee = await coffeeService.createCoffee(name, description, size, additives, image)
    if (!createdCoffee) return res.sendStatus(400)
    return res.sendStatus(201)
})
coffeeRouter.put('/:id', lengthIdMiddleware, async (req: RequestWithParamsAndBodyType<{ id: string }, RequestBodyType>, res: Response) => {
    const coffeeId = req.params.id
    if (!coffeeId) return res.sendStatus(404)
    const {name, description, size, additives, image} = req.body
    const updatedCoffee = await coffeeService.updateCoffee(coffeeId, name, description, size, additives, image)
    if (!updatedCoffee) return res.sendStatus(400)
    return res.sendStatus(200)
})
type RequestWithParamsType<P> = Request<P, {}, {}, {}>
type RequestWithBodyType<B> = Request<{}, {}, B, {}>
type RequestBodyType = {
    name: string
    description: string
    size: CoffeeSizeType
    additives: CoffeeAdditivesType
    image: string
}
type RequestWithParamsAndBodyType<P,B> = Request<P, {}, B, {}>