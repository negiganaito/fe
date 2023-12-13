// TODO
// const g = window.HTMLElement

export function xplatToDOMRef(target) {
  return function (node) {
    node =
      window.HTMLElement && node instanceof window.HTMLElement ? node : null;
    typeof target === 'function'
      ? target(node)
      : target != null && typeof target === 'object' && (target.current = node);
  };
}
// TODO
// const h = window.HTMLInputElement

export function xplatToInputRef(target) {
  return function (node) {
    node =
      window.HTMLInputElement && node instanceof window.HTMLInputElement
        ? node
        : null;
    typeof target === 'function'
      ? target(node)
      : target != null && typeof target === 'object' && (target.current = node);
  };
}
