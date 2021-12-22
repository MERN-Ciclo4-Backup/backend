import { gql } from "apollo-server-core";

export const inscriptionTypes = gql`
  
  type Inscripcion {
    _id: ID!
    estado: Enum_EstadoInscripcion!
    fechaIngreso: Date
    fechaEgreso: Date
    proyecto: Proyecto!
    estudiante: Usuario!
  }
  input InscripcionInput {
    _id: ID
    estado: Enum_EstadoInscripcion
    fechaIngreso: Date
    fechaEgreso: Date
    proyecto: String
    estudiante: String
  }
  type Query {
    Inscripciones(filter: InscripcionInput): [Inscripcion]

    Inscripcion(_id: ID!): Inscripcion
  }
  type Mutation {
    crearInscripcion(
      estado: Enum_EstadoInscripcion
      fechaIngreso: Date
      fechaEgreso: Date
      proyecto: String!
      estudiante: String!
    ): Inscripcion

    eliminarInscripcion(_id: String!): Inscripcion

    editarInscripcion(
      _id: String!
      body: InscripcionInput!
    ): Inscripcion
  }
`;
