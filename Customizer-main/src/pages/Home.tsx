
import { useNavigate } from "react-router-dom"
import Chair from "../assets/img/chair.png"
import Sofa from "../assets/img/sofa.png"
import RollChair from "../assets/img/rollChair.png"

const Home = () => {
  const navigate = useNavigate()

  const handleOnClick = (path: string) => {
    navigate(path)
  }

    return (
         <div style={{ textAlign: "center", height: "100dvh", width: "100%" }}>
           <h1 style={{marginTop: "24px"}}>Customizer POC</h1>

           <div style={{display: "flex", alignItems:"center", justifyContent: "center", gap: "24px", marginTop: "50px"}}>
          <div
            onClick={() => handleOnClick("/chair")}
            style={{
              height: "100px",
              minWidth: "100px",
              borderRadius: "8px",
              border: "1px solid grey",
              cursor: "pointer",
            }}>
          <img src={Chair} alt="chair image" style={{height:"100%", width:"100%", objectFit: "cover",  borderRadius: "8px", }} />
          </div>
          <div
            onClick={() => handleOnClick("/sofa")}
            style={{
              height: "100px",
              minWidth: "100px",
              borderRadius: "8px",
              cursor: "pointer",
              border: "1px solid grey"
            }}>
             <img src={Sofa} alt="sofa image" style={{height:"100%", width:"100%", objectFit: "cover",  borderRadius: "8px", }} />
          </div>
          <div
             onClick={() => handleOnClick("/sofa-two")}
            style={{
              height: "100px",
              minWidth: "100px",
              borderRadius: "8px",
              cursor: "pointer",
              border: "1px solid grey"
            }}>
           <img src={RollChair} alt=" roll chair image" style={{height:"100%", width:"100%", objectFit: "cover",  borderRadius: "8px", }} />
          </div>
        </div>

         <p style={{marginTop: "25px", color: "red"}}>* Select any one item</p>

         </div>
    )
}

export default Home