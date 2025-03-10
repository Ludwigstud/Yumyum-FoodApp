import React from 'react'
import Header from '../components/Header'
import ReceiptInfo from '../components/receiptInfo'

const Receipt = () => {
  return (
    <div className='bg-[#605858] h-full flex flex-col items-center '>
      <Header/>
      <ReceiptInfo/>
    </div>
  )
}

export default Receipt