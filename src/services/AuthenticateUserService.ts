import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/UsersRepositories"
import {compare} from 'bcryptjs';
import {sign} from "jsonwebtoken";


interface IAuthenticateUserRequest {
    email: string;
    password: string; 
}

class AuthenticateUserService{

    async execute({email, password}: IAuthenticateUserRequest){

        const usersRepository = getCustomRepository(UsersRepository)
        // Vericicar se email exite

        const user = await usersRepository.findOne({
            email
        })
        if(!user){
            throw new Error ("Email/Password incorrect")
        }

        // Verificar se senha esta certa, compara com a senha hash no sistema
        const passwordMatch = compare(password, user.password)

        if(!passwordMatch){
            throw new Error ("Email/Password incorrect")
        }

        // Gerar token
       const token = sign({
            email: user.email
        }, "chavesecret01", {
            subject : user.id,
            expiresIn: "1d"
        }
     );
     return token;
    }
}
 
export {AuthenticateUserService}