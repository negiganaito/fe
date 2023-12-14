import { createContext, useContext } from 'react'

const densityMode = false

export const CometDensityModeContext = createContext([densityMode, () => { }])

