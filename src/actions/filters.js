//no dependecy here to import anything

//SET_TEXT_FILTER
export const setTextFilter = (text="") => {
    return {
        type:"SET_TEXT_FILTER",
        text
    }
}


//SORT_BY_DATE
export const sortByDate = () => {
    return {
        type:"SORT_BY_DATE",
        
    }
}


//SORT_BY_AMOUNT
export const sortByAmount = () => {
    return {
        type:"SORT_BY_AMOUNT",
        
    }
}


//SET_START_DATE
export const setStartDate = (sDate) => {
    return {
        type:"SET_START_DATE",
        sDate
    }
}


//SET_END_DATE
export const setEndDate = (eDate) => {
    return {
        type:"SET_END_DATE",
        eDate
    }
}




//we are doing named export