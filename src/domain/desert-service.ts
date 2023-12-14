import {DessertAdditivesType, DessertRepository, DessertSizeType, DessertViewType} from "../repositories/dessert-repository";

class DessertService {
    dessertRepository: DessertRepository;

    constructor() {
        this.dessertRepository = new DessertRepository()
    }

    async getAllDessert(): Promise<DessertViewType[]> {
        return await this.dessertRepository.getAllDessert()
    }

    async getDessertById(dessertId: string): Promise<DessertViewType | null> {
        return await this.dessertRepository.getDessertById(dessertId)
    }
    async createDessert(name: string, description: string, size: DessertSizeType, additives: DessertAdditivesType, image: string): Promise<boolean> {
        return await this.dessertRepository.createDessert(name, description, size, additives, image)
    }
async updateDessert(dessertId:string,name: string, description: string, size: DessertSizeType, additives: DessertAdditivesType, image: string): Promise<boolean> {
        return await this.dessertRepository.updateDessert(dessertId,name, description, size, additives, image)
    }
}

export const dessertService = new DessertService()