import Image from "next/image";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Home() {
  async function test() {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*");
  }

  test();
  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-6">
      <h1 className="text-5xl font-bold text-black">
        Gestor de Tareas
      </h1>

      <p className="text-black text-center max-w-md">
        Organiza tus tareas diarias, marca actividades completadas
        y mantén tu productividad desde cualquier lugar.
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Iniciar Sesión
        </Link>

        <Link
          href="/register"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Registrarse
        </Link>
      </div>
    </main>

  );
}
