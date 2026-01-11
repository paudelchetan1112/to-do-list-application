"use server"

import { revalidatePath } from "next/cache"
import dbConnect from "@/lib/db"
import Todo from "@/model/todo"
import { createTodoSchema } from "@/validations/todo"
export async function createTodo(data){
   try {
    const validateData=createTodoSchema.parse(data)
    await dbConnect();
    const todo=await Todo.create(validateData)
    revalidatePath("/")
    return {
        success:true, 
        data:JSON.parse(JSON.stringify(todo))
    }
   } catch (error) {
    console.error("Error creating todo:", error)
    error:error?error.message:"Failed to ctreate todo, "
   }
}
export async function getTodos(){
   try {
    await dbConnect();
    const todos=await Todo.find({}).sort({createdAt:-1}).lean();
    return {
        success:true, 
        data:JSON.parse(JSON.stringify(todos))
    }
   } catch (error) {
    console.error("Error fetching todos:",error)
    return {
        success:false,
        error:"failed to fetch todos", 
    }
   }
}

//server action ----> useQueryHook 
                //useTodos----setTodos
export async function toggleTodo(id){
    try {
        await dbConnect();
        const todo=await Todo.findById(id)
        if(!todo){
            return {
                success:false,
                error:"Todo not found"

            }

        }
        todo.completed=!todo.completed
        await todo.save();
        revalidatePath("/")
        return {
          success:true, 
          data:JSON.parse(JSON.stringify(todo)),

        }
    } catch (error) {
        console.error("Error toggling todo:", error)
        return {
            success:false,
            error:"Failed to toggle todo",
        }

    }
}
export async function deleteTodo(id){
    try {
        await dbConnect();
        const todo=await Todo.findByIdAndDelete(id)
        if(!todo){
            return {
                success:false, 
                error:"Todo not found"
            }
        }
            revalidatePath("/")
            return {
                success:true, 
                data:JSON.parse(JSON.stringify(todo)), 
            }
        

    } catch (error) {
        console.error("Error deleting todo:", error)
        return {
            success:false, 
            error:"Failed to delete todo", 
        }
    }

}