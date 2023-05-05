import  {useCallback, useState}  from "react";

const useHttp = () => {

    const [isError , setIsError] = useState(false);
   
    const sendRequest = useCallback(async(url , applyData) => {
        setIsError(false);
        try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error ('Something went wrong');
        }
        const data = await response.json();
        applyData(data);
        }
        catch(err){
            setIsError(err || 'Something went wrong');
        }
    }, []);
    
    return {
        sendRequest , 
        isError
    }
}

export default useHttp;