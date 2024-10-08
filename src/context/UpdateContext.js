import React, { useState, createContext } from "react";

export const UpdateContext = createContext();

const UpdateProvider = (props) => {
    const [wordUpdate, setWordUpdate] = useState(0);
    return (
        <UpdateContext.Provider value={{ wordUpdate, setWordUpdate }}>
            {props.children}
        </UpdateContext.Provider>
    );
};

export default UpdateProvider;
