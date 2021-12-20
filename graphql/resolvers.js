import { advancementResolvers } from "../models/avance/resolvers.js";
import { inscriptionResolver } from "../models/inscripcion/resolvers.js";
import { projectResolvers } from "../models/proyecto/resolvers.js";
import { userResolvers } from "../models/usuario/resolvers.js";
import { authResolvers } from "./auth/resolvers.js";

export const resolvers = [
  userResolvers,
  projectResolvers,
  inscriptionResolver,
  advancementResolvers,
  authResolvers,
];
