import { CoffeeAdditivesType } from "../repositories/coffee-repository";
import {TeaAdditivesType, TeaRepository, TeaSizeType, TeaViewType } from "../repositories/tea-repository";

class TeaService {
   teaRepository: TeaRepository;

    constructor() {
        this.teaRepository = new TeaRepository()
    }

    async getAllTea(): Promise<TeaViewType[]> {
        return await this.teaRepository.getAllTea()
    }

    async getTeaById(teaId: string): Promise<TeaViewType | null> {
        return await this.teaRepository.getTeaById(teaId)
    }
    async createTea(name: string, description: string, size: TeaSizeType, additives: TeaAdditivesType, image: string): Promise<boolean> {
        return await this.teaRepository.createTea(name, description, size, additives, image)
    }
async updateTea(teaId:string,name: string, description: string, size: TeaSizeType, additives: TeaAdditivesType, image: string): Promise<boolean> {
        return await this.teaRepository.updateTea(teaId,name, description, size, additives, image)
    }
}

export const teaService = new TeaService()