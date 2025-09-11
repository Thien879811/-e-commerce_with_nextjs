import {API_URL} from "@/config"
import api from "@/lib/axios"
import axios from "axios"

export const register = async (data : FormData)=>{
    const res = await api.post("register",data,{
        headers:{
            "Content-Type" : "multipart/form-data"
        }
    })
    return res.data
}

export const login = async (data : {email : string, password : string})=>{
    const res = await api.post("login",data)
    return res.data
}

export const logout = async() =>{
    const res = await api.get("logout")
    return res.data
}
