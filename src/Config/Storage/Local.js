export default function LocalStorage(namespace,initData){
    return {
        get(){
            return JSON.parse(localStorage.getItem(namespace)) ?? initData ?? undefined;
        },
        set(value){
            localStorage.setItem(namespace,JSON.stringify(value));
        },
        delete(){
            localStorage.delete(namespace)
        }
    };
};