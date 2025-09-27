import React from 'react'
import { Add } from "iconsax-reactjs"

const EarningsPage = () => {
  return (
    <div className='w-full'>
      {/* Header */}
      <section className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-medium">Sales & Earnings</h1>
          <p className="text-grey-500 text-sm font-normal">
            Track your sales performance and manage payouts
          </p>
        </div>
        <button
          className="bg-primary-500 rounded-full flex gap-2 items-center text-white text-base font-normal py-3 px-6"
        >
          <Add />
          <p>Request Payout</p>
        </button>
      </section>
    </div>
  )
}

export default EarningsPage