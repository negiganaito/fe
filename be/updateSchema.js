/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const fs = require("fs");
const path = require("path");
const { schema } = require("./index");
const { printSchema } = require("graphql");

const schemaPath = path.resolve(__dirname, "../data/schema.graphql");

fs.writeFileSync(schemaPath, printSchema(schema));

console.log("Finished updating schema " + schemaPath);
