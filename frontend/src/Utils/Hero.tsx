import { BackgroundBeamsWithCollision } from "../components/ui/background-beams-with-collision";
import CreateButton from "./CreateButton";
import JoinButton from "./JoinButton";

export function BackgroundBeamsWithCollisionDemo() {
  return (
    <BackgroundBeamsWithCollision>
   <div className="flex flex-col text-center">
    <div>
      <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
        Beat of Music?{" "}
        <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
          {/* <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
            <span className="">Exploding beams.</span>
          </div> */}
          <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-400 py-4">
            <span className="">upvote is users.</span>
          </div>
        </div>
      </h2>
    </div>
    <div className="mt-10 flex mx-auto gap-7 items-center">
      <JoinButton />
      <CreateButton />
    </div>
  
    </div>
    </BackgroundBeamsWithCollision>
  );
}
