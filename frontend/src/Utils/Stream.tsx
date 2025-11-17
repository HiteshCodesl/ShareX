import { useParams } from "react-router-dom"
import SongList from "./SongList";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useState } from "react";
import axios from "axios";

export default function Stream() {
    const [inputLink, setInputLink] = useState('');
    const [songLink, setSongLink] = useState('');

    const {id} = useParams();
    const streamId = Number(id);

    const addSong = () => {
      addYoutubeVideoWithLink(inputLink);
    }

    console.log("streamId", Number(streamId), typeof Number(streamId));

    const addYoutubeVideoWithLink = async(inputLink: string) => {
      const extracted = inputLink.split('be/')
      console.log("extracted song link",extracted[1]);
      const youtubeId = extracted[1];

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/song/add`, {streamId, youtubeId}, {
        headers: {
          "Authorization": localStorage.getItem('token'),
          "Content-Type": "application/json"
        }
      });

      if(response.status == 200){
        const data = response.data.data.youtubeid;     
        console.log("data", data);  
        setSongLink(data);
      }
    }
    
  return (
    <div className="flex overflow-hidden bg-[#0a0a0a]">
        <div className="w-[50vw] h-screen p-32">
            <SongList />
        </div>

        <div className="w-[50vw] p-32  flex-col flex gap-5">

           <div className="flex gap-6">
              <Input value={inputLink} onChange={(e) => setInputLink(e.target.value)} placeholder="Enter YT Link" className="text-white font-sans font-mediums"/>
              <Button onClick={addSong} className="bg-gradient-to-r from-purple-600 to-violet-800 hover:opacity-80">Add Song</Button>
          </div>    
          <div className="border h-[40vh] bg-white">

              <iframe
                width="702"
                height="376"
                src={`https://www.youtube.com/embed/${songLink}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
          </div>
          <div>
             <Button className="w-full bg-gradient-to-r from-purple-600 to-violet-800 hover:opacity-80">Play Next</Button>
          </div>
         
        </div>
    </div>
  )
}

