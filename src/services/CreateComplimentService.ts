import { getCustomRepository } from "typeorm"
import { ComplimentRepositories } from "../repositories/ComplimentRepository"
import { UsersRepository } from "../repositories/UsersRepositories";


interface IComplimentRequest{
    message: string;
    tag_id: string;
    user_receiver: string;
    user_sender: string;
}

class CreateComplimentService{
    async execute({
        message,
        tag_id,
        user_receiver,
        user_sender
    }: IComplimentRequest){

        const complimentsRepository = getCustomRepository(ComplimentRepositories);
        const usersRepository = getCustomRepository(UsersRepository);

        if(user_sender === user_receiver){
            throw new Error("Incorrect User Receiver")
        }

        const userReceiverExists = usersRepository.findOne({id: user_receiver});

        if(!userReceiverExists){
            throw new Error("User Receiver does not exists!")
        }


        const compliment = complimentsRepository.create({
            message,
            tag_id,
            user_receiver,
            user_sender  
        })

        await complimentsRepository.save(compliment)
        return compliment;

    }
}

export {CreateComplimentService}