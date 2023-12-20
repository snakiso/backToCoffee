import {client, dataBaseName} from "./db";
import {ObjectId} from "mongodb";

export class DessertRepository {
    async getAllDessert(): Promise<DessertViewType[]> {
        const dessert = await client.db(dataBaseName)
            .collection<DessertDBType>('dessert').find().toArray()
        const allDessert = dessert.map(d => {
            return {
                id: d._id.toString(),
                name: d.name,
                description: d.description,
                size: d.size,
                additives: d.additives,
                image: d.image
            }
        })
        return allDessert
    }
    async getDessertById(dessertId: string): Promise<DessertViewType | null> {
        const dessert = await client.db(dataBaseName)
            .collection<DessertDBType>('dessert').findOne({_id: new ObjectId(dessertId)})
        if (!dessert) return null
        return {
            id: dessert._id.toString(),
            name: dessert.name,
            description: dessert.description,
            size: dessert.size,
            additives: dessert.additives,
            image: dessert.image
        }
    }
    async createDessert(name: string, description: string, size: DessertSizeType, additives: DessertAdditivesType, image: string): Promise<boolean> {
        const result = await client.db(dataBaseName)
            .collection<DessertDBType>('dessert')
            .insertOne({_id: new ObjectId(), name, description, size, additives, image})
        return result.acknowledged
    }
    async updateDessert(dessertId:string,name: string, description: string, size: DessertSizeType, additives: DessertAdditivesType, image: string): Promise<boolean> {
        const result = await client.db(dataBaseName)
            .collection<DessertDBType>('dessert')
            .updateOne({_id: new ObjectId(dessertId)}, {$set: {name, description, size, additives, image}})
        return result.acknowledged
    }
}

type DessertDBType = {
    _id: ObjectId
    name: string
    description: string
    size: DessertSizeType
    additives: DessertAdditivesType
    image: string
}
export type DessertSizeType = SizeType[]
type SizeType = { size:number, volume: string, price: number }

export type DessertAdditivesType = AdditivesType[]

type AdditivesType = {name: string, price: number }
export type DessertViewType = {
    id: string
    name: string
    description: string
    size: DessertSizeType
    additives: DessertAdditivesType
    image: string
}