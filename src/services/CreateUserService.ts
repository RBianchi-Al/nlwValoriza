import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepositories"
import {hash} from 'bcryptjs'

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {
    async execute({name, email, admin, password}: IUserRequest){
        const usersRepository = getCustomRepository(UsersRepository);

        // verificar email
        if(!email){
            throw new Error("Emai incorrect")
        }
        // verificar se usuário já existe
        const usersAlreadyExists = await usersRepository.findOne({
            email
        })
        // retorna error
        if(usersAlreadyExists){
            throw new Error("User already exists");
        }
        const passwordHash = await hash(password, 8)
        // cria novo 
        const user = usersRepository.create({
            name,
            email,
            admin,
            password: passwordHash
        })

        await usersRepository.save(user);
        return user;

    }
}

export {CreateUserService}