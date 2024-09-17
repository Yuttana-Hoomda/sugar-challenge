import React, { useState } from 'react'

interface AddBeverageModalProps {
    menu:string,
    img:any
}

const AddBeverageModal:React.FC<AddBeverageModalProps> = ({menu, img}) => {
    const [isActive, setIsActive] = useState(false);

    if (isActive === false) {
        return null
    }
  return (
    <div>AddBeverageModal</div>
  )
}

export default AddBeverageModal