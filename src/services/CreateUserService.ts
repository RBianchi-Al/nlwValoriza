import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepositories"

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUserService {
    async execute({name, email, admin}: IUserRequest){
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
        
        // cria novo 
        const user = usersRepository.create({
            name,
            email,
            admin
        })

        await usersRepository.save(user);
        return user;

    }
}

export {CreateUserService}