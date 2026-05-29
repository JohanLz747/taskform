"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
 import {useRouter} from "next/navigation";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const  router = useRouter();



    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            setMessage(error.message);
            setLoading(false);
            return;
        }
        router.replace("/dashboard");

        setMessage("Usuario creado correctamente");
        setLoading(false);

        const user = data?.user

        if (!user) return
        const { error: dbError } = await supabase.from("user").insert([
            {
                id_user: user.id,
                name_user: name,
                email_user: email
            }
        ]);


    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-purple-100">

            <div className="w-[900px] h-[650px] flex rounded-3xl shadow-2xl overflow-hidden bg-white/80 backdrop-blur-md border border-green-200">

                {/* 🧾 LEFT - FORM */}
                <div className="w-1/2 p-10 flex flex-col justify-center">

                    <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
                        Crear cuenta ✨
                    </h1>

                    <form onSubmit={handleRegister} className="flex flex-col gap-5">

                        {/* NAME */}
                        <input
                            type="text"
                            placeholder="Nombre completo"
                            className="w-full border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none p-3 rounded-xl text-green-700 text-base"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        {/* EMAIL */}
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            className="w-full border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none p-3 rounded-xl text-green-700 text-base"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        {/* PASSWORD */}
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="w-full border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none p-3 rounded-xl text-green-700 text-base"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-700 hover:bg-green-800 active:scale-95 transition text-white font-semibold p-3 rounded-xl shadow-lg text-lg mt-4"
                        >
                            {loading ? "Creando cuenta..." : "Registrarse"}
                        </button>

                        {/* MESSAGE */}
                        {message && (
                            <p className="text-sm text-center text-red-700 mt-3">
                                {message}
                            </p>
                        )}
                    </form>
                </div>

                {/* 🖼️ RIGHT - IMAGE */}
                <div className="w-1/2 relative hidden md:flex  bg-green-50">

                    <img
                        src="Logo.PNG"
                        alt="register"
                        className="w-full h-full object-contain"
                    />

                    {/* overlay oscuro suave */}
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent"></div>

                    {/* texto encima de la imagen */}
                    <div className="absolute bottom-10 left-10 text-white">
                        <h2 className="text-2xl font-bold">
                            Únete ahora 🚀
                        </h2>
                        <p className="text-sm opacity-90">
                            Crea tu cuenta y empieza a usar la plataforma
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );


}