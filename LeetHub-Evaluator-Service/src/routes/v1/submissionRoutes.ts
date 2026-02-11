import  express  from "express";
import { addSubmission } from "../../controllers/submissionController.js";
import { validate } from "../../validators/zodValidator.js";
import { CreateSubmissionZodSchema } from "../../dtos/CreateSubmission.js";

const submissionRouter = express.Router()

submissionRouter.post('/',validate(CreateSubmissionZodSchema),addSubmission)

export default submissionRouter