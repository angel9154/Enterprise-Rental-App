"use client"
import { useGetAuthUserQuery } from '@/state/api'
import React from 'react'

const TenantSettings = () => {
    const { data: authUser } = useGetAuthUserQuery()
    console.log('authUser:', authUser)
  return (
    <div>
      TenantSettings 
    </div>
  )
}

export default TenantSettings 
