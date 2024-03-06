import { Button } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoKeyOutline} from 'react-icons/io5'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import useUserData from '../hooks/useUserData'
import Cookie from 'js-cookie'

type Inputs = {
    name: string
    email: string
    password: string
}

const Signin = ({handleClick}:any) => {
    const [data, setData] = useState<Inputs | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const [isDisable, SetIsDisable] = useState(true);
    const { userData,err, postData } = useUserData('signin');
        
        // console.log(userData.token);
    
    const onSubmit = async (data: Inputs) => {
        setData(data);
        await postData(data);
        Cookie.set("Authorisation", userData.token);
        window.location.reload();
    };

    const checkFormValidity = () => {
        const isFormValid = Object.keys(errors).length === 0;
        SetIsDisable(!isFormValid);
    };


    return (
        <form onChange={checkFormValidity} onSubmit={handleSubmit((d)=>{console.log(d)})} className='m-5' >

            <div className='relative w-fit m-5'>
                <input type='email' className='border-black border-2 pl-8 pr-4 py-2 rounded' {...register("email", { required: true })} placeholder='Enter your email' />
                <MdOutlineAlternateEmail className="absolute left-2 top-1/2 transform -translate-y-1/2" />
            </div>

            <div className='relative w-fit m-5'>
                <input type='password' className='border-black border-2 pl-8 pr-4 py-2 rounded' {...register("password", { required: true })} placeholder='password' />
                <IoKeyOutline className="absolute left-2 top-1/2 transform -translate-y-1/2" />
            </div>
            <div className='m-5'>
                {(errors.name || errors.password || errors.email) && <div className='text-red-500'>* all field required</div>}
                {err.message && <div className='text-red-500'>*{err.message}</div>}
            </div>
            
            <div className='mx-5'>
                <Button type='submit' onClick={handleSubmit((d)=>onSubmit(d))} variant='outlined' disabled={isDisable} >Sign In</Button>
            </div>
            <div className='mx-5' onClick={handleClick} >Create Account ? SignUp</div>
        </form>
    )
}

export default Signin