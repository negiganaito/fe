import React, { useLayoutEffect, useRef } from 'react';

export type EventOption = {
  passive?: boolean;
};

export type UseEventHandle = {
  setListener: (
    target: EventTarget,
    listener: null | ((e: React.SyntheticEvent<EventTarget>) => void)
  ) => void;
  clear: () => void;
};
