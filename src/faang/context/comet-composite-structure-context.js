import { createContext } from 'react';

// type CometCompositeStructureContextProps = {
//   horizontal: boolean
//   vertical: boolean
//   role?: string
// }

export const CometCompositeStructureContext = createContext({
  horizontal: false,
  vertical: false,
});
