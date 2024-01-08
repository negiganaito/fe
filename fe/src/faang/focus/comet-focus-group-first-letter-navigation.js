/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useEffect, useState } from "react";

import { isStringNullOrEmpty } from "@/faang/utils";

const getFirstLetterNavigationTag = (text) => {
  return text.slice(0, 1).toLowerCase();
};

const useFirstLetterNavigationTag = (ref) => {
  const [firstLetter, setFirstLetter] = useState(undefined);

  useEffect(() => {
    const text = ref?.current?.innerText;
    if (!isStringNullOrEmpty(text)) {
      setFirstLetter(getFirstLetterNavigationTag(text));
    }
  }, [ref]);

  return firstLetter;
};

const handleFirstLetterNavigation = (props) => {
  const { type, event } = props;

  if (type === "PRINT_CHAR") {
    event.stopPropagation();
    let _key = props.event.key.toLowerCase();
    const item = props.getItemByTag(_key);
    item !== null && props.focusItem(item);
  }
};

export const CometFocusGroupFirstLetterNavigation = {
  getFirstLetterNavigationTag,
  useFirstLetterNavigationTag,
  handleFirstLetterNavigation,
};
