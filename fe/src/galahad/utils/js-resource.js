/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
// class Resource {
//   static map = new Map();

//   // _moduleId: string;
//   // _loader: () => Promise<T>;
//   // _loadingPromise: ?Promise<T>;
//   // _module: ?T;

//   constructor(moduleId, loader) {
//     this._moduleId = moduleId;
//     this._loader = loader;
//     this._loadingPromise = undefined;
//     this._module = undefined;
//   }

//   getModuleId() {
//     return this._moduleId;
//   }

//   getModuleIfRequired() {
//     return this._module;
//   }

//   load() {
//     if (!this._loadingPromise) {
//       this._loadingPromise = this._loader()
//         .then((module) => {
//           this._module = module;
//           return this._module;
//         })
//         .catch((error) => {
//           console.log(error);
//           throw error;
//         });
//     }
//     return this._loadingPromise;
//   }
// }

// export default function JSResource(moduleId, loader) {
//   let resource = Resource.map.get(moduleId);
//   if (!resource) {
//     resource = new Resource(moduleId, loader);
//     Resource.map.set(moduleId, resource);
//   }
//   return resource;
// }

Object.defineProperty(exports, "__esModule", { value: true });

class JSResourceImpl {
  constructor(loader) {
    this._loader = loader;
    this._result = null;
    this._error = null;
    this._promise = null;
  }
  load() {
    let promise = this._promise;
    if (!promise) {
      promise = this._loader().then(
        (result) => {
          this._result = result;
          return result;
        },
        (error) => {
          this._error = error;
          throw error;
        }
      );
      this._promise = promise;
    }
    return promise;
  }
  get() {
    if (this._result) {
      return this._result;
    }
    return undefined;
  }
  getModuleIfRequired() {
    return this.get();
  }
  read() {
    if (this._result) {
      return this._result;
    } else if (this._error) {
      throw this._error;
    } else {
      throw this._promise;
    }
  }
}
const resourceMap = new Map();
function JSResource(moduleId, loader) {
  let resource = resourceMap.get(moduleId);
  if (!resource) {
    resource = new JSResourceImpl(loader);
    resourceMap.set(moduleId, resource);
  }
  return resource;
}

exports.JSResource = JSResource;
