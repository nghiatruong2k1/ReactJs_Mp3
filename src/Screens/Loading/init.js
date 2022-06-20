export const initState = [];
export const initCase = {ADD:'add',REMOVE:'remove'};
export function reducerState(prevState,key){
    switch(key){
        case initCase.ADD:{
            prevState.push(true);
            return [...prevState];
        }
        case initCase.REMOVE:{
            prevState.pop();
            return [...prevState];
        }
        default:{
            console.log(`không tôn tại case key`,initCase)
            return prevState
        }
    }
};