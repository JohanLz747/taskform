"use client";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {

    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      console.log("Intentando iniciar sesión con:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      setLoading(false);
      if (error) {
        alert(error.message);
        return;
      }
      console.log("Usuario logueado:", data.user);
      alert("Login exitoso");

    } catch (error) {
      setLoading(false);
      alert("Error al iniciar sesión");
    }
    router.replace("/dashboard");
  }




return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-100">

    <div className="w-[900px] h-[620px] flex rounded-3xl shadow-2xl overflow-hidden bg-white/80 backdrop-blur-md border border-green-200">

      <div className="w-1/2 p-10 flex flex-col justify-center">

        <h1 className="text-3xl font-bold text-center text-green-700 mb-10">
          Bienvenido 👋
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">

          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none p-3 rounded-xl text-green-800 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none p-3 rounded-xl text-green-800 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 active:scale-95 transition text-white font-semibold p-3 rounded-xl shadow-lg text-lg mt-4"
          >
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>

          {message && (
            <p className="text-sm text-center text-green-700 mt-3">
              {message}
            </p>
          )}
        </form>
      </div>

      <div className="w-1/2 relative hidden md:flex  bg-green-50">

        <img
          src="/Logo.PNG"
          alt="login"
          className="w-full h-full object-contain"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent"></div>

        <div className="absolute bottom-10 left-10 text-white">
          <h2 className="text-2xl font-bold">
            Accede a tu cuenta 🌿
          </h2>
          <p className="text-sm opacity-90">
            Gestiona tus tareas y proyectos fácilmente
          </p>
        </div>

      </div>

    </div>
  </div>
);
}