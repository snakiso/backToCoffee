import {client, dataBaseName} from "./db";
import {ObjectId} from "mongodb";

export class TeaRepository {
    async getAllTea(): Promise<TeaViewType[]> {
        const tea = await client.db(dataBaseName)
            .collection<TeaDBType>('tea').find().toArray()
        const allTea = tea.map(t => {
            return {
                id: t._id.toString(),
                name: t.name,
                description: t.description,
                size: t.size,
                additives: t.additives,
                image: t.image
            }
        })
        return allTea
    }
    async getTeaById(teaId: string): Promise<TeaViewType | null> {
        const tea = await client.db(dataBaseName)
            .collection<TeaDBType>('tea').findOne({_id: new ObjectId(teaId)})
        if (!tea) return null
        return {
            id: tea._id.toString(),
            name: tea.name,
            description: tea.description,
            size: tea.size,
            additives: tea.additives,
            image: tea.image
        }
    }
    async createTea(name: string, description: string, size: TeaSizeType, additives: TeaAdditivesType, image: string): Promise<boolean> {
        const result = await client.db(dataBaseName)
            .collection<TeaDBType>('tea')
            .insertOne({_id: new ObjectId(), name, description, size, additives, image})
        return result.acknowledged
    }
    async updateTea(teaId:string,name: string, description: string, size: TeaSizeType, additives: TeaAdditivesType, image: string): Promise<boolean> {
        const result = await client.db(dataBaseName)
            .collection<TeaDBType>('tea')
            .updateOne({_id: new ObjectId(teaId)}, {$set: {name, description, size, additives, image}})
        return result.acknowledged
    }
}

type TeaDBType = {
    _id: ObjectId
    name: string
    description: string
    size: TeaSizeType
    additives: TeaAdditivesType
    image: string
}
export type TeaSizeType = {
    small: SizeType
    medium: SizeType
    large: SizeType
}
type SizeType = { volume: number, price: number }
export type TeaAdditivesType = {
    sugar: AdditivesType
    cinnamon: AdditivesType
    syrup: AdditivesType
}
type AdditivesType = { price: number }
export type TeaViewType = {
    id: string
    name: string
    description: string
    size: TeaSizeType
    additives: TeaAdditivesType
    image: string
}