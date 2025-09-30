import React from 'react'

const SupportPage = () => {
  return (
    <div className='w-full'>
      {/* Intro */}
      <section className="flex flex-col gap-1 mb-6">
        <h1 className="text-lg font-medium text-grey-950">Support</h1>
        <p className="text-sm text-grey-500 font-normal">
          Get help with your account and technical issues
        </p>
      </section>
      <form className='bg-grey-50 rounded-lg w-[646px] py-5 px-4 flex flex-col gap-6'>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-grey-800">Subject *</label>
            <input
              type="text"
              placeholder="Brief description of your issue"
              className="bg-white w-full border border-grey-100 rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-0"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-grey-800">Description *</label>
            <textarea
              placeholder="Kindly describe your issue in details"
              rows={5}
              className="bg-white w-full border border-grey-100 rounded-2xl px-3 py-2 text-sm focus:outline-none focus:ring-0"
            ></textarea>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-grey-800">Attachment (optional)</label>
            <input
              type="file"
              className="bg-white w-full border border-grey-100 rounded-full px-3 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-600 hover:file:bg-primary-100 cursor-pointer"
            />
          </div>

        </div>
        <div>
          <button className='bg-primary-500 py-3 px-6 text-white text-base rounded-full'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default SupportPage