import { useState } from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'

function Navigation({ updateUser, user }) {
 const [menu, setMenu] = useState(false)
 const history = useHistory()

 // 6.✅ Build a DELETE fetch request
 const handleLogout = () => {
  fetch('/logout', {
    method: "DELETE"
  })
  .then(resp => {
      //6.1 On a successful delete x
      if (resp.ok){
              updateUser(null) //clear the user from state (updateUser is passed down from app via props)
              history.push('/authentication') //redirect back to the authentication route
      }
    })
  }

    // 7.✅ Head back to server/app.py to build a route that will keep our user logged in with sessions

    return (
        <Nav> 
         <NavH1>Flatiron Theater Company</NavH1>
         {user?<h1>hello {user.name}</h1> : <></>}
         <Menu>
           {!menu?
           <div onClick={() => setMenu(!menu)}>
             <GiHamburgerMenu size={30}/> 
           </div>:
           <ul>
            <li onClick={() => setMenu(!menu)}>x</li>
            { user === null || user.admin === "0" || user.admin === false? <></>:<li><Link to='/productions/new'>New Production</Link></li>}
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/authentication'>Login/Signup</Link></li>
            <li onClick={handleLogout}>Logout </li>
           </ul>
           }
         </Menu>
        </Nav>
    )
}

export default Navigation

const Menu = styled.div`
  display: flex;
  align-items: center;
  a{
    text-decoration: none;
    color:white;
    font-family:Arial;
  }
  a:hover{
    color:pink
  }
  ul{
    list-style:none;
  }
`;

const NavH1 = styled.h1`
font-family: 'Splash', cursive;
`
const Nav = styled.div`
  display: flex;
  justify-content:space-between;
`;