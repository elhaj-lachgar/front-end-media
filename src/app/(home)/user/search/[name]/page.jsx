"use client"

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Loading from '@/app/components/loading/Loading';
import { SearchForUser } from '@/app/components/handler/datahandler';
import NotFound from '@/app/components/notfound/NotFound';
import User from '@/app/components/user/User';

function page({params}) {
  let [ data , setData ] = useState([]);
  let [ loading , setLoading ] = useState(true);
  let [ error , setError ] = useState(null);
  const router = useRouter()

  useEffect(()=>{
    if (!window.localStorage.getItem('token'))
        router.push('/auth/log');
    else {
        SearchForUser(params.name)
        .then( res => {
            
            if ( res ){
                setData( res );
                setLoading(false);
            }
            else{
                setError('not found')
                setLoading(false)
            }
        })
    }
  } ,[])
  console.log(data)

  return (
    <div>
        {   
            loading
            ?
            <Loading/>
            :
            <>
            {
                error
                ?
                <NotFound/>
                :
                data.map((ele , index )=>{
                    if (index == 0 || (index + 1 ) == data.length ){
                        return(
                            <User key={ele._id} id={ele._id} name={ele?.name} profile={ele?.profile}/>
                        )
                    }
                    return(
                        <>
                            <hr/>
                            <User key={ele._id} id={ele._id}  name={ele?.name} profile={ele?.profile}/>
                        </>
                    )
                })
            }
        </>
        }
    </div>
  )
}

export default page
