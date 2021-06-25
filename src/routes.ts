
import {Router} from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagControllers";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUserController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiverComplimentsControllers";
import { ListUserSendComplimentsController } from "./controllers/ListUserSenderComplimentsControllers";
import {ensureAdmin} from "./middlewares/ensureAdmin"
import {ensureAuthenticated} from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listTagsController = new ListTagsController()
const listUserController = new ListUsersController()


router.post("/users", createUserController.handle)
router.post(
    "/tags", 
    ensureAuthenticated, 
    ensureAdmin, createTagController.handle)
router.post("/login", authenticateUserController.handle)
router.post("/compliment",
ensureAuthenticated, createComplimentController.handle)

router.get("/users/compliments/send", ensureAuthenticated, listUserSendComplimentsController.handle);
router.get("/users/compliments/receive", ensureAuthenticated, listUserReceiveComplimentsController.handle);

router.get("/tags", ensureAuthenticated, listTagsController.handle);
router.get("/users", ensureAuthenticated, listTagsController.handle);


export {router};