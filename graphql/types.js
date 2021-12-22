import { gql } from "apollo-server-express";
import { advancementTypes } from "../models/avance/types.js";
import { enumTypes } from "../models/enums/types.js";
import { inscriptionTypes } from "../models/inscripcion/types.js";
import { projectTypes } from "../models/proyecto/types.js";
import { userTypes } from "../models/usuario/types.js";
import { authTypes } from "./auth/types.js";

const globalTypes = gql`
  scalar Date
`;

export const typeDefs = [
  globalTypes,
  enumTypes,
  userTypes,
  projectTypes,
  inscriptionTypes,
  advancementTypes,
  authTypes,
];
