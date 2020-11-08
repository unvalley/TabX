import React from 'react'
export const ThemeConfigContext = React.createContext({})
export const useConfigs = () => React.useContext(ThemeConfigContext)
