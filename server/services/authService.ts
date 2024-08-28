import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";

interface UserPayload {
  email: string;
  password: string;
}

const registerUser = async (email: string, password: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log("Usuário já existe com e-mail:", email);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Senha criptografada para o usuário com e-mail:", email);
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  return newUser;
};

const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("Credenciais inválidas para o usuário com e-mail:", email);
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );
  console.log("Token gerado para o usuário com e-mail:", email);

  return { user, token };
};

export { registerUser, loginUser };
