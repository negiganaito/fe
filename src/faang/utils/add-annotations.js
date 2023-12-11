// export function addAnnotations(a, b) {
//   Object.keys(b).forEach(function (c) {
//     var d;
//     a[c] = Object.assign((d = a[c]) != null ? d : {}, b[c]);
//   });
// }

/**
 * Adds annotations to an object by merging properties from another object.
 *
 * @param {object} target - The target object to add annotations to.
 * @param {object} annotations - The object containing annotations to be added.
 */
export function addAnnotations(target, annotations) {
  Object.keys(annotations).forEach((key) => {
    target[key] = Object.assign({}, target[key], annotations[key]);
  });
}
