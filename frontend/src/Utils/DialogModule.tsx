import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../components/ui/button";

interface Prop{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function DialogModule({isOpen, setIsOpen}: Prop) {
  
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const token = localStorage.getItem('token');

  console.log("token from localstorage", token);

  const navigateRoute = async() => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/stream/start`, {title} , {
    headers: {
      'Authorization': token
    }
  })
  
  if(response.status === 200){
    const id = response.data.streamId;
    navigate(`/admin/stream/${id}`);
   }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-violet-600 font-medium tracking-normal">Enter a title for a stream</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Input title={title} onChange={(e) => setTitle(e.target.title)} id="title" name="title" placeholder="Enter a title" className="text-xl font-medium font-serif"/>
              <Button onClick={navigateRoute} className="bg-gradient-to-r from-pink-500 to-violet-600">Start Stream</Button>
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  )
}

