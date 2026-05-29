
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user, loading } = useAuth();
  const router = useRouter();
  async function toggleTask(task: any) {
    const { error } = await supabase
      .from("task")
      .update({
        completed: !task.completed,
      })
      .eq("id_task", task.id_task);

    if (!error) {
      fetchTasks();
    }
  }

  async function deleteTask(id: number) {
    const { error } = await supabase
      .from("task")
      .delete()
      .eq("id_task", id);

    if (!error) {
      fetchTasks();
    }
  }

  async function editTask(task: any) {
    const newTitle = prompt(
      "Nuevo título",
      task.title_task
    );

    const newDescription = prompt(
      "Nueva descripción",
      task.description_task
    );

    if (!newTitle || !newDescription) return;

    const { error } = await supabase
      .from("task")
      .update({
        title_task: newTitle,
        description_task: newDescription,
      })
      .eq("id_task", task.id_task);

    if (!error) {
      fetchTasks();
    }
  }

  const fetchTasks = async () => {
    const { data, error } = await supabase.from("task").select("*").eq("id_user", (await supabase.auth.getUser()).data.user?.id);

    if (!error) setTasks(data || []);
  };


  useEffect(() => {
    console.log("User:", user);
    console.log("Loading:", loading);

    if (!loading && !user) {
      console.log("Redirigiendo...");
      router.replace("/login");
    }

    if (user) {
      fetchTasks();
    }
  }, [user, loading, router]);



  if (loading) {
    return <p>Cargando...</p>;
  }
  if (!user) return null;




  async function addTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("task").insert([
      {
        title_task: title,
        description_task: description,
        completed: false,
        id_user: user?.id
      },
    ]);

    if (!error) {
      setTitle("");
      setDescription("");
      fetchTasks();
    }
  }

  return (

    <div className="p-6 w-2/3 mx-auto">
      <form onSubmit={addTask} className="mb-6 space-y-3">
        <input
          className="border p-2 w-full rounded"
          placeholder="Título de la tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="border p-2 w-full rounded"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />


        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Agregar tarea
        </button>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
          }}
        >
          Cerrar sesión
        </button>
      </form>

      {/* TABLE */}
      <h1 className="text-2xl font-bold mb-4">Lista de Tareas</h1>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-black">ID</th>
            <th className="border p-2 text-black">Título</th>
            <th className="border p-2 text-black">Descripción</th>
            <th className="border p-2 text-black">Estado</th>
            <th className="border p-2 text-black">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task: any, index: number) => (
            <tr key={task.id_task} className="text-center">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{task.title_task}</td>
              <td className="border p-2">{task.description_task}</td>
              <td className="border p-2">
                {task.completed ? "✔️" : "❌"}
              </td>

              <td className="border p-2 space-x-2">

                <button
                  onClick={() => toggleTask(task)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Estado
                </button>

                <button
                  onClick={() => editTask(task)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>

                <button
                  onClick={() => deleteTask(task.id_task)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>

              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}