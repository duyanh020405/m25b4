"use client"
import store from '@/store/store'
import React from 'react'
import { Provider } from 'react-redux'

export default function Provided({children}:any) {
    
  return (
    <Provider store={store}>
         {children}
        
   
      
   </Provider>
  )
}
