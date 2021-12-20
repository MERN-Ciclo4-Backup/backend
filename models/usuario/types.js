import { gql } from "apollo-server-core";

export const userTypes = gql`
  type Usuario {
    _id: ID!
    nombre: String!
    apellido: String!
    identificacion: String!
    correo: String!
    estado: Enum_EstadoUsuario!
    rol: Enum_Rol!
    foto: String
    proyectosLiderados: [Proyecto!]!
    avancesCreados: [Avance!]!
    inscripciones: [Inscripcion!]!
  }
  input UsuarioInput {
    _id: ID
    nombre: String
    apellido: String
    identificacion: String
    correo: String
    estado: Enum_EstadoUsuario
    rol: Enum_Rol
    foto: String
    password: String
    proyectosLiderados: [String!]
    avancesCreados: [String!]
    inscripciones: [String!]
  }
  type Query {
    Usuarios(filter: UsuarioInput): [Usuario!]!
    Usuario(_id: String, correo: String): Usuario
  }
  type Mutation {
    crearUsuario(
      nombre: String!
      apellido: String!
      identificacion: String!
      correo: String!
      estado: Enum_EstadoUsuario
      rol: Enum_Rol!
      password: String!
    ): Usuario

    eliminarUsuario(_id: String, correo: String): Usuario

    editarUsuario(
      _id: String!
      body: UsuarioInput!
    ): Usuario
  }
`;
