import {Router, Request, Response} from "express";
import {lengthIdMiddleware} from "../middleware/length-id-middleware";
import {teaService} from "../domain/tea-service";
import {TeaAdditivesType, TeaSizeType } from "../repositories/tea-repository";

export const teaRouter = Router()

teaRouter.get('/', async (req: Request, res: Response) => {
        const allTea = await teaService.getAllTea()
        return res.status(200).send(allTea)
    }
)
teaRouter.get('/:id', lengthIdMiddleware,async (req: RequestWithParamsType<{ id: string }>, res: Response) => {
    const teaId = req.params.id
    if (!teaId) return res.sendStatus(404)
    const result = await teaService.getTeaById(teaId)
    if (!result) return res.sendStatus(404)
    return res.status(200).send(result)
})
teaRouter.post('/', async (req: RequestWithBodyType<RequestBodyType>, res: Response) => {
    const {name, description, size, additives, image} = req.body
    const createdTea = await teaService.createTea(name, description, size, additives, image)
    if (!createdTea) return res.sendStatus(400)
    return res.sendStatus(201)
})
teaRouter.put('/:id', lengthIdMiddleware, async (req: RequestWithParamsAndBodyType<{ id: string }, RequestBodyType>, res: Response) => {
    const teaId = req.params.id
    if (!teaId) return res.sendStatus(404)
    const {name, description, size, additives, image} = req.body
    const updatedTea = await teaService.updateTea(teaId, name, description, size, additives, image)
    if (!updatedTea) return res.sendStatus(400)
    return res.sendStatus(200)
})
type RequestWithParamsType<P> = Request<P, {}, {}, {}>
type RequestWithBodyType<B> = Request<{}, {}, B, {}>
type RequestBodyType = {
    name: string
    description: string
    size: TeaSizeType
    additives: TeaAdditivesType
    image: string
}
type RequestWithParamsAndBodyType<P,B> = Request<P, {}, B, {}>