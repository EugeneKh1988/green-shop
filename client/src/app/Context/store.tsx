"use client";

import React, { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

interface ContextProps {
    productCartCount: number;
    setProductCartCount: Dispatch<SetStateAction<number>>
}

const GlobalContext = createContext<ContextProps>({
    productCartCount: 0,
    setProductCartCount: (): number => 0,
});

export const GlobalContextProvider = ({children}: {children: React.ReactNode}) => {
    const [productCartCount, setProductCartCount] = useState(0);

    return (
        <GlobalContext.Provider value={{productCartCount, setProductCartCount}}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = () => useContext(GlobalContext)