import {client, dataBaseName} from "./db";
import {ObjectId} from "mongodb";

export class CoffeeRepository {
    async getAllCoffee(): Promise<CoffeeViewType[]> {
        const coffe = await client.db(dataBaseName)
            .collection<CoffeeDBType>('coffee').find().toArray()
        const allCoffee = coffe.map(c => {
            return {
                id: c._id.toString(),
                name: c.name,
                description: c.description,
                size: c.size,
                additives: c.additives,
                image: c.image
            }
        })
        return allCoffee
    }

    async getCoffeeById(id: string): Promise<CoffeeViewType | null> {
        const coffee = await client.db(dataBaseName)
            .collection<CoffeeDBType>('coffee').findOne({_id: new ObjectId(id)})
        if (!coffee) return null
        return {
            id: coffee._id.toString(),
            name: coffee.name,
            description: coffee.description,
            size: coffee.size,
            additives: coffee.additives,
            image: coffee.image
        }
    }

    async createCoffee(name: string, description: string, size: CoffeeSizeType, additives: CoffeeAdditivesType, image: string): Promise<boolean> {
        const result = await client.db(dataBaseName)
            .collection<CoffeeDBType>('coffee')
            .insertOne({_id: new ObjectId(), name, description, size, additives, image})
        return result.acknowledged
    }

    async updateCoffee(coffeeId: string, name: string, description: string, size: CoffeeSizeType, additives: CoffeeAdditivesType, image: string): Promise<boolean> {
        const result = await client.db(dataBaseName)
            .collection<CoffeeDBType>('coffee')
            .updateOne({_id: new ObjectId(coffeeId)}, {$set: {name, description, size, additives, image}})
        return result.acknowledged
    }
}

type CoffeeDBType = {
    _id: ObjectId
    name: string
    description: string
    size: CoffeeSizeType
    additives: CoffeeAdditivesType
    image: string
}

export type CoffeeSizeType = SizeType[]
type SizeType = { size: number, volume: string, price: number }
export type CoffeeAdditivesType = AdditivesType[]

type AdditivesType = {id: number, name: string, price: number }

export type CoffeeViewType = {
    id: string
    name: string
    description: string
    size: CoffeeSizeType
    additives: CoffeeAdditivesType
    image: string
}