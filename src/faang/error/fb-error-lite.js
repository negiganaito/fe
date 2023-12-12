const TaalOpcodes = {
  PREVIOUS_FILE: 1,
  PREVIOUS_FRAME: 2,
  PREVIOUS_DIR: 3,
  FORCED_KEY: 4,
};

function err(message) {
  const error = new Error(message);
  if (!error.stack)
    try {
      throw error;
    } catch (a) {
      //
    }
  error.messageFormat = message;

  const params = Array.from(arguments).slice(1).map(String);
  error.messageParams = params;
  error.taalOpcodes = [TaalOpcodes.PREVIOUS_FRAME];

  return error;

  // for (
  //   var c = arguments.length, d = new Array(c > 1 ? c - 1 : 0), e = 1;
  //   e < c;
  //   e++
  // )
  //   d[e - 1] = arguments[e];
  // error.messageParams = d.map(function (a) {
  //   return String(a);
  // });
  // error.taalOpcodes = [g.PREVIOUS_FRAME];
  // return error;
}

export const fbErrorLite = {
  err,
  TAALOpcode: TaalOpcodes,
};
