import { useState } from 'react'

function useLocalStorage(key, initialValue) {
  	const [storedValue, setStoredValue] = useState(() => {
    	try {
      		const item =
        		typeof window !== 'undefined'

      		return item ? item : initialValue;
    	}catch (error){
      		return initialValue
    	}
  	})

  	const setValue = value => {
    	try {
      		const valueToStore =
        		value instanceof Function ? value(storedValue) : value

      		setStoredValue(valueToStore);
    	}catch (error){
      		
    	}
  	}

  	return [storedValue, setValue]
}

export default useLocalStorage