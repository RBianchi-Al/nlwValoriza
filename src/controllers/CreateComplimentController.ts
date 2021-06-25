import {Request, Response} from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";


class CreateComplimentController{

    async handle(request: Request, response: Response){
       const {message,
            tag_id,
            user_receiver,
            user_sender} = request.body
        const createComplimentServive = new CreateComplimentService()

        const compliment = await createComplimentServive.execute({
            message,
            tag_id,
            user_receiver,
            user_sender
        });

        return response.json(compliment)

    }
}

export {CreateComplimentController}