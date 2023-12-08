import { useEffect, useRef } from "react";
import Scene from "../Scene-Game.js";

const Canvas = () => {
    const canvasRef = useRef()

    useEffect(()=>{
        Scene.setup(canvasRef.current)
    },[]);

  return(
  <canvas ref={canvasRef} className={s.canvas}/>
  )
};
export default Canvas;
