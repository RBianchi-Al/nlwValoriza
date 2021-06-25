import { classToPlain } from 'class-transformer';
import { getCustomRepository } from "typeorm";
import { UsersRepository } from '../repositories/UsersRepositories';


class ListUserService {
    async execute(){
        const usersRepositories = getCustomRepository(UsersRepository);    
        const users= await usersRepositories.find();

        return classToPlain(users);
    }
}

export { ListUserService };