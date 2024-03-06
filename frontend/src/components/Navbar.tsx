import { CgBot } from "react-icons/cg";
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import Signup from "./Signup";
import Signin from "./Signin";
import { TbEdit } from "react-icons/tb";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; 

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get("Authorisation")) {
            setIsAuth(true);
        }
    })

    //close dialog
    const handleClose = () => {
        setIsOpen(false);
    }
    //open dialog
    const OpenDialog = () => {
        setIsOpen((open) => !open)
    }
    //switch login & signup 
    const handleClick = () => {
        setIsLogin((isLogin) => !isLogin);
    }

    return (
        <div className='flex justify-between m-5'>
            <div>
                <CgBot className="cursor-pointer" onClick={()=>navigate("/")} size={40} color='#1976d2' />
            </div>
            <div>{isAuth ?
                (<Button variant="contained" onClick={()=>navigate("/new")} ><TbEdit /></Button>) :
                (<Button variant='text' onClick={OpenDialog}>Login</Button>)
            }
            </div>
            <Dialog onClose={handleClose} open={isOpen}>
                {isOpen && (isLogin ? <Signin handleClick={handleClick} /> : <Signup handleClick={handleClick} />)}
            </Dialog>
        </div>
    )
}

export default Navbar;