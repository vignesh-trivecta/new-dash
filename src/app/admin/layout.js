'use client'
import DashLayout from '@/components/DashLayout'
import React from 'react'

const DashboardLayout = ({ children }) => {
  return (
    <div>
        <DashLayout>
            { children }
        </DashLayout>
        
    </div>
  )
}

export default DashboardLayout