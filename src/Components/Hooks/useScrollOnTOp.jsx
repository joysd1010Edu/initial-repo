import React, { useEffect } from 'react';

const useScrollOnTOp = (param) => {
   useEffect(()=>{
    window.scrollTo(0, 0);
    
   },[param])
};

export default useScrollOnTOp;