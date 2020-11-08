import React from 'react'
import {ThemeConfigContext} from './config-context'

export const ThemeConfigProvider = React.memo(({onChange, children}: any) => {
  return (
    <ThemeConfigContext.Provider value={{onChange}}>
      {children}
    </ThemeConfigContext.Provider>
  )
})
