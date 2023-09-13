import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Portfolio from "./components/Portfolio/Portfolio";
import OurTeam from "./components/Team/OurTeam";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Header/Navbar/Navbar";
import GetInTouch from "./components/GetInTouch/GetInTouch";
import AdminHome from "./components/admin/AdminHome";
import Dashboard from "./components/admin/Dashboard";
import AdminPortfolio from "./components/admin/AdminPortfolio";
import AdminSlider from "./components/admin/AdminSlider";
import AdminTeam from "./components/admin/AdminTeam";
import AddNewAdmin from "./components/admin/AddNewAdmin";
import UpdateAdmin from "./components/admin/UpdateAdmin";
import AddPortfolio from "./components/admin/AddPortfolio";
import AddSlide from "./components/admin/AddSlide";
import UpdateSlides from "./components/admin/UpdateSlides";
import AddTeam from "./components/admin/AddTeam";
import UpdateTeam from "./components/admin/UpdateTeam";
import Protected from "./components/admin/Protected";
import UpdatePortfolio from "./components/admin/UpdatePortfolio";
import UserList from "./components/admin/UserList";
import Missing from "./components/Missing";
import AdminNavbar from "./components/admin/AdminNavbar";
import Permissions from "./components/admin/Permissions";
import Account from "./components/admin/Account";
import UpdatePersonalDetel from "./components/admin/UpdatePersonalDetel";
import ChangePassword from "./components/admin/ChangePassword";
import Settings from "./components/admin/Settings";
import NavigationSystem from "./components/admin/NavigationSystem"
import NavigateHeader from "./components/admin/NavigateHeader";
import NavigateFooter from "./components/admin/NavigateFooter";
import AdminBlog from "./components/admin/AdminBlog";
import "./components/Header/Navbar/Navbar.css"
import { useEffect,useState } from "react";
import axios from "axios";
import {Helmet} from "react-helmet";
function App() {
  const [faviconUrl, setFaviconUrl] = useState('');
  const [mod_status, setMod_status] = useState('');


useEffect(()=>{
  axios.get(`http://localhost:8000/api/get/genral/settings`)
  .then((res)=>{
    const faviconUrlFromAPI = res.data.keyValuePairs.favLogo;
    setFaviconUrl(faviconUrlFromAPI);
  })
  .catch((error)=>console.error(error));


fetch_mod_status()

},[])

const fetch_mod_status = async()=>{
  const response = await axios.get(`http://localhost:8000/api/get/module/mod_stat/act/inact`)
  .then((res)=>{
    // console.log(res.data.result)
    setMod_status(res.data.result)
  })
    };
  return (
    <div>
      <Helmet>
       <meta charSet="utf-8" />
         <title>Photo sec</title>
       {faviconUrl && (<link rel="icon" href={`http://localhost:8000/img/${faviconUrl}`} />)}
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route element={ mod_status && mod_status[1].mod_status === "1" ? <Footer /> : ""}>
            <Route element={mod_status && mod_status[0].mod_status === "1" ? <Navbar />: ""}>
              <Route element={<GetInTouch />}>
                <Route>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/team" element={<OurTeam />} />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="*" element={ <Missing />} />
{/* --------------------------------------------ADMIN-ROUTES------------------------------------------------ */}
          <Route  element={<AdminNavbar/>}>
          <Route path="/admin" element={<AdminHome  faviconUrl={faviconUrl}/>} />
          <Route path="/dashboard"element={<Protected><Dashboard /></Protected>}/>
          <Route path="/adminport"element={<Protected><AdminPortfolio /></Protected>}/>
          <Route path="/addport"element={<Protected><AddPortfolio /></Protected>}/>
          <Route path="/updateport/:id"element={ <Protected><UpdatePortfolio /> </Protected>} />
          <Route path="/slideradmin"element={<Protected><AdminSlider /></Protected>}/>
          <Route path="/addslides"element={<Protected><AddSlide /></Protected>}/>
          <Route path="/updateslides/:id"element={<Protected><UpdateSlides /></Protected> }/>
          <Route path="/teamadmin"element={<Protected><AdminTeam /></Protected>}/>       
          <Route path="/addteam" element={<Protected><AddTeam /></Protected> } />
          <Route path="/updateteam/:id"element={ <Protected><UpdateTeam /></Protected> }/>
          <Route path="/userlist" element={<Protected><UserList /></Protected> } /> 
          <Route path="/newadmin"element={<Protected><AddNewAdmin /></Protected>}/>
          <Route path="/updateadmin/:id"element={<Protected><UpdateAdmin /> </Protected>}/>
          <Route path="/permission/:id" element={<Protected><Permissions /></Protected> } />
          <Route path="/useraccount" element={<Protected><Account /></Protected> } />
          <Route path="/personaldetail/:id" element={<Protected><UpdatePersonalDetel /></Protected> } />
          <Route path="/changepassword/:id" element={<Protected><ChangePassword /></Protected> } />
          <Route path="/settings" element={<Protected><Settings /></Protected> } />
          <Route path="/navigation" element={<Protected><NavigationSystem /></Protected> } />
          <Route path="/navigateheader/:id" element={<Protected><NavigateHeader /></Protected> } />
          <Route path="/navigatefooter/:id" element={<Protected><NavigateFooter /></Protected> } />
          <Route path="/show/blog" element={<Protected><AdminBlog /></Protected> } />
          </Route>
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
