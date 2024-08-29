"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Nova importação para Next.js 13+
import {
  getUserFavorites,
  getUserHistory,
  loginUser,
} from "@/app/services/authService";
import Image from "next/image";
import dicQuest from "../../../../public/images/dicquest.png";
export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const { token } = await loginUser(email, password);
      localStorage.setItem("token", token);

      const [favorites, history] = await Promise.all([
        getUserFavorites(token),
        getUserHistory(token),
      ]);

      localStorage.setItem("favorites", JSON.stringify(favorites));
      localStorage.setItem("history", JSON.stringify(history));

      router.push("/dashboard");
    } catch (err) {
      setError("Falha ao fazer login");
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 text-white">
      <Image
        src={dicQuest}
        alt="foto Promoçoes"
        width={470}
        height={371}
        quality={100}
        placeholder="blur"
        loading="lazy"
        className="w-full max-w-xs sm:max-w-md lg:max-w-lg"
      />
      <div className="w-full max-w-md space-y-8 ">
        <h2 className="mt-8 text-center text-2xl font-bold tracking-tight -mb-4">
          Fazer Login
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              E-mail
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#FF6B00] focus:outline-none focus:ring-1 focus:ring-[#FF6B00] sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium ">
              Senha
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#FF6B00] focus:outline-none focus:ring-1 focus:ring-[#FF6B00] sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#FF6B00] py-2 px-4 text-sm font-medium text-white shadow-sm transition duration-300 ease-in-out hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#0A5584] focus:ring-offset-2"
            >
              Entrar
            </button>
          </div>
          <div>
            <p className="-mt-2 text-center text-sm text-gray-500">
              <Link
                href="/register"
                className="font-medium text-[#FF6B00] transition-transform duration-300 ease-in-out  hover:scale-105 hover:brightness-110"
              >
                Criar Conta
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
