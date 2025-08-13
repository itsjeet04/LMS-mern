import React, { useEffect } from 'react'

function Rating({initialRating , onRate}) {

  const [rating, setRating] = React.useState(initialRating || 0);

  const handleRatingChange = (value) => {
    setRating(value);
    if (onRate) {
      onRate(value);
    }
  }

  useEffect(() => {
    if (initialRating) {
      setRating(initialRating);
    }
  }, [initialRating]);

  return (
    <div>
    {Array.from({length:5} , (_ , index)=>{
      const starValue = index + 1;
      return (
        <span key={index} className={`text-xl sm:text-2xl md:text-3xl cursor-pointer transition-color ${starValue <= rating ? 'text-yellow-500' : 'text-gray-300'}`} 
          onClick={() => handleRatingChange(starValue)}>
          &#9733; {/* Unicode for filled star */}
        </span>)
    }
    )}
    </div>
  )
}

export default Rating