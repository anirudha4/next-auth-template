import { Loading } from "@nextui-org/react";
import { useSession } from "next-auth/react";

const { createContext } = require("react");

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const { status } = useSession();
    if (status === 'loading') {
        return <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
        }}>
            <Loading>Loading</Loading>
        </div>

    }
    return (
        <AppContext.Provider>
            {children}
        </AppContext.Provider>
    )
}