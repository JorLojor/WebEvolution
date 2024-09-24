import {Router} from "express";
import {getAllTeamsController,addMemberTeamController} from "../controllers/teamController";

const router = Router();

router.get('/', getAllTeamsController);
router.put('/add/member', addMemberTeamController); // http://localhost:3987/api/add/member


export default router;
