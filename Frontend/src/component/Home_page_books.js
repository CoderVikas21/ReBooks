import React from 'react'

const home_page_books = ({book}) => {
    let id = book.id;
    let title = book.title;
    let desc = book.description.substring(0,250) + "...";
    let img = book.img;
  return (
    <>       

    
            <div className={`homebooks  w-full bg-transparent 
                ${id % 2 === 0 ? 'flex-row-reverse' : ''} bg-transparent mt-2 mb-2`}>

                <div className='scrollimg h-full w-1/2 flex justify-center items-center' >
                {/* img of books on left side */}
                  <img src={img} className='book_img'/>
                </div>
                <div className='scrolltext h-full w-1/2 flex justify-center items-center'>
                {/* tile&desc of books on right */}
                    <div className='flex flex-col '>
                        <h2 className='font-bold'>{title}</h2>
                        <p className='text-white'>{desc}</p>
                    </div>
                </div>
          </div> 
    </>
  )
}

export default home_page_books
