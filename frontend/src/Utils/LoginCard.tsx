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

export function LoginCard() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();

    const loginReq = async() => {
        console.log("req url", import.meta.env.VITE_BACKEND_URL, "user", email, password);
        console.log("checking types", typeof email, email, typeof password, password);
       const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, {email, password});

       if(response.status === 200){
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
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" 
               value={email} 
               onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com" />
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
        <Button className="w-full bg-purple-600" onClick={loginReq}>Sign In</Button>
        <p>Havent created a account <Link to={'/signup'} className="underline font-medium">signup</Link></p>
      </CardFooter>
    </Card>
     </div>
  )
}
