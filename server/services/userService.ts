import User from "../models/user";

const findUserById = async (userId: string) => {
  try {
    console.log("Buscando usuário com ID:", userId);
    const user = await User.findById(userId);
    if (!user) {
      console.log("Usuário não encontrado com ID:", userId);
      throw new Error("User not found");
    }
    console.log("Usuário encontrado:", user);
    return user;
  } catch (error) {
    console.log("Erro ao buscar usuário:", (error as Error).message);
    throw new Error("Error fetching user");
  }
};

export default {
  findUserById,
};
