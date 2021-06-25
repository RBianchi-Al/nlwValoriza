
import { getCustomRepository } from "typeorm"
import { ComplimentRepositories } from "../repositories/ComplimentRepository";


 class ListUserSendComplimentsService {

    async execute(user_id: string) {
        const complimentsRepositories = getCustomRepository(ComplimentRepositories);

        const compliments = await complimentsRepositories.findOne({
            where: {
                user_sender: user_id
            },
            relations: ["userSender", "userReceiver", "tag"]
        })
        
        return compliments;
    }
 }

 export { ListUserSendComplimentsService }
