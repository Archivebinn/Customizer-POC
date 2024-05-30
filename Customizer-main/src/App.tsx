
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";

const CustomizerChair = lazy(() => import("./pages/CustomizerChair"))
const CustomizerSofa = lazy(() => import("./pages/CustomizerSofa"))
const CustomizerSofaTwo = lazy(() => import("./pages/CustomizerSofaTwo"))
const Home = lazy(() => import("./pages/Home"))

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/chair" element={<CustomizerChair/>}/>
          <Route path="/sofa" element={<CustomizerSofa/>}/>
          <Route path="/sofa-two" element={<CustomizerSofaTwo/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
