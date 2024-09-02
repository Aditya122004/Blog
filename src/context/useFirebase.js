import { useContext } from 'react';
import {FirebaseContext} from './Firebase'
export const useFirebase=()=>{
    const context = useContext(FirebaseContext);
    return context;
}