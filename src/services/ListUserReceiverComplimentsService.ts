
import { getCustomRepository } from "typeorm"
import { ComplimentRepositories } from "../repositories/ComplimentRepository";

 

 class ListUserReceiveComplimentsService {

    async execute(user_id: string) {
        const complimentsRepositories = getCustomRepository(ComplimentRepositories);

        const compliments = await complimentsRepositories.find({
            where: {
                user_receiver: user_id
            },
            relations: ["userSender", "userReceiver", "tag"]
        });
        
        return compliments;
    }
 }

 export { ListUserReceiveComplimentsService }