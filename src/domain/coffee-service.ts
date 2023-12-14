import {CoffeeAdditivesType, CoffeeRepository, CoffeeSizeType, CoffeeViewType} from "../repositories/coffee-repository";

class CoffeeService {
    coffeeRepository: CoffeeRepository;

    constructor() {
        this.coffeeRepository = new CoffeeRepository()
    }

    async getAllCoffee(): Promise<CoffeeViewType[]> {
        return await this.coffeeRepository.getAllCoffee()
    }

    async getCoffeeById(id: string): Promise<CoffeeViewType | null> {
        return await this.coffeeRepository.getCoffeeById(id)
    }
    async createCoffee(name: string, description: string, size: CoffeeSizeType, additives: CoffeeAdditivesType, image: string): Promise<boolean> {
        return await this.coffeeRepository.createCoffee(name, description, size, additives, image)
    }
async updateCoffee(coffeeId:string,name: string, description: string, size: CoffeeSizeType, additives: CoffeeAdditivesType, image: string): Promise<boolean> {
        return await this.coffeeRepository.updateCoffee(coffeeId,name, description, size, additives, image)
    }
}

export const coffeeService = new CoffeeService()