/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { CometIcon } from "../icon";

export const CometListCellStrictAddOnStart = (props) => {
  const { addOnStart, disabled } = props;

  switch (addOnStart.type) {
    case "icon": {
      // eslint-disable-next-line no-unused-vars
      const { type, ...rest } = addOnStart;
      return <CometIcon {...rest} disabled={disabled} />;
    }
    case "profile-photo": {
      return undefined;
    }

    case "profile-photo-for-actor": {
      return undefined;
    }

    case "contained-icon": {
      return undefined;
    }

    case "contained-progress-ring-indeterminate": {
      return undefined;
    }

    case "messenger-facepile": {
      return undefined;
    }

    case "override": {
      return addOnStart.component;
    }

    case "emoji": {
      return undefined;
    }

    case "sprite": {
      return undefined;
    }

    default: {
      return undefined;
    }
  }
};
