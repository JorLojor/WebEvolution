import {Router} from "express";
import {getAllTeamsController,addMemberTeamController,getTeamByIDController,getTeamNameByIDController} from "../controllers/teamController";

const router = Router();

router.get('/', getAllTeamsController);
router.put('/add/member', addMemberTeamController); // http://localhost:3987/api/team/add/member
router.get('/my-team',getTeamByIDController ) //  http://localhost:3987/api/team/my-team
router.get('/team-name',getTeamNameByIDController) // http://localhost:3987/api/team/team-name


export default router;
