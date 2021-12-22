import jwt from "jsonwebtoken";

export const validateToken = async (token) => {
  if (token) {
    let verificacion;
    try {
      verificacion = { data: await jwt.verify(token, process.env.SECRET) };
    } catch (err) {
      verificacion = { error: err };
    }
    (verificacion, token);
    return verificacion;
  }
};

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET, { expiresIn: "24h" });
};
