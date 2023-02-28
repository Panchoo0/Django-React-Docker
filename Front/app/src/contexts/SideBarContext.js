import { createContext, useState } from "react";

const SideBarContext = createContext();

export default SideBarContext;

export const SideBarProvider = ({ children }) => {
    const [open, setOpen] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    let contextData = {
        open: open,
        darkMode: darkMode,
        setOpen: setOpen,
        setDarkMode: setDarkMode,
    };

    return <SideBarContext.Provider value={contextData}>{children}</SideBarContext.Provider>;
};
