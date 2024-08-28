"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Nova importação para Next.js 13+
import {
  getUserFavorites,
  getUserHistory,
  loginUser,
} from "@/app/services/authService";

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
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-black">
          Fazer Login
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
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
                className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#0A5584] focus:outline-none focus:ring-1 focus:ring-[#0A5584] sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black"
            >
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
                className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#0A5584] focus:outline-none focus:ring-1 focus:ring-[#0A5584] sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#0A5584] py-2 px-4 text-sm font-medium text-white shadow-sm transition duration-300 ease-in-out hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#0A5584] focus:ring-offset-2"
            >
              Entrar
            </button>
          </div>
          <div>
            <p className="-mt-2 text-center text-sm text-gray-500">
              <Link
                href="/register"
                className="font-medium text-[#0A5584] transition-transform duration-300 ease-in-out hover:text-[#0A5584] hover:scale-105 hover:brightness-110"
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
