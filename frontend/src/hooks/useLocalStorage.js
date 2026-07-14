export default function useLocalStorage(){


    function getLocalStorage(key){
        return localStorage.getItem(key);
    }

    return {getLocalStorage}


}

