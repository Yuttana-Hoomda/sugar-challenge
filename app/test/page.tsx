import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'

const test = async () => {
    const session = await getServerSession(authOptions)
    console.log(session)
  return (
    <div>{session?.user?.email}</div>
  )
}

export default test