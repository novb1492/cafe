import "./assets/common.css";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
function App() {
  
  const [seatInfoArr, setSeatInfoArr] = useState([]);
  const [floor,setFloor]=useState([]);
  const [drawing,setDrawing]=useState(null);
  let request =async (floor)=>{
    try {
      let response=await axios.get(`http://localhost:8080/api/auth/${floor}/seat`);
      let data=response.data;
      setDrawing(data.drawing);
      setSeatInfoArr(data.seats);
      console.log(response);
      if(floor===0){
        let floorArr=[];
        for(var i =0;i<data.floor;i++){
          floorArr[i]=i+1;
        }
        setFloor(floorArr);
      }
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    /**
     * 초기 층별 도면 요청
     */
    request(0);
  },[]);
  function zoomIn(event) {
    event.target.style.transform = "scale(1.2)"; //1.2배 확대
    event.target.style.zIndex = 1;
    event.target.style.transition = "all 0.5s";// 속도
  }
  function zoomOut(event) {
    event.target.style.transform = "scale(1)";
    event.target.style.zIndex = 0;
    event.target.style.transition = "all 0.5s";
  }
  return (
    <div>
       <div className="drawing" >
       <img style={{opacity:0.9}} id="two_seat" className="seat" src={drawing} alt="random photo" />
       <img style={{left:'21.6rem',top:'6.8rem'}} onMouseEnter={(event)=>zoomIn(event)} onMouseLeave={(event)=>{zoomOut(event)}} className="seat"  src={"https://eleven-fifty.s3.ap-northeast-2.amazonaws.com/%EC%B9%B4%ED%8E%98_%ED%8F%89%EB%A9%B4%EB%8F%84_(3)+(f).jpg"} alt="random photo" />
       <img style={{left:'23.95rem',top:'18.7rem'}} onMouseEnter={(event)=>zoomIn(event)} onMouseLeave={(event)=>{zoomOut(event)}} className="seat"  src={"https://eleven-fifty.s3.ap-northeast-2.amazonaws.com/%EC%B9%B4%ED%8E%98_%ED%8F%89%EB%A9%B4%EB%8F%84_(3)+(6).jpg"} alt="random photo" />
       <img style={{left:'32.3rem',top:'18.7rem'}} onMouseEnter={(event)=>zoomIn(event)} onMouseLeave={(event)=>{zoomOut(event)}} className="seat"  src={"https://eleven-fifty.s3.ap-northeast-2.amazonaws.com/%EC%B9%B4%ED%8E%98_%ED%8F%89%EB%A9%B4%EB%8F%84_(3)+(7).jpg"} alt="random photo" />
       {seatInfoArr.map((info) => (
                <img style={{left:info.left+'rem',top:info.top+'rem'}} onMouseEnter={(event)=>zoomIn(event)} onMouseLeave={(event)=>{zoomOut(event)}} key={info.id} className="seat"  src={info.url} alt="random photo" />
      ))}
      </div>
      <div>
        {floor.map((num) => (
          <button onClick={()=>request(num)}>{num}층</button>       
        ))}
      </div>
    </div>
  );
}

export default App;
