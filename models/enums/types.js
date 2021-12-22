import { gql } from "apollo-server-core";

export const enumTypes = gql`
  enum Enum_EstadoInscripcion {
    ACEPTADO
    RECHAZADO
    PENDIENTE
  }
  enum Enum_FaseProyecto {
    INICIADO
    DESARROLLO
    TERMINADO
    NULO
  }
  enum Enum_EstadoProyecto {
    ACTIVO
    INACTIVO
  }
  enum Enum_TipoObjetivo {
    GENERAL
    ESPECIFICO
  }
  enum Enum_EstadoUsuario {
    PENDIENTE
    AUTORIZADO
    NO_AUTORIZADO
  }
  enum Enum_Rol {
    ESTUDIANTE
    LIDER
    ADMINISTRADOR
  }
`;
