import React from 'react';

interface DrawerContextType {
  extended: boolean;
  toggleDrawer: () => void;
 }

export const DrawerContext = React.createContext<DrawerContextType | undefined>(undefined);