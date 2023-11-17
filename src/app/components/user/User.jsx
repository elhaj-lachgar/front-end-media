
import React from 'react'
import default_user from "@/../public/default-avatar-profile-icon-vector-social-media-user-image-182145777.webp"
import style from "./user.module.css"
import Image from 'next/image'
import Link from 'next/link'

function User({ id,name , profile }) {
  return (
    <div className={style.container}>
        <div className='card'>
          <Link href={`http://localhost:3000/user/${id}`}>
            <div className={ style.Subcontainer }>
                <Image src={profile || default_user }  width={75} height={75} className={style.avatar}/>
                <p className={style.name}>{name}</p>
            </div>
          </Link>
        </div>
    </div>
  )
}

export default User
