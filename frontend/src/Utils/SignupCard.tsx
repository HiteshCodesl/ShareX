"use client"
import { useState } from "react"
import { Button } from "../components/ui/button"
import { Link, useNavigate } from "react-router-dom"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"

import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { ShineBorder } from "../components/ui/shine-border"
import axios from "axios"

export function SignupCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const navigate = useNavigate();

    const signupReq = async() => {
        console.log("req url", import.meta.env.VITE_BACKEND_URL, "user", email, password, username);
       const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/signup`, {email, password, username});

       if(response.status === 200){
        console.log(response.data);
        const token = response.data.token;

        localStorage.setItem("token", token);
         navigate('/');
       }
    }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
    <Card className="relative w-full max-w-[350px] overflow-hidden">
      <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input id="username" type="text" 
               value={username} 
               onChange={(e) => setUsername(e.target.value)}
              placeholder="john deo" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" 
               value={email} 
               onChange={(e) => setEmail(e.target.value)}
              placeholder="john@doe.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" 
               value={password}
               onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button className="w-full bg-purple-600" onClick={signupReq}>Sign Up</Button>
        <p>Already a user <Link to={'/login'} className="underline font-medium">login</Link></p>
      </CardFooter>
    </Card>
     </div>
  )
}
