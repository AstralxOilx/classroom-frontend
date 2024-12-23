// app/context/PageContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';

const PageContext = createContext<{ pageName: string; setPageName: (name: string) => void } | undefined>(undefined);

export const PageProvider = ({ children }: { children: ReactNode }) => {
    const [pageName, setPageName] = useState<string>("");

    return (
        <PageContext.Provider value={{ pageName, setPageName }}>
            {children}
        </PageContext.Provider>
    );
};

export const usePageContext = () => {
    const context = useContext(PageContext);
    if (!context) {
        throw new Error("usePageContext must be used within a PageProvider");
    }
    return context;
};
