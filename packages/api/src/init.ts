import dotenv from "dotenv";
import { addYupExtensions } from "@project-utk/shared/src/schemas/yupExtensions";

// Load environment variables and add custom yup extensions before anything else
dotenv.config();
addYupExtensions();
