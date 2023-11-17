import React,{useState} from 'react';
import './App.css';
import AllUserssPage from './components/AllUserssPage'
import UsersDetailsPage from './components/UsersDetailsPage'
import Header from './components/Header'



const router=(page,setPage)=>{
  const {pageName,usersName} = page;
  switch(pageName){
    case 'UsersDetailsPage': 
      return <UsersDetailsPage usersName={usersName} changePage={()=>{setPage({pagename:'AllUserssPage',usersName:''})}}/>;
    case 'AllUserssPage':
      return <AllUserssPage changePage={(usersName)=>setPage({pageName:'UsersDetailsPage',usersName:usersName})}/>;
    default:
      return <AllUserssPage changePage={(usersName)=>setPage({pageName:'UsersDetailsPage',usersName:usersName})}/>;
}
}

function App() {
  const [page,setPage] = useState({pageName:'AllUserssPage',usersName:''})
  return (
    <div className="App">
      <Header/>
      {
      router(page,setPage)
      }
    </div>
  );
}

export default App;
