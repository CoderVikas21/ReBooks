import React from 'react'
import movingbook1 from '../assets/images/movingbook1.png'
import movingbook2 from '../assets/images/movingbook2.png'
import movingbook3 from '../assets/images/movingbook3.png'
import movingbook4 from '../assets/images/movingbook4.png'
const MovingBooks = () => {
  return (
    <>
        <div className="moving-object">
            <div className="scroll-wrapper">
                {/* Original Set of Images */}
                <img src={movingbook1} alt="Book 1" />
                <img src={movingbook2} alt="Book 2" />
                <img src={movingbook3} alt="Book 3" />
                <img src={movingbook4} alt="Book 3" />
                {/* Duplicate Set of Images */}
                <img src={movingbook1} alt="Book 1" />
                <img src={movingbook2} alt="Book 2" />
                <img src={movingbook3} alt="Book 3" />
                <img src={movingbook4} alt="Book 3" />
            </div>
    </div>
    </>
  )
}

export default MovingBooks
