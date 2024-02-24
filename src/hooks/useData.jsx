
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
export function useData() {
    return useContext(DataContext)
}
