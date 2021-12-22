import { gql } from "apollo-server-core";

export const projectTypes = gql`
  type Objetivo {
    _id: ID!
    descripcion: String!
    tipo: Enum_TipoObjetivo!
  }
  input ObjetivoInput {
    _id: ID
    descripcion: String!
    tipo: Enum_TipoObjetivo!
  }
  type Proyecto {
    _id: ID!
    nombre: String!
    presupuesto: Float!
    fechaInicio: Date!
    fechaFin: Date!
    estado: Enum_EstadoProyecto!
    fase: Enum_FaseProyecto!
    lider: Usuario!
    objetivos: [Objetivo!]!
    avances: [Avance!]!
    inscripciones: [Inscripcion!]!
  }
  input ProyectoInput {
    _id: ID
    nombre: String
    presupuesto: Float
    fechaInicio: Date
    fechaFin: Date
    estado: Enum_EstadoProyecto
    fase: Enum_FaseProyecto
    lider: String
    avances: [String]
    objetivos: [String]
    inscripciones: [String]
  }
  type Query {
    Proyectos(filter: ProyectoInput): [Proyecto]

    Proyecto(_id: ID!): Proyecto
  }
  type Mutation {
    crearProyecto(
      nombre: String!
      presupuesto: Float!
      fechaInicio: String!
      fechaFin: String!
      estado: Enum_EstadoProyecto
      fase: Enum_FaseProyecto
      lider: String!
      objetivos: [ObjetivoInput]
    ): Proyecto

    eliminarProyecto(_id: String!): Proyecto

    editarProyecto(_id: String!, body: ProyectoInput!): Proyecto

    crearObjetivo(idProyecto: String!, body: ObjetivoInput!): Proyecto

    editarObjetivo(idProyecto: String!, indexObjetivo: Int!, body: ObjetivoInput): Proyecto

    eliminarObjetivo(idProyecto: String!, idObjetivo: String!): Proyecto
  }
`;
