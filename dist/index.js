// Polyfills for bundled code
if (typeof __dirname === 'undefined') {
  global.__dirname = '.';
}
if (typeof __filename === 'undefined') {
  global.__filename = 'index.js';
}
if (typeof import.meta === 'undefined') {
  global.import = { meta: { url: 'file:///' + __dirname + '/' + __filename } };
}
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/dotenv/package.json
var require_package = __commonJS({
  "../../node_modules/dotenv/package.json"(exports2, module2) {
    module2.exports = {
      name: "dotenv",
      version: "17.2.3",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        pretest: "npm run lint && npm run dts-check",
        test: "tap run tests/**/*.js --allow-empty-coverage --disable-coverage --timeout=60000",
        "test:coverage": "tap run tests/**/*.js --show-full-coverage --timeout=60000 --coverage-report=text --coverage-report=lcov",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      homepage: "https://github.com/motdotla/dotenv#readme",
      funding: "https://dotenvx.com",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@types/node": "^18.11.3",
        decache: "^4.6.2",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-version": "^9.5.0",
        tap: "^19.2.0",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// ../../node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "../../node_modules/dotenv/lib/main.js"(exports2, module2) {
    var fs4 = require("fs");
    var path3 = require("path");
    var os = require("os");
    var crypto = require("crypto");
    var packageJson = require_package();
    var version = packageJson.version;
    var TIPS = [
      "\u{1F510} encrypt with Dotenvx: https://dotenvx.com",
      "\u{1F510} prevent committing .env to code: https://dotenvx.com/precommit",
      "\u{1F510} prevent building .env in docker: https://dotenvx.com/prebuild",
      "\u{1F4E1} add observability to secrets: https://dotenvx.com/ops",
      "\u{1F465} sync secrets across teammates & machines: https://dotenvx.com/ops",
      "\u{1F5C2}\uFE0F backup and recover secrets: https://dotenvx.com/ops",
      "\u2705 audit secrets and track compliance: https://dotenvx.com/ops",
      "\u{1F504} add secrets lifecycle management: https://dotenvx.com/ops",
      "\u{1F511} add access controls to secrets: https://dotenvx.com/ops",
      "\u{1F6E0}\uFE0F  run anywhere with `dotenvx run -- yourcommand`",
      "\u2699\uFE0F  specify custom .env file path with { path: '/custom/path/.env' }",
      "\u2699\uFE0F  enable debug logging with { debug: true }",
      "\u2699\uFE0F  override existing env vars with { override: true }",
      "\u2699\uFE0F  suppress all logs with { quiet: true }",
      "\u2699\uFE0F  write to custom object with { processEnv: myObject }",
      "\u2699\uFE0F  load multiple .env files with { path: ['.env.local', '.env'] }"
    ];
    function _getRandomTip() {
      return TIPS[Math.floor(Math.random() * TIPS.length)];
    }
    function parseBoolean(value) {
      if (typeof value === "string") {
        return !["false", "0", "no", "off", ""].includes(value.toLowerCase());
      }
      return Boolean(value);
    }
    function supportsAnsi() {
      return process.stdout.isTTY;
    }
    function dim(text) {
      return supportsAnsi() ? `\x1B[2m${text}\x1B[0m` : text;
    }
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse2(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      options = options || {};
      const vaultPath = _vaultPath(options);
      options.path = vaultPath;
      const result = DotenvModule.configDotenv(options);
      if (!result.parsed) {
        const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
        err.code = "MISSING_DATA";
        throw err;
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i + 1 >= length) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _warn(message) {
      console.error(`[dotenv@${version}][WARN] ${message}`);
    }
    function _debug(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _log(message) {
      console.log(`[dotenv@${version}] ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error;
      }
      const key = uri.password;
      if (!key) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
        err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
        throw err;
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let possibleVaultPath = null;
      if (options && options.path && options.path.length > 0) {
        if (Array.isArray(options.path)) {
          for (const filepath of options.path) {
            if (fs4.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path3.resolve(process.cwd(), ".env.vault");
      }
      if (fs4.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path3.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      const debug = parseBoolean(process.env.DOTENV_CONFIG_DEBUG || options && options.debug);
      const quiet = parseBoolean(process.env.DOTENV_CONFIG_QUIET || options && options.quiet);
      if (debug || !quiet) {
        _log("Loading env from encrypted .env.vault");
      }
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      const dotenvPath = path3.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      let debug = parseBoolean(processEnv.DOTENV_CONFIG_DEBUG || options && options.debug);
      let quiet = parseBoolean(processEnv.DOTENV_CONFIG_QUIET || options && options.quiet);
      if (options && options.encoding) {
        encoding = options.encoding;
      } else {
        if (debug) {
          _debug("No encoding is specified. UTF-8 is used by default");
        }
      }
      let optionPaths = [dotenvPath];
      if (options && options.path) {
        if (!Array.isArray(options.path)) {
          optionPaths = [_resolveHome(options.path)];
        } else {
          optionPaths = [];
          for (const filepath of options.path) {
            optionPaths.push(_resolveHome(filepath));
          }
        }
      }
      let lastError;
      const parsedAll = {};
      for (const path4 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs4.readFileSync(path4, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e) {
          if (debug) {
            _debug(`Failed to load ${path4} ${e.message}`);
          }
          lastError = e;
        }
      }
      const populated = DotenvModule.populate(processEnv, parsedAll, options);
      debug = parseBoolean(processEnv.DOTENV_CONFIG_DEBUG || debug);
      quiet = parseBoolean(processEnv.DOTENV_CONFIG_QUIET || quiet);
      if (debug || !quiet) {
        const keysCount = Object.keys(populated).length;
        const shortPaths = [];
        for (const filePath of optionPaths) {
          try {
            const relative = path3.relative(process.cwd(), filePath);
            shortPaths.push(relative);
          } catch (e) {
            if (debug) {
              _debug(`Failed to load ${filePath} ${e.message}`);
            }
            lastError = e;
          }
        }
        _log(`injecting env (${keysCount}) from ${shortPaths.join(",")} ${dim(`-- tip: ${_getRandomTip()}`)}`);
      }
      if (lastError) {
        return { parsed: parsedAll, error: lastError };
      } else {
        return { parsed: parsedAll };
      }
    }
    function config(options) {
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      const vaultPath = _vaultPath(options);
      if (!vaultPath) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.subarray(0, 12);
      const authTag = ciphertext.subarray(-16);
      ciphertext = ciphertext.subarray(12, -16);
      try {
        const aesgcm = crypto.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error) {
        const isRange = error instanceof RangeError;
        const invalidKeyLength = error.message === "Invalid key length";
        const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        } else if (decryptionFailed) {
          const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          err.code = "DECRYPTION_FAILED";
          throw err;
        } else {
          throw error;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      const populated = {};
      if (typeof parsed !== "object") {
        const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        err.code = "OBJECT_REQUIRED";
        throw err;
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
            populated[key] = parsed[key];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
          populated[key] = parsed[key];
        }
      }
      return populated;
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config,
      decrypt,
      parse: parse2,
      populate
    };
    module2.exports.configDotenv = DotenvModule.configDotenv;
    module2.exports._configVault = DotenvModule._configVault;
    module2.exports._parseVault = DotenvModule._parseVault;
    module2.exports.config = DotenvModule.config;
    module2.exports.decrypt = DotenvModule.decrypt;
    module2.exports.parse = DotenvModule.parse;
    module2.exports.populate = DotenvModule.populate;
    module2.exports = DotenvModule;
  }
});

// src/main.ts
var import_fs2 = __toESM(require("fs"), 1);

// src/config.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
function loadConfig(configPath) {
  const resolvedPath = configPath ?? import_path.default.resolve(process.cwd(), "profile.config.json");
  const raw = import_fs.default.readFileSync(resolvedPath, "utf-8");
  return JSON.parse(raw);
}

// ../../node_modules/graphql-request/build/legacy/classes/ClientError.js
var ClientError = class _ClientError extends Error {
  response;
  request;
  constructor(response, request2) {
    const message = `${_ClientError.extractMessage(response)}: ${JSON.stringify({
      response,
      request: request2
    })}`;
    super(message);
    Object.setPrototypeOf(this, _ClientError.prototype);
    this.response = response;
    this.request = request2;
    if (typeof Error.captureStackTrace === `function`) {
      Error.captureStackTrace(this, _ClientError);
    }
  }
  static extractMessage(response) {
    return response.errors?.[0]?.message ?? `GraphQL Error (Code: ${String(response.status)})`;
  }
};

// ../../node_modules/graphql-request/build/lib/prelude.js
var uppercase = (str) => str.toUpperCase();
var callOrIdentity = (value) => {
  return typeof value === `function` ? value() : value;
};
var zip = (a, b) => a.map((k, i) => [k, b[i]]);
var HeadersInitToPlainObject = (headers) => {
  let oHeaders = {};
  if (headers instanceof Headers) {
    oHeaders = HeadersInstanceToPlainObject(headers);
  } else if (Array.isArray(headers)) {
    headers.forEach(([name, value]) => {
      if (name && value !== void 0) {
        oHeaders[name] = value;
      }
    });
  } else if (headers) {
    oHeaders = headers;
  }
  return oHeaders;
};
var HeadersInstanceToPlainObject = (headers) => {
  const o = {};
  headers.forEach((v, k) => {
    o[k] = v;
  });
  return o;
};
var tryCatch = (fn) => {
  try {
    const result = fn();
    if (isPromiseLikeValue(result)) {
      return result.catch((error) => {
        return errorFromMaybeError(error);
      });
    }
    return result;
  } catch (error) {
    return errorFromMaybeError(error);
  }
};
var errorFromMaybeError = (maybeError) => {
  if (maybeError instanceof Error)
    return maybeError;
  return new Error(String(maybeError));
};
var isPromiseLikeValue = (value) => {
  return typeof value === `object` && value !== null && `then` in value && typeof value.then === `function` && `catch` in value && typeof value.catch === `function` && `finally` in value && typeof value.finally === `function`;
};
var casesExhausted = (value) => {
  throw new Error(`Unhandled case: ${String(value)}`);
};
var isPlainObject = (value) => {
  return typeof value === `object` && value !== null && !Array.isArray(value);
};

// ../../node_modules/graphql-request/build/legacy/functions/batchRequests.js
var parseBatchRequestArgs = (documentsOrOptions, requestHeaders) => {
  return documentsOrOptions.documents ? documentsOrOptions : {
    documents: documentsOrOptions,
    requestHeaders,
    signal: void 0
  };
};

// ../../node_modules/graphql-request/build/legacy/functions/rawRequest.js
var parseRawRequestArgs = (queryOrOptions, variables, requestHeaders) => {
  return queryOrOptions.query ? queryOrOptions : {
    query: queryOrOptions,
    variables,
    requestHeaders,
    signal: void 0
  };
};

// ../../node_modules/graphql/jsutils/devAssert.mjs
function devAssert(condition, message) {
  const booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error(message);
  }
}

// ../../node_modules/graphql/jsutils/isObjectLike.mjs
function isObjectLike(value) {
  return typeof value == "object" && value !== null;
}

// ../../node_modules/graphql/jsutils/invariant.mjs
function invariant(condition, message) {
  const booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error(
      message != null ? message : "Unexpected invariant triggered."
    );
  }
}

// ../../node_modules/graphql/language/location.mjs
var LineRegExp = /\r\n|[\n\r]/g;
function getLocation(source, position) {
  let lastLineStart = 0;
  let line = 1;
  for (const match of source.body.matchAll(LineRegExp)) {
    typeof match.index === "number" || invariant(false);
    if (match.index >= position) {
      break;
    }
    lastLineStart = match.index + match[0].length;
    line += 1;
  }
  return {
    line,
    column: position + 1 - lastLineStart
  };
}

// ../../node_modules/graphql/language/printLocation.mjs
function printLocation(location) {
  return printSourceLocation(
    location.source,
    getLocation(location.source, location.start)
  );
}
function printSourceLocation(source, sourceLocation) {
  const firstLineColumnOffset = source.locationOffset.column - 1;
  const body = "".padStart(firstLineColumnOffset) + source.body;
  const lineIndex = sourceLocation.line - 1;
  const lineOffset = source.locationOffset.line - 1;
  const lineNum = sourceLocation.line + lineOffset;
  const columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
  const columnNum = sourceLocation.column + columnOffset;
  const locationStr = `${source.name}:${lineNum}:${columnNum}
`;
  const lines = body.split(/\r\n|[\n\r]/g);
  const locationLine = lines[lineIndex];
  if (locationLine.length > 120) {
    const subLineIndex = Math.floor(columnNum / 80);
    const subLineColumnNum = columnNum % 80;
    const subLines = [];
    for (let i = 0; i < locationLine.length; i += 80) {
      subLines.push(locationLine.slice(i, i + 80));
    }
    return locationStr + printPrefixedLines([
      [`${lineNum} |`, subLines[0]],
      ...subLines.slice(1, subLineIndex + 1).map((subLine) => ["|", subLine]),
      ["|", "^".padStart(subLineColumnNum)],
      ["|", subLines[subLineIndex + 1]]
    ]);
  }
  return locationStr + printPrefixedLines([
    // Lines specified like this: ["prefix", "string"],
    [`${lineNum - 1} |`, lines[lineIndex - 1]],
    [`${lineNum} |`, locationLine],
    ["|", "^".padStart(columnNum)],
    [`${lineNum + 1} |`, lines[lineIndex + 1]]
  ]);
}
function printPrefixedLines(lines) {
  const existingLines = lines.filter(([_, line]) => line !== void 0);
  const padLen = Math.max(...existingLines.map(([prefix]) => prefix.length));
  return existingLines.map(([prefix, line]) => prefix.padStart(padLen) + (line ? " " + line : "")).join("\n");
}

// ../../node_modules/graphql/error/GraphQLError.mjs
function toNormalizedOptions(args) {
  const firstArg = args[0];
  if (firstArg == null || "kind" in firstArg || "length" in firstArg) {
    return {
      nodes: firstArg,
      source: args[1],
      positions: args[2],
      path: args[3],
      originalError: args[4],
      extensions: args[5]
    };
  }
  return firstArg;
}
var GraphQLError = class _GraphQLError extends Error {
  /**
   * An array of `{ line, column }` locations within the source GraphQL document
   * which correspond to this error.
   *
   * Errors during validation often contain multiple locations, for example to
   * point out two things with the same name. Errors during execution include a
   * single location, the field which produced the error.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */
  /**
   * An array describing the JSON-path into the execution response which
   * corresponds to this error. Only included for errors during execution.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */
  /**
   * An array of GraphQL AST Nodes corresponding to this error.
   */
  /**
   * The source GraphQL document for the first location of this error.
   *
   * Note that if this Error represents more than one node, the source may not
   * represent nodes after the first node.
   */
  /**
   * An array of character offsets within the source GraphQL document
   * which correspond to this error.
   */
  /**
   * The original error thrown from a field resolver during execution.
   */
  /**
   * Extension fields to add to the formatted error.
   */
  /**
   * @deprecated Please use the `GraphQLErrorOptions` constructor overload instead.
   */
  constructor(message, ...rawArgs) {
    var _this$nodes, _nodeLocations$, _ref;
    const { nodes, source, positions, path: path3, originalError, extensions } = toNormalizedOptions(rawArgs);
    super(message);
    this.name = "GraphQLError";
    this.path = path3 !== null && path3 !== void 0 ? path3 : void 0;
    this.originalError = originalError !== null && originalError !== void 0 ? originalError : void 0;
    this.nodes = undefinedIfEmpty(
      Array.isArray(nodes) ? nodes : nodes ? [nodes] : void 0
    );
    const nodeLocations = undefinedIfEmpty(
      (_this$nodes = this.nodes) === null || _this$nodes === void 0 ? void 0 : _this$nodes.map((node) => node.loc).filter((loc) => loc != null)
    );
    this.source = source !== null && source !== void 0 ? source : nodeLocations === null || nodeLocations === void 0 ? void 0 : (_nodeLocations$ = nodeLocations[0]) === null || _nodeLocations$ === void 0 ? void 0 : _nodeLocations$.source;
    this.positions = positions !== null && positions !== void 0 ? positions : nodeLocations === null || nodeLocations === void 0 ? void 0 : nodeLocations.map((loc) => loc.start);
    this.locations = positions && source ? positions.map((pos) => getLocation(source, pos)) : nodeLocations === null || nodeLocations === void 0 ? void 0 : nodeLocations.map((loc) => getLocation(loc.source, loc.start));
    const originalExtensions = isObjectLike(
      originalError === null || originalError === void 0 ? void 0 : originalError.extensions
    ) ? originalError === null || originalError === void 0 ? void 0 : originalError.extensions : void 0;
    this.extensions = (_ref = extensions !== null && extensions !== void 0 ? extensions : originalExtensions) !== null && _ref !== void 0 ? _ref : /* @__PURE__ */ Object.create(null);
    Object.defineProperties(this, {
      message: {
        writable: true,
        enumerable: true
      },
      name: {
        enumerable: false
      },
      nodes: {
        enumerable: false
      },
      source: {
        enumerable: false
      },
      positions: {
        enumerable: false
      },
      originalError: {
        enumerable: false
      }
    });
    if (originalError !== null && originalError !== void 0 && originalError.stack) {
      Object.defineProperty(this, "stack", {
        value: originalError.stack,
        writable: true,
        configurable: true
      });
    } else if (Error.captureStackTrace) {
      Error.captureStackTrace(this, _GraphQLError);
    } else {
      Object.defineProperty(this, "stack", {
        value: Error().stack,
        writable: true,
        configurable: true
      });
    }
  }
  get [Symbol.toStringTag]() {
    return "GraphQLError";
  }
  toString() {
    let output = this.message;
    if (this.nodes) {
      for (const node of this.nodes) {
        if (node.loc) {
          output += "\n\n" + printLocation(node.loc);
        }
      }
    } else if (this.source && this.locations) {
      for (const location of this.locations) {
        output += "\n\n" + printSourceLocation(this.source, location);
      }
    }
    return output;
  }
  toJSON() {
    const formattedError = {
      message: this.message
    };
    if (this.locations != null) {
      formattedError.locations = this.locations;
    }
    if (this.path != null) {
      formattedError.path = this.path;
    }
    if (this.extensions != null && Object.keys(this.extensions).length > 0) {
      formattedError.extensions = this.extensions;
    }
    return formattedError;
  }
};
function undefinedIfEmpty(array) {
  return array === void 0 || array.length === 0 ? void 0 : array;
}

// ../../node_modules/graphql/error/syntaxError.mjs
function syntaxError(source, position, description) {
  return new GraphQLError(`Syntax Error: ${description}`, {
    source,
    positions: [position]
  });
}

// ../../node_modules/graphql/language/ast.mjs
var Location = class {
  /**
   * The character offset at which this Node begins.
   */
  /**
   * The character offset at which this Node ends.
   */
  /**
   * The Token at which this Node begins.
   */
  /**
   * The Token at which this Node ends.
   */
  /**
   * The Source document the AST represents.
   */
  constructor(startToken, endToken, source) {
    this.start = startToken.start;
    this.end = endToken.end;
    this.startToken = startToken;
    this.endToken = endToken;
    this.source = source;
  }
  get [Symbol.toStringTag]() {
    return "Location";
  }
  toJSON() {
    return {
      start: this.start,
      end: this.end
    };
  }
};
var Token = class {
  /**
   * The kind of Token.
   */
  /**
   * The character offset at which this Node begins.
   */
  /**
   * The character offset at which this Node ends.
   */
  /**
   * The 1-indexed line number on which this Token appears.
   */
  /**
   * The 1-indexed column number at which this Token begins.
   */
  /**
   * For non-punctuation tokens, represents the interpreted value of the token.
   *
   * Note: is undefined for punctuation tokens, but typed as string for
   * convenience in the parser.
   */
  /**
   * Tokens exist as nodes in a double-linked-list amongst all tokens
   * including ignored tokens. <SOF> is always the first node and <EOF>
   * the last.
   */
  constructor(kind, start, end, line, column, value) {
    this.kind = kind;
    this.start = start;
    this.end = end;
    this.line = line;
    this.column = column;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
  get [Symbol.toStringTag]() {
    return "Token";
  }
  toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column
    };
  }
};
var QueryDocumentKeys = {
  Name: [],
  Document: ["definitions"],
  OperationDefinition: [
    "description",
    "name",
    "variableDefinitions",
    "directives",
    "selectionSet"
  ],
  VariableDefinition: [
    "description",
    "variable",
    "type",
    "defaultValue",
    "directives"
  ],
  Variable: ["name"],
  SelectionSet: ["selections"],
  Field: ["alias", "name", "arguments", "directives", "selectionSet"],
  Argument: ["name", "value"],
  FragmentSpread: ["name", "directives"],
  InlineFragment: ["typeCondition", "directives", "selectionSet"],
  FragmentDefinition: [
    "description",
    "name",
    // Note: fragment variable definitions are deprecated and will removed in v17.0.0
    "variableDefinitions",
    "typeCondition",
    "directives",
    "selectionSet"
  ],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ["values"],
  ObjectValue: ["fields"],
  ObjectField: ["name", "value"],
  Directive: ["name", "arguments"],
  NamedType: ["name"],
  ListType: ["type"],
  NonNullType: ["type"],
  SchemaDefinition: ["description", "directives", "operationTypes"],
  OperationTypeDefinition: ["type"],
  ScalarTypeDefinition: ["description", "name", "directives"],
  ObjectTypeDefinition: [
    "description",
    "name",
    "interfaces",
    "directives",
    "fields"
  ],
  FieldDefinition: ["description", "name", "arguments", "type", "directives"],
  InputValueDefinition: [
    "description",
    "name",
    "type",
    "defaultValue",
    "directives"
  ],
  InterfaceTypeDefinition: [
    "description",
    "name",
    "interfaces",
    "directives",
    "fields"
  ],
  UnionTypeDefinition: ["description", "name", "directives", "types"],
  EnumTypeDefinition: ["description", "name", "directives", "values"],
  EnumValueDefinition: ["description", "name", "directives"],
  InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
  DirectiveDefinition: ["description", "name", "arguments", "locations"],
  SchemaExtension: ["directives", "operationTypes"],
  ScalarTypeExtension: ["name", "directives"],
  ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
  InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
  UnionTypeExtension: ["name", "directives", "types"],
  EnumTypeExtension: ["name", "directives", "values"],
  InputObjectTypeExtension: ["name", "directives", "fields"],
  TypeCoordinate: ["name"],
  MemberCoordinate: ["name", "memberName"],
  ArgumentCoordinate: ["name", "fieldName", "argumentName"],
  DirectiveCoordinate: ["name"],
  DirectiveArgumentCoordinate: ["name", "argumentName"]
};
var kindValues = new Set(Object.keys(QueryDocumentKeys));
function isNode(maybeNode) {
  const maybeKind = maybeNode === null || maybeNode === void 0 ? void 0 : maybeNode.kind;
  return typeof maybeKind === "string" && kindValues.has(maybeKind);
}
var OperationTypeNode;
(function(OperationTypeNode2) {
  OperationTypeNode2["QUERY"] = "query";
  OperationTypeNode2["MUTATION"] = "mutation";
  OperationTypeNode2["SUBSCRIPTION"] = "subscription";
})(OperationTypeNode || (OperationTypeNode = {}));

// ../../node_modules/graphql/language/directiveLocation.mjs
var DirectiveLocation;
(function(DirectiveLocation2) {
  DirectiveLocation2["QUERY"] = "QUERY";
  DirectiveLocation2["MUTATION"] = "MUTATION";
  DirectiveLocation2["SUBSCRIPTION"] = "SUBSCRIPTION";
  DirectiveLocation2["FIELD"] = "FIELD";
  DirectiveLocation2["FRAGMENT_DEFINITION"] = "FRAGMENT_DEFINITION";
  DirectiveLocation2["FRAGMENT_SPREAD"] = "FRAGMENT_SPREAD";
  DirectiveLocation2["INLINE_FRAGMENT"] = "INLINE_FRAGMENT";
  DirectiveLocation2["VARIABLE_DEFINITION"] = "VARIABLE_DEFINITION";
  DirectiveLocation2["SCHEMA"] = "SCHEMA";
  DirectiveLocation2["SCALAR"] = "SCALAR";
  DirectiveLocation2["OBJECT"] = "OBJECT";
  DirectiveLocation2["FIELD_DEFINITION"] = "FIELD_DEFINITION";
  DirectiveLocation2["ARGUMENT_DEFINITION"] = "ARGUMENT_DEFINITION";
  DirectiveLocation2["INTERFACE"] = "INTERFACE";
  DirectiveLocation2["UNION"] = "UNION";
  DirectiveLocation2["ENUM"] = "ENUM";
  DirectiveLocation2["ENUM_VALUE"] = "ENUM_VALUE";
  DirectiveLocation2["INPUT_OBJECT"] = "INPUT_OBJECT";
  DirectiveLocation2["INPUT_FIELD_DEFINITION"] = "INPUT_FIELD_DEFINITION";
})(DirectiveLocation || (DirectiveLocation = {}));

// ../../node_modules/graphql/language/kinds.mjs
var Kind;
(function(Kind2) {
  Kind2["NAME"] = "Name";
  Kind2["DOCUMENT"] = "Document";
  Kind2["OPERATION_DEFINITION"] = "OperationDefinition";
  Kind2["VARIABLE_DEFINITION"] = "VariableDefinition";
  Kind2["SELECTION_SET"] = "SelectionSet";
  Kind2["FIELD"] = "Field";
  Kind2["ARGUMENT"] = "Argument";
  Kind2["FRAGMENT_SPREAD"] = "FragmentSpread";
  Kind2["INLINE_FRAGMENT"] = "InlineFragment";
  Kind2["FRAGMENT_DEFINITION"] = "FragmentDefinition";
  Kind2["VARIABLE"] = "Variable";
  Kind2["INT"] = "IntValue";
  Kind2["FLOAT"] = "FloatValue";
  Kind2["STRING"] = "StringValue";
  Kind2["BOOLEAN"] = "BooleanValue";
  Kind2["NULL"] = "NullValue";
  Kind2["ENUM"] = "EnumValue";
  Kind2["LIST"] = "ListValue";
  Kind2["OBJECT"] = "ObjectValue";
  Kind2["OBJECT_FIELD"] = "ObjectField";
  Kind2["DIRECTIVE"] = "Directive";
  Kind2["NAMED_TYPE"] = "NamedType";
  Kind2["LIST_TYPE"] = "ListType";
  Kind2["NON_NULL_TYPE"] = "NonNullType";
  Kind2["SCHEMA_DEFINITION"] = "SchemaDefinition";
  Kind2["OPERATION_TYPE_DEFINITION"] = "OperationTypeDefinition";
  Kind2["SCALAR_TYPE_DEFINITION"] = "ScalarTypeDefinition";
  Kind2["OBJECT_TYPE_DEFINITION"] = "ObjectTypeDefinition";
  Kind2["FIELD_DEFINITION"] = "FieldDefinition";
  Kind2["INPUT_VALUE_DEFINITION"] = "InputValueDefinition";
  Kind2["INTERFACE_TYPE_DEFINITION"] = "InterfaceTypeDefinition";
  Kind2["UNION_TYPE_DEFINITION"] = "UnionTypeDefinition";
  Kind2["ENUM_TYPE_DEFINITION"] = "EnumTypeDefinition";
  Kind2["ENUM_VALUE_DEFINITION"] = "EnumValueDefinition";
  Kind2["INPUT_OBJECT_TYPE_DEFINITION"] = "InputObjectTypeDefinition";
  Kind2["DIRECTIVE_DEFINITION"] = "DirectiveDefinition";
  Kind2["SCHEMA_EXTENSION"] = "SchemaExtension";
  Kind2["SCALAR_TYPE_EXTENSION"] = "ScalarTypeExtension";
  Kind2["OBJECT_TYPE_EXTENSION"] = "ObjectTypeExtension";
  Kind2["INTERFACE_TYPE_EXTENSION"] = "InterfaceTypeExtension";
  Kind2["UNION_TYPE_EXTENSION"] = "UnionTypeExtension";
  Kind2["ENUM_TYPE_EXTENSION"] = "EnumTypeExtension";
  Kind2["INPUT_OBJECT_TYPE_EXTENSION"] = "InputObjectTypeExtension";
  Kind2["TYPE_COORDINATE"] = "TypeCoordinate";
  Kind2["MEMBER_COORDINATE"] = "MemberCoordinate";
  Kind2["ARGUMENT_COORDINATE"] = "ArgumentCoordinate";
  Kind2["DIRECTIVE_COORDINATE"] = "DirectiveCoordinate";
  Kind2["DIRECTIVE_ARGUMENT_COORDINATE"] = "DirectiveArgumentCoordinate";
})(Kind || (Kind = {}));

// ../../node_modules/graphql/language/characterClasses.mjs
function isWhiteSpace(code) {
  return code === 9 || code === 32;
}
function isDigit(code) {
  return code >= 48 && code <= 57;
}
function isLetter(code) {
  return code >= 97 && code <= 122 || // A-Z
  code >= 65 && code <= 90;
}
function isNameStart(code) {
  return isLetter(code) || code === 95;
}
function isNameContinue(code) {
  return isLetter(code) || isDigit(code) || code === 95;
}

// ../../node_modules/graphql/language/blockString.mjs
function dedentBlockStringLines(lines) {
  var _firstNonEmptyLine2;
  let commonIndent = Number.MAX_SAFE_INTEGER;
  let firstNonEmptyLine = null;
  let lastNonEmptyLine = -1;
  for (let i = 0; i < lines.length; ++i) {
    var _firstNonEmptyLine;
    const line = lines[i];
    const indent2 = leadingWhitespace(line);
    if (indent2 === line.length) {
      continue;
    }
    firstNonEmptyLine = (_firstNonEmptyLine = firstNonEmptyLine) !== null && _firstNonEmptyLine !== void 0 ? _firstNonEmptyLine : i;
    lastNonEmptyLine = i;
    if (i !== 0 && indent2 < commonIndent) {
      commonIndent = indent2;
    }
  }
  return lines.map((line, i) => i === 0 ? line : line.slice(commonIndent)).slice(
    (_firstNonEmptyLine2 = firstNonEmptyLine) !== null && _firstNonEmptyLine2 !== void 0 ? _firstNonEmptyLine2 : 0,
    lastNonEmptyLine + 1
  );
}
function leadingWhitespace(str) {
  let i = 0;
  while (i < str.length && isWhiteSpace(str.charCodeAt(i))) {
    ++i;
  }
  return i;
}
function printBlockString(value, options) {
  const escapedValue = value.replace(/"""/g, '\\"""');
  const lines = escapedValue.split(/\r\n|[\n\r]/g);
  const isSingleLine = lines.length === 1;
  const forceLeadingNewLine = lines.length > 1 && lines.slice(1).every((line) => line.length === 0 || isWhiteSpace(line.charCodeAt(0)));
  const hasTrailingTripleQuotes = escapedValue.endsWith('\\"""');
  const hasTrailingQuote = value.endsWith('"') && !hasTrailingTripleQuotes;
  const hasTrailingSlash = value.endsWith("\\");
  const forceTrailingNewline = hasTrailingQuote || hasTrailingSlash;
  const printAsMultipleLines = !(options !== null && options !== void 0 && options.minimize) && // add leading and trailing new lines only if it improves readability
  (!isSingleLine || value.length > 70 || forceTrailingNewline || forceLeadingNewLine || hasTrailingTripleQuotes);
  let result = "";
  const skipLeadingNewLine = isSingleLine && isWhiteSpace(value.charCodeAt(0));
  if (printAsMultipleLines && !skipLeadingNewLine || forceLeadingNewLine) {
    result += "\n";
  }
  result += escapedValue;
  if (printAsMultipleLines || forceTrailingNewline) {
    result += "\n";
  }
  return '"""' + result + '"""';
}

// ../../node_modules/graphql/language/tokenKind.mjs
var TokenKind;
(function(TokenKind2) {
  TokenKind2["SOF"] = "<SOF>";
  TokenKind2["EOF"] = "<EOF>";
  TokenKind2["BANG"] = "!";
  TokenKind2["DOLLAR"] = "$";
  TokenKind2["AMP"] = "&";
  TokenKind2["PAREN_L"] = "(";
  TokenKind2["PAREN_R"] = ")";
  TokenKind2["DOT"] = ".";
  TokenKind2["SPREAD"] = "...";
  TokenKind2["COLON"] = ":";
  TokenKind2["EQUALS"] = "=";
  TokenKind2["AT"] = "@";
  TokenKind2["BRACKET_L"] = "[";
  TokenKind2["BRACKET_R"] = "]";
  TokenKind2["BRACE_L"] = "{";
  TokenKind2["PIPE"] = "|";
  TokenKind2["BRACE_R"] = "}";
  TokenKind2["NAME"] = "Name";
  TokenKind2["INT"] = "Int";
  TokenKind2["FLOAT"] = "Float";
  TokenKind2["STRING"] = "String";
  TokenKind2["BLOCK_STRING"] = "BlockString";
  TokenKind2["COMMENT"] = "Comment";
})(TokenKind || (TokenKind = {}));

// ../../node_modules/graphql/language/lexer.mjs
var Lexer = class {
  /**
   * The previously focused non-ignored token.
   */
  /**
   * The currently focused non-ignored token.
   */
  /**
   * The (1-indexed) line containing the current token.
   */
  /**
   * The character offset at which the current line begins.
   */
  constructor(source) {
    const startOfFileToken = new Token(TokenKind.SOF, 0, 0, 0, 0);
    this.source = source;
    this.lastToken = startOfFileToken;
    this.token = startOfFileToken;
    this.line = 1;
    this.lineStart = 0;
  }
  get [Symbol.toStringTag]() {
    return "Lexer";
  }
  /**
   * Advances the token stream to the next non-ignored token.
   */
  advance() {
    this.lastToken = this.token;
    const token = this.token = this.lookahead();
    return token;
  }
  /**
   * Looks ahead and returns the next non-ignored token, but does not change
   * the state of Lexer.
   */
  lookahead() {
    let token = this.token;
    if (token.kind !== TokenKind.EOF) {
      do {
        if (token.next) {
          token = token.next;
        } else {
          const nextToken = readNextToken(this, token.end);
          token.next = nextToken;
          nextToken.prev = token;
          token = nextToken;
        }
      } while (token.kind === TokenKind.COMMENT);
    }
    return token;
  }
};
function isPunctuatorTokenKind(kind) {
  return kind === TokenKind.BANG || kind === TokenKind.DOLLAR || kind === TokenKind.AMP || kind === TokenKind.PAREN_L || kind === TokenKind.PAREN_R || kind === TokenKind.DOT || kind === TokenKind.SPREAD || kind === TokenKind.COLON || kind === TokenKind.EQUALS || kind === TokenKind.AT || kind === TokenKind.BRACKET_L || kind === TokenKind.BRACKET_R || kind === TokenKind.BRACE_L || kind === TokenKind.PIPE || kind === TokenKind.BRACE_R;
}
function isUnicodeScalarValue(code) {
  return code >= 0 && code <= 55295 || code >= 57344 && code <= 1114111;
}
function isSupplementaryCodePoint(body, location) {
  return isLeadingSurrogate(body.charCodeAt(location)) && isTrailingSurrogate(body.charCodeAt(location + 1));
}
function isLeadingSurrogate(code) {
  return code >= 55296 && code <= 56319;
}
function isTrailingSurrogate(code) {
  return code >= 56320 && code <= 57343;
}
function printCodePointAt(lexer, location) {
  const code = lexer.source.body.codePointAt(location);
  if (code === void 0) {
    return TokenKind.EOF;
  } else if (code >= 32 && code <= 126) {
    const char = String.fromCodePoint(code);
    return char === '"' ? `'"'` : `"${char}"`;
  }
  return "U+" + code.toString(16).toUpperCase().padStart(4, "0");
}
function createToken(lexer, kind, start, end, value) {
  const line = lexer.line;
  const col = 1 + start - lexer.lineStart;
  return new Token(kind, start, end, line, col, value);
}
function readNextToken(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start;
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    switch (code) {
      // Ignored ::
      //   - UnicodeBOM
      //   - WhiteSpace
      //   - LineTerminator
      //   - Comment
      //   - Comma
      //
      // UnicodeBOM :: "Byte Order Mark (U+FEFF)"
      //
      // WhiteSpace ::
      //   - "Horizontal Tab (U+0009)"
      //   - "Space (U+0020)"
      //
      // Comma :: ,
      case 65279:
      // <BOM>
      case 9:
      // \t
      case 32:
      // <space>
      case 44:
        ++position;
        continue;
      // LineTerminator ::
      //   - "New Line (U+000A)"
      //   - "Carriage Return (U+000D)" [lookahead != "New Line (U+000A)"]
      //   - "Carriage Return (U+000D)" "New Line (U+000A)"
      case 10:
        ++position;
        ++lexer.line;
        lexer.lineStart = position;
        continue;
      case 13:
        if (body.charCodeAt(position + 1) === 10) {
          position += 2;
        } else {
          ++position;
        }
        ++lexer.line;
        lexer.lineStart = position;
        continue;
      // Comment
      case 35:
        return readComment(lexer, position);
      // Token ::
      //   - Punctuator
      //   - Name
      //   - IntValue
      //   - FloatValue
      //   - StringValue
      //
      // Punctuator :: one of ! $ & ( ) ... : = @ [ ] { | }
      case 33:
        return createToken(lexer, TokenKind.BANG, position, position + 1);
      case 36:
        return createToken(lexer, TokenKind.DOLLAR, position, position + 1);
      case 38:
        return createToken(lexer, TokenKind.AMP, position, position + 1);
      case 40:
        return createToken(lexer, TokenKind.PAREN_L, position, position + 1);
      case 41:
        return createToken(lexer, TokenKind.PAREN_R, position, position + 1);
      case 46:
        if (body.charCodeAt(position + 1) === 46 && body.charCodeAt(position + 2) === 46) {
          return createToken(lexer, TokenKind.SPREAD, position, position + 3);
        }
        break;
      case 58:
        return createToken(lexer, TokenKind.COLON, position, position + 1);
      case 61:
        return createToken(lexer, TokenKind.EQUALS, position, position + 1);
      case 64:
        return createToken(lexer, TokenKind.AT, position, position + 1);
      case 91:
        return createToken(lexer, TokenKind.BRACKET_L, position, position + 1);
      case 93:
        return createToken(lexer, TokenKind.BRACKET_R, position, position + 1);
      case 123:
        return createToken(lexer, TokenKind.BRACE_L, position, position + 1);
      case 124:
        return createToken(lexer, TokenKind.PIPE, position, position + 1);
      case 125:
        return createToken(lexer, TokenKind.BRACE_R, position, position + 1);
      // StringValue
      case 34:
        if (body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
          return readBlockString(lexer, position);
        }
        return readString(lexer, position);
    }
    if (isDigit(code) || code === 45) {
      return readNumber(lexer, position, code);
    }
    if (isNameStart(code)) {
      return readName(lexer, position);
    }
    throw syntaxError(
      lexer.source,
      position,
      code === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : isUnicodeScalarValue(code) || isSupplementaryCodePoint(body, position) ? `Unexpected character: ${printCodePointAt(lexer, position)}.` : `Invalid character: ${printCodePointAt(lexer, position)}.`
    );
  }
  return createToken(lexer, TokenKind.EOF, bodyLength, bodyLength);
}
function readComment(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (code === 10 || code === 13) {
      break;
    }
    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      break;
    }
  }
  return createToken(
    lexer,
    TokenKind.COMMENT,
    start,
    position,
    body.slice(start + 1, position)
  );
}
function readNumber(lexer, start, firstCode) {
  const body = lexer.source.body;
  let position = start;
  let code = firstCode;
  let isFloat = false;
  if (code === 45) {
    code = body.charCodeAt(++position);
  }
  if (code === 48) {
    code = body.charCodeAt(++position);
    if (isDigit(code)) {
      throw syntaxError(
        lexer.source,
        position,
        `Invalid number, unexpected digit after 0: ${printCodePointAt(
          lexer,
          position
        )}.`
      );
    }
  } else {
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 46) {
    isFloat = true;
    code = body.charCodeAt(++position);
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 69 || code === 101) {
    isFloat = true;
    code = body.charCodeAt(++position);
    if (code === 43 || code === 45) {
      code = body.charCodeAt(++position);
    }
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 46 || isNameStart(code)) {
    throw syntaxError(
      lexer.source,
      position,
      `Invalid number, expected digit but got: ${printCodePointAt(
        lexer,
        position
      )}.`
    );
  }
  return createToken(
    lexer,
    isFloat ? TokenKind.FLOAT : TokenKind.INT,
    start,
    position,
    body.slice(start, position)
  );
}
function readDigits(lexer, start, firstCode) {
  if (!isDigit(firstCode)) {
    throw syntaxError(
      lexer.source,
      start,
      `Invalid number, expected digit but got: ${printCodePointAt(
        lexer,
        start
      )}.`
    );
  }
  const body = lexer.source.body;
  let position = start + 1;
  while (isDigit(body.charCodeAt(position))) {
    ++position;
  }
  return position;
}
function readString(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;
  let chunkStart = position;
  let value = "";
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (code === 34) {
      value += body.slice(chunkStart, position);
      return createToken(lexer, TokenKind.STRING, start, position + 1, value);
    }
    if (code === 92) {
      value += body.slice(chunkStart, position);
      const escape = body.charCodeAt(position + 1) === 117 ? body.charCodeAt(position + 2) === 123 ? readEscapedUnicodeVariableWidth(lexer, position) : readEscapedUnicodeFixedWidth(lexer, position) : readEscapedCharacter(lexer, position);
      value += escape.value;
      position += escape.size;
      chunkStart = position;
      continue;
    }
    if (code === 10 || code === 13) {
      break;
    }
    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      throw syntaxError(
        lexer.source,
        position,
        `Invalid character within String: ${printCodePointAt(
          lexer,
          position
        )}.`
      );
    }
  }
  throw syntaxError(lexer.source, position, "Unterminated string.");
}
function readEscapedUnicodeVariableWidth(lexer, position) {
  const body = lexer.source.body;
  let point = 0;
  let size = 3;
  while (size < 12) {
    const code = body.charCodeAt(position + size++);
    if (code === 125) {
      if (size < 5 || !isUnicodeScalarValue(point)) {
        break;
      }
      return {
        value: String.fromCodePoint(point),
        size
      };
    }
    point = point << 4 | readHexDigit(code);
    if (point < 0) {
      break;
    }
  }
  throw syntaxError(
    lexer.source,
    position,
    `Invalid Unicode escape sequence: "${body.slice(
      position,
      position + size
    )}".`
  );
}
function readEscapedUnicodeFixedWidth(lexer, position) {
  const body = lexer.source.body;
  const code = read16BitHexCode(body, position + 2);
  if (isUnicodeScalarValue(code)) {
    return {
      value: String.fromCodePoint(code),
      size: 6
    };
  }
  if (isLeadingSurrogate(code)) {
    if (body.charCodeAt(position + 6) === 92 && body.charCodeAt(position + 7) === 117) {
      const trailingCode = read16BitHexCode(body, position + 8);
      if (isTrailingSurrogate(trailingCode)) {
        return {
          value: String.fromCodePoint(code, trailingCode),
          size: 12
        };
      }
    }
  }
  throw syntaxError(
    lexer.source,
    position,
    `Invalid Unicode escape sequence: "${body.slice(position, position + 6)}".`
  );
}
function read16BitHexCode(body, position) {
  return readHexDigit(body.charCodeAt(position)) << 12 | readHexDigit(body.charCodeAt(position + 1)) << 8 | readHexDigit(body.charCodeAt(position + 2)) << 4 | readHexDigit(body.charCodeAt(position + 3));
}
function readHexDigit(code) {
  return code >= 48 && code <= 57 ? code - 48 : code >= 65 && code <= 70 ? code - 55 : code >= 97 && code <= 102 ? code - 87 : -1;
}
function readEscapedCharacter(lexer, position) {
  const body = lexer.source.body;
  const code = body.charCodeAt(position + 1);
  switch (code) {
    case 34:
      return {
        value: '"',
        size: 2
      };
    case 92:
      return {
        value: "\\",
        size: 2
      };
    case 47:
      return {
        value: "/",
        size: 2
      };
    case 98:
      return {
        value: "\b",
        size: 2
      };
    case 102:
      return {
        value: "\f",
        size: 2
      };
    case 110:
      return {
        value: "\n",
        size: 2
      };
    case 114:
      return {
        value: "\r",
        size: 2
      };
    case 116:
      return {
        value: "	",
        size: 2
      };
  }
  throw syntaxError(
    lexer.source,
    position,
    `Invalid character escape sequence: "${body.slice(
      position,
      position + 2
    )}".`
  );
}
function readBlockString(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let lineStart = lexer.lineStart;
  let position = start + 3;
  let chunkStart = position;
  let currentLine = "";
  const blockLines = [];
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (code === 34 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
      currentLine += body.slice(chunkStart, position);
      blockLines.push(currentLine);
      const token = createToken(
        lexer,
        TokenKind.BLOCK_STRING,
        start,
        position + 3,
        // Return a string of the lines joined with U+000A.
        dedentBlockStringLines(blockLines).join("\n")
      );
      lexer.line += blockLines.length - 1;
      lexer.lineStart = lineStart;
      return token;
    }
    if (code === 92 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34 && body.charCodeAt(position + 3) === 34) {
      currentLine += body.slice(chunkStart, position);
      chunkStart = position + 1;
      position += 4;
      continue;
    }
    if (code === 10 || code === 13) {
      currentLine += body.slice(chunkStart, position);
      blockLines.push(currentLine);
      if (code === 13 && body.charCodeAt(position + 1) === 10) {
        position += 2;
      } else {
        ++position;
      }
      currentLine = "";
      chunkStart = position;
      lineStart = position;
      continue;
    }
    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      throw syntaxError(
        lexer.source,
        position,
        `Invalid character within String: ${printCodePointAt(
          lexer,
          position
        )}.`
      );
    }
  }
  throw syntaxError(lexer.source, position, "Unterminated string.");
}
function readName(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (isNameContinue(code)) {
      ++position;
    } else {
      break;
    }
  }
  return createToken(
    lexer,
    TokenKind.NAME,
    start,
    position,
    body.slice(start, position)
  );
}

// ../../node_modules/graphql/jsutils/inspect.mjs
var MAX_ARRAY_LENGTH = 10;
var MAX_RECURSIVE_DEPTH = 2;
function inspect(value) {
  return formatValue(value, []);
}
function formatValue(value, seenValues) {
  switch (typeof value) {
    case "string":
      return JSON.stringify(value);
    case "function":
      return value.name ? `[function ${value.name}]` : "[function]";
    case "object":
      return formatObjectValue(value, seenValues);
    default:
      return String(value);
  }
}
function formatObjectValue(value, previouslySeenValues) {
  if (value === null) {
    return "null";
  }
  if (previouslySeenValues.includes(value)) {
    return "[Circular]";
  }
  const seenValues = [...previouslySeenValues, value];
  if (isJSONable(value)) {
    const jsonValue = value.toJSON();
    if (jsonValue !== value) {
      return typeof jsonValue === "string" ? jsonValue : formatValue(jsonValue, seenValues);
    }
  } else if (Array.isArray(value)) {
    return formatArray(value, seenValues);
  }
  return formatObject(value, seenValues);
}
function isJSONable(value) {
  return typeof value.toJSON === "function";
}
function formatObject(object, seenValues) {
  const entries = Object.entries(object);
  if (entries.length === 0) {
    return "{}";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[" + getObjectTag(object) + "]";
  }
  const properties = entries.map(
    ([key, value]) => key + ": " + formatValue(value, seenValues)
  );
  return "{ " + properties.join(", ") + " }";
}
function formatArray(array, seenValues) {
  if (array.length === 0) {
    return "[]";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[Array]";
  }
  const len = Math.min(MAX_ARRAY_LENGTH, array.length);
  const remaining = array.length - len;
  const items = [];
  for (let i = 0; i < len; ++i) {
    items.push(formatValue(array[i], seenValues));
  }
  if (remaining === 1) {
    items.push("... 1 more item");
  } else if (remaining > 1) {
    items.push(`... ${remaining} more items`);
  }
  return "[" + items.join(", ") + "]";
}
function getObjectTag(object) {
  const tag = Object.prototype.toString.call(object).replace(/^\[object /, "").replace(/]$/, "");
  if (tag === "Object" && typeof object.constructor === "function") {
    const name = object.constructor.name;
    if (typeof name === "string" && name !== "") {
      return name;
    }
  }
  return tag;
}

// ../../node_modules/graphql/jsutils/instanceOf.mjs
var isProduction = globalThis.process && // eslint-disable-next-line no-undef
process.env.NODE_ENV === "production";
var instanceOf = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  isProduction ? function instanceOf2(value, constructor) {
    return value instanceof constructor;
  } : function instanceOf3(value, constructor) {
    if (value instanceof constructor) {
      return true;
    }
    if (typeof value === "object" && value !== null) {
      var _value$constructor;
      const className = constructor.prototype[Symbol.toStringTag];
      const valueClassName = (
        // We still need to support constructor's name to detect conflicts with older versions of this library.
        Symbol.toStringTag in value ? value[Symbol.toStringTag] : (_value$constructor = value.constructor) === null || _value$constructor === void 0 ? void 0 : _value$constructor.name
      );
      if (className === valueClassName) {
        const stringifiedValue = inspect(value);
        throw new Error(`Cannot use ${className} "${stringifiedValue}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
      }
    }
    return false;
  }
);

// ../../node_modules/graphql/language/source.mjs
var Source = class {
  constructor(body, name = "GraphQL request", locationOffset = {
    line: 1,
    column: 1
  }) {
    typeof body === "string" || devAssert(false, `Body must be a string. Received: ${inspect(body)}.`);
    this.body = body;
    this.name = name;
    this.locationOffset = locationOffset;
    this.locationOffset.line > 0 || devAssert(
      false,
      "line in locationOffset is 1-indexed and must be positive."
    );
    this.locationOffset.column > 0 || devAssert(
      false,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
};
function isSource(source) {
  return instanceOf(source, Source);
}

// ../../node_modules/graphql/language/parser.mjs
function parse(source, options) {
  const parser = new Parser(source, options);
  const document = parser.parseDocument();
  Object.defineProperty(document, "tokenCount", {
    enumerable: false,
    value: parser.tokenCount
  });
  return document;
}
var Parser = class {
  constructor(source, options = {}) {
    const { lexer, ..._options } = options;
    if (lexer) {
      this._lexer = lexer;
    } else {
      const sourceObj = isSource(source) ? source : new Source(source);
      this._lexer = new Lexer(sourceObj);
    }
    this._options = _options;
    this._tokenCounter = 0;
  }
  get tokenCount() {
    return this._tokenCounter;
  }
  /**
   * Converts a name lex token into a name parse node.
   */
  parseName() {
    const token = this.expectToken(TokenKind.NAME);
    return this.node(token, {
      kind: Kind.NAME,
      value: token.value
    });
  }
  // Implements the parsing rules in the Document section.
  /**
   * Document : Definition+
   */
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: Kind.DOCUMENT,
      definitions: this.many(
        TokenKind.SOF,
        this.parseDefinition,
        TokenKind.EOF
      )
    });
  }
  /**
   * Definition :
   *   - ExecutableDefinition
   *   - TypeSystemDefinition
   *   - TypeSystemExtension
   *
   * ExecutableDefinition :
   *   - OperationDefinition
   *   - FragmentDefinition
   *
   * TypeSystemDefinition :
   *   - SchemaDefinition
   *   - TypeDefinition
   *   - DirectiveDefinition
   *
   * TypeDefinition :
   *   - ScalarTypeDefinition
   *   - ObjectTypeDefinition
   *   - InterfaceTypeDefinition
   *   - UnionTypeDefinition
   *   - EnumTypeDefinition
   *   - InputObjectTypeDefinition
   */
  parseDefinition() {
    if (this.peek(TokenKind.BRACE_L)) {
      return this.parseOperationDefinition();
    }
    const hasDescription = this.peekDescription();
    const keywordToken = hasDescription ? this._lexer.lookahead() : this._lexer.token;
    if (hasDescription && keywordToken.kind === TokenKind.BRACE_L) {
      throw syntaxError(
        this._lexer.source,
        this._lexer.token.start,
        "Unexpected description, descriptions are not supported on shorthand queries."
      );
    }
    if (keywordToken.kind === TokenKind.NAME) {
      switch (keywordToken.value) {
        case "schema":
          return this.parseSchemaDefinition();
        case "scalar":
          return this.parseScalarTypeDefinition();
        case "type":
          return this.parseObjectTypeDefinition();
        case "interface":
          return this.parseInterfaceTypeDefinition();
        case "union":
          return this.parseUnionTypeDefinition();
        case "enum":
          return this.parseEnumTypeDefinition();
        case "input":
          return this.parseInputObjectTypeDefinition();
        case "directive":
          return this.parseDirectiveDefinition();
      }
      switch (keywordToken.value) {
        case "query":
        case "mutation":
        case "subscription":
          return this.parseOperationDefinition();
        case "fragment":
          return this.parseFragmentDefinition();
      }
      if (hasDescription) {
        throw syntaxError(
          this._lexer.source,
          this._lexer.token.start,
          "Unexpected description, only GraphQL definitions support descriptions."
        );
      }
      switch (keywordToken.value) {
        case "extend":
          return this.parseTypeSystemExtension();
      }
    }
    throw this.unexpected(keywordToken);
  }
  // Implements the parsing rules in the Operations section.
  /**
   * OperationDefinition :
   *  - SelectionSet
   *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
   */
  parseOperationDefinition() {
    const start = this._lexer.token;
    if (this.peek(TokenKind.BRACE_L)) {
      return this.node(start, {
        kind: Kind.OPERATION_DEFINITION,
        operation: OperationTypeNode.QUERY,
        description: void 0,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    }
    const description = this.parseDescription();
    const operation = this.parseOperationType();
    let name;
    if (this.peek(TokenKind.NAME)) {
      name = this.parseName();
    }
    return this.node(start, {
      kind: Kind.OPERATION_DEFINITION,
      operation,
      description,
      name,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * OperationType : one of query mutation subscription
   */
  parseOperationType() {
    const operationToken = this.expectToken(TokenKind.NAME);
    switch (operationToken.value) {
      case "query":
        return OperationTypeNode.QUERY;
      case "mutation":
        return OperationTypeNode.MUTATION;
      case "subscription":
        return OperationTypeNode.SUBSCRIPTION;
    }
    throw this.unexpected(operationToken);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */
  parseVariableDefinitions() {
    return this.optionalMany(
      TokenKind.PAREN_L,
      this.parseVariableDefinition,
      TokenKind.PAREN_R
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: Kind.VARIABLE_DEFINITION,
      description: this.parseDescription(),
      variable: this.parseVariable(),
      type: (this.expectToken(TokenKind.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(TokenKind.EQUALS) ? this.parseConstValueLiteral() : void 0,
      directives: this.parseConstDirectives()
    });
  }
  /**
   * Variable : $ Name
   */
  parseVariable() {
    const start = this._lexer.token;
    this.expectToken(TokenKind.DOLLAR);
    return this.node(start, {
      kind: Kind.VARIABLE,
      name: this.parseName()
    });
  }
  /**
   * ```
   * SelectionSet : { Selection+ }
   * ```
   */
  parseSelectionSet() {
    return this.node(this._lexer.token, {
      kind: Kind.SELECTION_SET,
      selections: this.many(
        TokenKind.BRACE_L,
        this.parseSelection,
        TokenKind.BRACE_R
      )
    });
  }
  /**
   * Selection :
   *   - Field
   *   - FragmentSpread
   *   - InlineFragment
   */
  parseSelection() {
    return this.peek(TokenKind.SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  parseField() {
    const start = this._lexer.token;
    const nameOrAlias = this.parseName();
    let alias;
    let name;
    if (this.expectOptionalToken(TokenKind.COLON)) {
      alias = nameOrAlias;
      name = this.parseName();
    } else {
      name = nameOrAlias;
    }
    return this.node(start, {
      kind: Kind.FIELD,
      alias,
      name,
      arguments: this.parseArguments(false),
      directives: this.parseDirectives(false),
      selectionSet: this.peek(TokenKind.BRACE_L) ? this.parseSelectionSet() : void 0
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  parseArguments(isConst) {
    const item = isConst ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(TokenKind.PAREN_L, item, TokenKind.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  parseArgument(isConst = false) {
    const start = this._lexer.token;
    const name = this.parseName();
    this.expectToken(TokenKind.COLON);
    return this.node(start, {
      kind: Kind.ARGUMENT,
      name,
      value: this.parseValueLiteral(isConst)
    });
  }
  parseConstArgument() {
    return this.parseArgument(true);
  }
  // Implements the parsing rules in the Fragments section.
  /**
   * Corresponds to both FragmentSpread and InlineFragment in the spec.
   *
   * FragmentSpread : ... FragmentName Directives?
   *
   * InlineFragment : ... TypeCondition? Directives? SelectionSet
   */
  parseFragment() {
    const start = this._lexer.token;
    this.expectToken(TokenKind.SPREAD);
    const hasTypeCondition = this.expectOptionalKeyword("on");
    if (!hasTypeCondition && this.peek(TokenKind.NAME)) {
      return this.node(start, {
        kind: Kind.FRAGMENT_SPREAD,
        name: this.parseFragmentName(),
        directives: this.parseDirectives(false)
      });
    }
    return this.node(start, {
      kind: Kind.INLINE_FRAGMENT,
      typeCondition: hasTypeCondition ? this.parseNamedType() : void 0,
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * FragmentDefinition :
   *   - fragment FragmentName on TypeCondition Directives? SelectionSet
   *
   * TypeCondition : NamedType
   */
  parseFragmentDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("fragment");
    if (this._options.allowLegacyFragmentVariables === true) {
      return this.node(start, {
        kind: Kind.FRAGMENT_DEFINITION,
        description,
        name: this.parseFragmentName(),
        variableDefinitions: this.parseVariableDefinitions(),
        typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
        directives: this.parseDirectives(false),
        selectionSet: this.parseSelectionSet()
      });
    }
    return this.node(start, {
      kind: Kind.FRAGMENT_DEFINITION,
      description,
      name: this.parseFragmentName(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * FragmentName : Name but not `on`
   */
  parseFragmentName() {
    if (this._lexer.token.value === "on") {
      throw this.unexpected();
    }
    return this.parseName();
  }
  // Implements the parsing rules in the Values section.
  /**
   * Value[Const] :
   *   - [~Const] Variable
   *   - IntValue
   *   - FloatValue
   *   - StringValue
   *   - BooleanValue
   *   - NullValue
   *   - EnumValue
   *   - ListValue[?Const]
   *   - ObjectValue[?Const]
   *
   * BooleanValue : one of `true` `false`
   *
   * NullValue : `null`
   *
   * EnumValue : Name but not `true`, `false` or `null`
   */
  parseValueLiteral(isConst) {
    const token = this._lexer.token;
    switch (token.kind) {
      case TokenKind.BRACKET_L:
        return this.parseList(isConst);
      case TokenKind.BRACE_L:
        return this.parseObject(isConst);
      case TokenKind.INT:
        this.advanceLexer();
        return this.node(token, {
          kind: Kind.INT,
          value: token.value
        });
      case TokenKind.FLOAT:
        this.advanceLexer();
        return this.node(token, {
          kind: Kind.FLOAT,
          value: token.value
        });
      case TokenKind.STRING:
      case TokenKind.BLOCK_STRING:
        return this.parseStringLiteral();
      case TokenKind.NAME:
        this.advanceLexer();
        switch (token.value) {
          case "true":
            return this.node(token, {
              kind: Kind.BOOLEAN,
              value: true
            });
          case "false":
            return this.node(token, {
              kind: Kind.BOOLEAN,
              value: false
            });
          case "null":
            return this.node(token, {
              kind: Kind.NULL
            });
          default:
            return this.node(token, {
              kind: Kind.ENUM,
              value: token.value
            });
        }
      case TokenKind.DOLLAR:
        if (isConst) {
          this.expectToken(TokenKind.DOLLAR);
          if (this._lexer.token.kind === TokenKind.NAME) {
            const varName = this._lexer.token.value;
            throw syntaxError(
              this._lexer.source,
              token.start,
              `Unexpected variable "$${varName}" in constant value.`
            );
          } else {
            throw this.unexpected(token);
          }
        }
        return this.parseVariable();
      default:
        throw this.unexpected();
    }
  }
  parseConstValueLiteral() {
    return this.parseValueLiteral(true);
  }
  parseStringLiteral() {
    const token = this._lexer.token;
    this.advanceLexer();
    return this.node(token, {
      kind: Kind.STRING,
      value: token.value,
      block: token.kind === TokenKind.BLOCK_STRING
    });
  }
  /**
   * ListValue[Const] :
   *   - [ ]
   *   - [ Value[?Const]+ ]
   */
  parseList(isConst) {
    const item = () => this.parseValueLiteral(isConst);
    return this.node(this._lexer.token, {
      kind: Kind.LIST,
      values: this.any(TokenKind.BRACKET_L, item, TokenKind.BRACKET_R)
    });
  }
  /**
   * ```
   * ObjectValue[Const] :
   *   - { }
   *   - { ObjectField[?Const]+ }
   * ```
   */
  parseObject(isConst) {
    const item = () => this.parseObjectField(isConst);
    return this.node(this._lexer.token, {
      kind: Kind.OBJECT,
      fields: this.any(TokenKind.BRACE_L, item, TokenKind.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(isConst) {
    const start = this._lexer.token;
    const name = this.parseName();
    this.expectToken(TokenKind.COLON);
    return this.node(start, {
      kind: Kind.OBJECT_FIELD,
      name,
      value: this.parseValueLiteral(isConst)
    });
  }
  // Implements the parsing rules in the Directives section.
  /**
   * Directives[Const] : Directive[?Const]+
   */
  parseDirectives(isConst) {
    const directives = [];
    while (this.peek(TokenKind.AT)) {
      directives.push(this.parseDirective(isConst));
    }
    return directives;
  }
  parseConstDirectives() {
    return this.parseDirectives(true);
  }
  /**
   * ```
   * Directive[Const] : @ Name Arguments[?Const]?
   * ```
   */
  parseDirective(isConst) {
    const start = this._lexer.token;
    this.expectToken(TokenKind.AT);
    return this.node(start, {
      kind: Kind.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(isConst)
    });
  }
  // Implements the parsing rules in the Types section.
  /**
   * Type :
   *   - NamedType
   *   - ListType
   *   - NonNullType
   */
  parseTypeReference() {
    const start = this._lexer.token;
    let type;
    if (this.expectOptionalToken(TokenKind.BRACKET_L)) {
      const innerType = this.parseTypeReference();
      this.expectToken(TokenKind.BRACKET_R);
      type = this.node(start, {
        kind: Kind.LIST_TYPE,
        type: innerType
      });
    } else {
      type = this.parseNamedType();
    }
    if (this.expectOptionalToken(TokenKind.BANG)) {
      return this.node(start, {
        kind: Kind.NON_NULL_TYPE,
        type
      });
    }
    return type;
  }
  /**
   * NamedType : Name
   */
  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: Kind.NAMED_TYPE,
      name: this.parseName()
    });
  }
  // Implements the parsing rules in the Type Definition section.
  peekDescription() {
    return this.peek(TokenKind.STRING) || this.peek(TokenKind.BLOCK_STRING);
  }
  /**
   * Description : StringValue
   */
  parseDescription() {
    if (this.peekDescription()) {
      return this.parseStringLiteral();
    }
  }
  /**
   * ```
   * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
   * ```
   */
  parseSchemaDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("schema");
    const directives = this.parseConstDirectives();
    const operationTypes = this.many(
      TokenKind.BRACE_L,
      this.parseOperationTypeDefinition,
      TokenKind.BRACE_R
    );
    return this.node(start, {
      kind: Kind.SCHEMA_DEFINITION,
      description,
      directives,
      operationTypes
    });
  }
  /**
   * OperationTypeDefinition : OperationType : NamedType
   */
  parseOperationTypeDefinition() {
    const start = this._lexer.token;
    const operation = this.parseOperationType();
    this.expectToken(TokenKind.COLON);
    const type = this.parseNamedType();
    return this.node(start, {
      kind: Kind.OPERATION_TYPE_DEFINITION,
      operation,
      type
    });
  }
  /**
   * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
   */
  parseScalarTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("scalar");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.SCALAR_TYPE_DEFINITION,
      description,
      name,
      directives
    });
  }
  /**
   * ObjectTypeDefinition :
   *   Description?
   *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
   */
  parseObjectTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("type");
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();
    return this.node(start, {
      kind: Kind.OBJECT_TYPE_DEFINITION,
      description,
      name,
      interfaces,
      directives,
      fields
    });
  }
  /**
   * ImplementsInterfaces :
   *   - implements `&`? NamedType
   *   - ImplementsInterfaces & NamedType
   */
  parseImplementsInterfaces() {
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(TokenKind.AMP, this.parseNamedType) : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */
  parseFieldsDefinition() {
    return this.optionalMany(
      TokenKind.BRACE_L,
      this.parseFieldDefinition,
      TokenKind.BRACE_R
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  parseFieldDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseName();
    const args = this.parseArgumentDefs();
    this.expectToken(TokenKind.COLON);
    const type = this.parseTypeReference();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.FIELD_DEFINITION,
      description,
      name,
      arguments: args,
      type,
      directives
    });
  }
  /**
   * ArgumentsDefinition : ( InputValueDefinition+ )
   */
  parseArgumentDefs() {
    return this.optionalMany(
      TokenKind.PAREN_L,
      this.parseInputValueDef,
      TokenKind.PAREN_R
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  parseInputValueDef() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseName();
    this.expectToken(TokenKind.COLON);
    const type = this.parseTypeReference();
    let defaultValue;
    if (this.expectOptionalToken(TokenKind.EQUALS)) {
      defaultValue = this.parseConstValueLiteral();
    }
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.INPUT_VALUE_DEFINITION,
      description,
      name,
      type,
      defaultValue,
      directives
    });
  }
  /**
   * InterfaceTypeDefinition :
   *   - Description? interface Name Directives[Const]? FieldsDefinition?
   */
  parseInterfaceTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("interface");
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();
    return this.node(start, {
      kind: Kind.INTERFACE_TYPE_DEFINITION,
      description,
      name,
      interfaces,
      directives,
      fields
    });
  }
  /**
   * UnionTypeDefinition :
   *   - Description? union Name Directives[Const]? UnionMemberTypes?
   */
  parseUnionTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("union");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const types = this.parseUnionMemberTypes();
    return this.node(start, {
      kind: Kind.UNION_TYPE_DEFINITION,
      description,
      name,
      directives,
      types
    });
  }
  /**
   * UnionMemberTypes :
   *   - = `|`? NamedType
   *   - UnionMemberTypes | NamedType
   */
  parseUnionMemberTypes() {
    return this.expectOptionalToken(TokenKind.EQUALS) ? this.delimitedMany(TokenKind.PIPE, this.parseNamedType) : [];
  }
  /**
   * EnumTypeDefinition :
   *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
   */
  parseEnumTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("enum");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const values = this.parseEnumValuesDefinition();
    return this.node(start, {
      kind: Kind.ENUM_TYPE_DEFINITION,
      description,
      name,
      directives,
      values
    });
  }
  /**
   * ```
   * EnumValuesDefinition : { EnumValueDefinition+ }
   * ```
   */
  parseEnumValuesDefinition() {
    return this.optionalMany(
      TokenKind.BRACE_L,
      this.parseEnumValueDefinition,
      TokenKind.BRACE_R
    );
  }
  /**
   * EnumValueDefinition : Description? EnumValue Directives[Const]?
   */
  parseEnumValueDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseEnumValueName();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.ENUM_VALUE_DEFINITION,
      description,
      name,
      directives
    });
  }
  /**
   * EnumValue : Name but not `true`, `false` or `null`
   */
  parseEnumValueName() {
    if (this._lexer.token.value === "true" || this._lexer.token.value === "false" || this._lexer.token.value === "null") {
      throw syntaxError(
        this._lexer.source,
        this._lexer.token.start,
        `${getTokenDesc(
          this._lexer.token
        )} is reserved and cannot be used for an enum value.`
      );
    }
    return this.parseName();
  }
  /**
   * InputObjectTypeDefinition :
   *   - Description? input Name Directives[Const]? InputFieldsDefinition?
   */
  parseInputObjectTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("input");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const fields = this.parseInputFieldsDefinition();
    return this.node(start, {
      kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
      description,
      name,
      directives,
      fields
    });
  }
  /**
   * ```
   * InputFieldsDefinition : { InputValueDefinition+ }
   * ```
   */
  parseInputFieldsDefinition() {
    return this.optionalMany(
      TokenKind.BRACE_L,
      this.parseInputValueDef,
      TokenKind.BRACE_R
    );
  }
  /**
   * TypeSystemExtension :
   *   - SchemaExtension
   *   - TypeExtension
   *
   * TypeExtension :
   *   - ScalarTypeExtension
   *   - ObjectTypeExtension
   *   - InterfaceTypeExtension
   *   - UnionTypeExtension
   *   - EnumTypeExtension
   *   - InputObjectTypeDefinition
   */
  parseTypeSystemExtension() {
    const keywordToken = this._lexer.lookahead();
    if (keywordToken.kind === TokenKind.NAME) {
      switch (keywordToken.value) {
        case "schema":
          return this.parseSchemaExtension();
        case "scalar":
          return this.parseScalarTypeExtension();
        case "type":
          return this.parseObjectTypeExtension();
        case "interface":
          return this.parseInterfaceTypeExtension();
        case "union":
          return this.parseUnionTypeExtension();
        case "enum":
          return this.parseEnumTypeExtension();
        case "input":
          return this.parseInputObjectTypeExtension();
      }
    }
    throw this.unexpected(keywordToken);
  }
  /**
   * ```
   * SchemaExtension :
   *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
   *  - extend schema Directives[Const]
   * ```
   */
  parseSchemaExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("schema");
    const directives = this.parseConstDirectives();
    const operationTypes = this.optionalMany(
      TokenKind.BRACE_L,
      this.parseOperationTypeDefinition,
      TokenKind.BRACE_R
    );
    if (directives.length === 0 && operationTypes.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.SCHEMA_EXTENSION,
      directives,
      operationTypes
    });
  }
  /**
   * ScalarTypeExtension :
   *   - extend scalar Name Directives[Const]
   */
  parseScalarTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("scalar");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    if (directives.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.SCALAR_TYPE_EXTENSION,
      name,
      directives
    });
  }
  /**
   * ObjectTypeExtension :
   *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend type Name ImplementsInterfaces? Directives[Const]
   *  - extend type Name ImplementsInterfaces
   */
  parseObjectTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("type");
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();
    if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.OBJECT_TYPE_EXTENSION,
      name,
      interfaces,
      directives,
      fields
    });
  }
  /**
   * InterfaceTypeExtension :
   *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend interface Name ImplementsInterfaces? Directives[Const]
   *  - extend interface Name ImplementsInterfaces
   */
  parseInterfaceTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("interface");
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();
    if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.INTERFACE_TYPE_EXTENSION,
      name,
      interfaces,
      directives,
      fields
    });
  }
  /**
   * UnionTypeExtension :
   *   - extend union Name Directives[Const]? UnionMemberTypes
   *   - extend union Name Directives[Const]
   */
  parseUnionTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("union");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const types = this.parseUnionMemberTypes();
    if (directives.length === 0 && types.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.UNION_TYPE_EXTENSION,
      name,
      directives,
      types
    });
  }
  /**
   * EnumTypeExtension :
   *   - extend enum Name Directives[Const]? EnumValuesDefinition
   *   - extend enum Name Directives[Const]
   */
  parseEnumTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("enum");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const values = this.parseEnumValuesDefinition();
    if (directives.length === 0 && values.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.ENUM_TYPE_EXTENSION,
      name,
      directives,
      values
    });
  }
  /**
   * InputObjectTypeExtension :
   *   - extend input Name Directives[Const]? InputFieldsDefinition
   *   - extend input Name Directives[Const]
   */
  parseInputObjectTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("input");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const fields = this.parseInputFieldsDefinition();
    if (directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
      name,
      directives,
      fields
    });
  }
  /**
   * ```
   * DirectiveDefinition :
   *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
   * ```
   */
  parseDirectiveDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("directive");
    this.expectToken(TokenKind.AT);
    const name = this.parseName();
    const args = this.parseArgumentDefs();
    const repeatable = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    const locations = this.parseDirectiveLocations();
    return this.node(start, {
      kind: Kind.DIRECTIVE_DEFINITION,
      description,
      name,
      arguments: args,
      repeatable,
      locations
    });
  }
  /**
   * DirectiveLocations :
   *   - `|`? DirectiveLocation
   *   - DirectiveLocations | DirectiveLocation
   */
  parseDirectiveLocations() {
    return this.delimitedMany(TokenKind.PIPE, this.parseDirectiveLocation);
  }
  /*
   * DirectiveLocation :
   *   - ExecutableDirectiveLocation
   *   - TypeSystemDirectiveLocation
   *
   * ExecutableDirectiveLocation : one of
   *   `QUERY`
   *   `MUTATION`
   *   `SUBSCRIPTION`
   *   `FIELD`
   *   `FRAGMENT_DEFINITION`
   *   `FRAGMENT_SPREAD`
   *   `INLINE_FRAGMENT`
   *
   * TypeSystemDirectiveLocation : one of
   *   `SCHEMA`
   *   `SCALAR`
   *   `OBJECT`
   *   `FIELD_DEFINITION`
   *   `ARGUMENT_DEFINITION`
   *   `INTERFACE`
   *   `UNION`
   *   `ENUM`
   *   `ENUM_VALUE`
   *   `INPUT_OBJECT`
   *   `INPUT_FIELD_DEFINITION`
   */
  parseDirectiveLocation() {
    const start = this._lexer.token;
    const name = this.parseName();
    if (Object.prototype.hasOwnProperty.call(DirectiveLocation, name.value)) {
      return name;
    }
    throw this.unexpected(start);
  }
  // Schema Coordinates
  /**
   * SchemaCoordinate :
   *   - Name
   *   - Name . Name
   *   - Name . Name ( Name : )
   *   - \@ Name
   *   - \@ Name ( Name : )
   */
  parseSchemaCoordinate() {
    const start = this._lexer.token;
    const ofDirective = this.expectOptionalToken(TokenKind.AT);
    const name = this.parseName();
    let memberName;
    if (!ofDirective && this.expectOptionalToken(TokenKind.DOT)) {
      memberName = this.parseName();
    }
    let argumentName;
    if ((ofDirective || memberName) && this.expectOptionalToken(TokenKind.PAREN_L)) {
      argumentName = this.parseName();
      this.expectToken(TokenKind.COLON);
      this.expectToken(TokenKind.PAREN_R);
    }
    if (ofDirective) {
      if (argumentName) {
        return this.node(start, {
          kind: Kind.DIRECTIVE_ARGUMENT_COORDINATE,
          name,
          argumentName
        });
      }
      return this.node(start, {
        kind: Kind.DIRECTIVE_COORDINATE,
        name
      });
    } else if (memberName) {
      if (argumentName) {
        return this.node(start, {
          kind: Kind.ARGUMENT_COORDINATE,
          name,
          fieldName: memberName,
          argumentName
        });
      }
      return this.node(start, {
        kind: Kind.MEMBER_COORDINATE,
        name,
        memberName
      });
    }
    return this.node(start, {
      kind: Kind.TYPE_COORDINATE,
      name
    });
  }
  // Core parsing utility functions
  /**
   * Returns a node that, if configured to do so, sets a "loc" field as a
   * location object, used to identify the place in the source that created a
   * given parsed object.
   */
  node(startToken, node) {
    if (this._options.noLocation !== true) {
      node.loc = new Location(
        startToken,
        this._lexer.lastToken,
        this._lexer.source
      );
    }
    return node;
  }
  /**
   * Determines if the next token is of a given kind
   */
  peek(kind) {
    return this._lexer.token.kind === kind;
  }
  /**
   * If the next token is of the given kind, return that token after advancing the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  expectToken(kind) {
    const token = this._lexer.token;
    if (token.kind === kind) {
      this.advanceLexer();
      return token;
    }
    throw syntaxError(
      this._lexer.source,
      token.start,
      `Expected ${getTokenKindDesc(kind)}, found ${getTokenDesc(token)}.`
    );
  }
  /**
   * If the next token is of the given kind, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalToken(kind) {
    const token = this._lexer.token;
    if (token.kind === kind) {
      this.advanceLexer();
      return true;
    }
    return false;
  }
  /**
   * If the next token is a given keyword, advance the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  expectKeyword(value) {
    const token = this._lexer.token;
    if (token.kind === TokenKind.NAME && token.value === value) {
      this.advanceLexer();
    } else {
      throw syntaxError(
        this._lexer.source,
        token.start,
        `Expected "${value}", found ${getTokenDesc(token)}.`
      );
    }
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalKeyword(value) {
    const token = this._lexer.token;
    if (token.kind === TokenKind.NAME && token.value === value) {
      this.advanceLexer();
      return true;
    }
    return false;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  unexpected(atToken) {
    const token = atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
    return syntaxError(
      this._lexer.source,
      token.start,
      `Unexpected ${getTokenDesc(token)}.`
    );
  }
  /**
   * Returns a possibly empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  any(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    const nodes = [];
    while (!this.expectOptionalToken(closeKind)) {
      nodes.push(parseFn.call(this));
    }
    return nodes;
  }
  /**
   * Returns a list of parse nodes, determined by the parseFn.
   * It can be empty only if open token is missing otherwise it will always return non-empty list
   * that begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  optionalMany(openKind, parseFn, closeKind) {
    if (this.expectOptionalToken(openKind)) {
      const nodes = [];
      do {
        nodes.push(parseFn.call(this));
      } while (!this.expectOptionalToken(closeKind));
      return nodes;
    }
    return [];
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  many(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    const nodes = [];
    do {
      nodes.push(parseFn.call(this));
    } while (!this.expectOptionalToken(closeKind));
    return nodes;
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
   * Advances the parser to the next lex token after last item in the list.
   */
  delimitedMany(delimiterKind, parseFn) {
    this.expectOptionalToken(delimiterKind);
    const nodes = [];
    do {
      nodes.push(parseFn.call(this));
    } while (this.expectOptionalToken(delimiterKind));
    return nodes;
  }
  advanceLexer() {
    const { maxTokens } = this._options;
    const token = this._lexer.advance();
    if (token.kind !== TokenKind.EOF) {
      ++this._tokenCounter;
      if (maxTokens !== void 0 && this._tokenCounter > maxTokens) {
        throw syntaxError(
          this._lexer.source,
          token.start,
          `Document contains more that ${maxTokens} tokens. Parsing aborted.`
        );
      }
    }
  }
};
function getTokenDesc(token) {
  const value = token.value;
  return getTokenKindDesc(token.kind) + (value != null ? ` "${value}"` : "");
}
function getTokenKindDesc(kind) {
  return isPunctuatorTokenKind(kind) ? `"${kind}"` : kind;
}

// ../../node_modules/graphql/language/printString.mjs
function printString(str) {
  return `"${str.replace(escapedRegExp, escapedReplacer)}"`;
}
var escapedRegExp = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function escapedReplacer(str) {
  return escapeSequences[str.charCodeAt(0)];
}
var escapeSequences = [
  "\\u0000",
  "\\u0001",
  "\\u0002",
  "\\u0003",
  "\\u0004",
  "\\u0005",
  "\\u0006",
  "\\u0007",
  "\\b",
  "\\t",
  "\\n",
  "\\u000B",
  "\\f",
  "\\r",
  "\\u000E",
  "\\u000F",
  "\\u0010",
  "\\u0011",
  "\\u0012",
  "\\u0013",
  "\\u0014",
  "\\u0015",
  "\\u0016",
  "\\u0017",
  "\\u0018",
  "\\u0019",
  "\\u001A",
  "\\u001B",
  "\\u001C",
  "\\u001D",
  "\\u001E",
  "\\u001F",
  "",
  "",
  '\\"',
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 2F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 3F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 4F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\\\",
  "",
  "",
  "",
  // 5F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 6F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\u007F",
  "\\u0080",
  "\\u0081",
  "\\u0082",
  "\\u0083",
  "\\u0084",
  "\\u0085",
  "\\u0086",
  "\\u0087",
  "\\u0088",
  "\\u0089",
  "\\u008A",
  "\\u008B",
  "\\u008C",
  "\\u008D",
  "\\u008E",
  "\\u008F",
  "\\u0090",
  "\\u0091",
  "\\u0092",
  "\\u0093",
  "\\u0094",
  "\\u0095",
  "\\u0096",
  "\\u0097",
  "\\u0098",
  "\\u0099",
  "\\u009A",
  "\\u009B",
  "\\u009C",
  "\\u009D",
  "\\u009E",
  "\\u009F"
];

// ../../node_modules/graphql/language/visitor.mjs
var BREAK = Object.freeze({});
function visit(root, visitor, visitorKeys = QueryDocumentKeys) {
  const enterLeaveMap = /* @__PURE__ */ new Map();
  for (const kind of Object.values(Kind)) {
    enterLeaveMap.set(kind, getEnterLeaveForKind(visitor, kind));
  }
  let stack = void 0;
  let inArray = Array.isArray(root);
  let keys = [root];
  let index = -1;
  let edits = [];
  let node = root;
  let key = void 0;
  let parent = void 0;
  const path3 = [];
  const ancestors = [];
  do {
    index++;
    const isLeaving = index === keys.length;
    const isEdited = isLeaving && edits.length !== 0;
    if (isLeaving) {
      key = ancestors.length === 0 ? void 0 : path3[path3.length - 1];
      node = parent;
      parent = ancestors.pop();
      if (isEdited) {
        if (inArray) {
          node = node.slice();
          let editOffset = 0;
          for (const [editKey, editValue] of edits) {
            const arrayKey = editKey - editOffset;
            if (editValue === null) {
              node.splice(arrayKey, 1);
              editOffset++;
            } else {
              node[arrayKey] = editValue;
            }
          }
        } else {
          node = { ...node };
          for (const [editKey, editValue] of edits) {
            node[editKey] = editValue;
          }
        }
      }
      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else if (parent) {
      key = inArray ? index : keys[index];
      node = parent[key];
      if (node === null || node === void 0) {
        continue;
      }
      path3.push(key);
    }
    let result;
    if (!Array.isArray(node)) {
      var _enterLeaveMap$get, _enterLeaveMap$get2;
      isNode(node) || devAssert(false, `Invalid AST Node: ${inspect(node)}.`);
      const visitFn = isLeaving ? (_enterLeaveMap$get = enterLeaveMap.get(node.kind)) === null || _enterLeaveMap$get === void 0 ? void 0 : _enterLeaveMap$get.leave : (_enterLeaveMap$get2 = enterLeaveMap.get(node.kind)) === null || _enterLeaveMap$get2 === void 0 ? void 0 : _enterLeaveMap$get2.enter;
      result = visitFn === null || visitFn === void 0 ? void 0 : visitFn.call(visitor, node, key, parent, path3, ancestors);
      if (result === BREAK) {
        break;
      }
      if (result === false) {
        if (!isLeaving) {
          path3.pop();
          continue;
        }
      } else if (result !== void 0) {
        edits.push([key, result]);
        if (!isLeaving) {
          if (isNode(result)) {
            node = result;
          } else {
            path3.pop();
            continue;
          }
        }
      }
    }
    if (result === void 0 && isEdited) {
      edits.push([key, node]);
    }
    if (isLeaving) {
      path3.pop();
    } else {
      var _node$kind;
      stack = {
        inArray,
        index,
        keys,
        edits,
        prev: stack
      };
      inArray = Array.isArray(node);
      keys = inArray ? node : (_node$kind = visitorKeys[node.kind]) !== null && _node$kind !== void 0 ? _node$kind : [];
      index = -1;
      edits = [];
      if (parent) {
        ancestors.push(parent);
      }
      parent = node;
    }
  } while (stack !== void 0);
  if (edits.length !== 0) {
    return edits[edits.length - 1][1];
  }
  return root;
}
function getEnterLeaveForKind(visitor, kind) {
  const kindVisitor = visitor[kind];
  if (typeof kindVisitor === "object") {
    return kindVisitor;
  } else if (typeof kindVisitor === "function") {
    return {
      enter: kindVisitor,
      leave: void 0
    };
  }
  return {
    enter: visitor.enter,
    leave: visitor.leave
  };
}

// ../../node_modules/graphql/language/printer.mjs
function print(ast) {
  return visit(ast, printDocASTReducer);
}
var MAX_LINE_LENGTH = 80;
var printDocASTReducer = {
  Name: {
    leave: (node) => node.value
  },
  Variable: {
    leave: (node) => "$" + node.name
  },
  // Document
  Document: {
    leave: (node) => join(node.definitions, "\n\n")
  },
  OperationDefinition: {
    leave(node) {
      const varDefs = hasMultilineItems(node.variableDefinitions) ? wrap("(\n", join(node.variableDefinitions, "\n"), "\n)") : wrap("(", join(node.variableDefinitions, ", "), ")");
      const prefix = wrap("", node.description, "\n") + join(
        [
          node.operation,
          join([node.name, varDefs]),
          join(node.directives, " ")
        ],
        " "
      );
      return (prefix === "query" ? "" : prefix + " ") + node.selectionSet;
    }
  },
  VariableDefinition: {
    leave: ({ variable, type, defaultValue, directives, description }) => wrap("", description, "\n") + variable + ": " + type + wrap(" = ", defaultValue) + wrap(" ", join(directives, " "))
  },
  SelectionSet: {
    leave: ({ selections }) => block(selections)
  },
  Field: {
    leave({ alias, name, arguments: args, directives, selectionSet }) {
      const prefix = wrap("", alias, ": ") + name;
      let argsLine = prefix + wrap("(", join(args, ", "), ")");
      if (argsLine.length > MAX_LINE_LENGTH) {
        argsLine = prefix + wrap("(\n", indent(join(args, "\n")), "\n)");
      }
      return join([argsLine, join(directives, " "), selectionSet], " ");
    }
  },
  Argument: {
    leave: ({ name, value }) => name + ": " + value
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name, directives }) => "..." + name + wrap(" ", join(directives, " "))
  },
  InlineFragment: {
    leave: ({ typeCondition, directives, selectionSet }) => join(
      [
        "...",
        wrap("on ", typeCondition),
        join(directives, " "),
        selectionSet
      ],
      " "
    )
  },
  FragmentDefinition: {
    leave: ({
      name,
      typeCondition,
      variableDefinitions,
      directives,
      selectionSet,
      description
    }) => wrap("", description, "\n") + // Note: fragment variable definitions are experimental and may be changed
    // or removed in the future.
    `fragment ${name}${wrap("(", join(variableDefinitions, ", "), ")")} on ${typeCondition} ${wrap("", join(directives, " "), " ")}` + selectionSet
  },
  // Value
  IntValue: {
    leave: ({ value }) => value
  },
  FloatValue: {
    leave: ({ value }) => value
  },
  StringValue: {
    leave: ({ value, block: isBlockString }) => isBlockString ? printBlockString(value) : printString(value)
  },
  BooleanValue: {
    leave: ({ value }) => value ? "true" : "false"
  },
  NullValue: {
    leave: () => "null"
  },
  EnumValue: {
    leave: ({ value }) => value
  },
  ListValue: {
    leave: ({ values }) => "[" + join(values, ", ") + "]"
  },
  ObjectValue: {
    leave: ({ fields }) => "{" + join(fields, ", ") + "}"
  },
  ObjectField: {
    leave: ({ name, value }) => name + ": " + value
  },
  // Directive
  Directive: {
    leave: ({ name, arguments: args }) => "@" + name + wrap("(", join(args, ", "), ")")
  },
  // Type
  NamedType: {
    leave: ({ name }) => name
  },
  ListType: {
    leave: ({ type }) => "[" + type + "]"
  },
  NonNullType: {
    leave: ({ type }) => type + "!"
  },
  // Type System Definitions
  SchemaDefinition: {
    leave: ({ description, directives, operationTypes }) => wrap("", description, "\n") + join(["schema", join(directives, " "), block(operationTypes)], " ")
  },
  OperationTypeDefinition: {
    leave: ({ operation, type }) => operation + ": " + type
  },
  ScalarTypeDefinition: {
    leave: ({ description, name, directives }) => wrap("", description, "\n") + join(["scalar", name, join(directives, " ")], " ")
  },
  ObjectTypeDefinition: {
    leave: ({ description, name, interfaces, directives, fields }) => wrap("", description, "\n") + join(
      [
        "type",
        name,
        wrap("implements ", join(interfaces, " & ")),
        join(directives, " "),
        block(fields)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description, name, arguments: args, type, directives }) => wrap("", description, "\n") + name + (hasMultilineItems(args) ? wrap("(\n", indent(join(args, "\n")), "\n)") : wrap("(", join(args, ", "), ")")) + ": " + type + wrap(" ", join(directives, " "))
  },
  InputValueDefinition: {
    leave: ({ description, name, type, defaultValue, directives }) => wrap("", description, "\n") + join(
      [name + ": " + type, wrap("= ", defaultValue), join(directives, " ")],
      " "
    )
  },
  InterfaceTypeDefinition: {
    leave: ({ description, name, interfaces, directives, fields }) => wrap("", description, "\n") + join(
      [
        "interface",
        name,
        wrap("implements ", join(interfaces, " & ")),
        join(directives, " "),
        block(fields)
      ],
      " "
    )
  },
  UnionTypeDefinition: {
    leave: ({ description, name, directives, types }) => wrap("", description, "\n") + join(
      ["union", name, join(directives, " "), wrap("= ", join(types, " | "))],
      " "
    )
  },
  EnumTypeDefinition: {
    leave: ({ description, name, directives, values }) => wrap("", description, "\n") + join(["enum", name, join(directives, " "), block(values)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description, name, directives }) => wrap("", description, "\n") + join([name, join(directives, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description, name, directives, fields }) => wrap("", description, "\n") + join(["input", name, join(directives, " "), block(fields)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description, name, arguments: args, repeatable, locations }) => wrap("", description, "\n") + "directive @" + name + (hasMultilineItems(args) ? wrap("(\n", indent(join(args, "\n")), "\n)") : wrap("(", join(args, ", "), ")")) + (repeatable ? " repeatable" : "") + " on " + join(locations, " | ")
  },
  SchemaExtension: {
    leave: ({ directives, operationTypes }) => join(
      ["extend schema", join(directives, " "), block(operationTypes)],
      " "
    )
  },
  ScalarTypeExtension: {
    leave: ({ name, directives }) => join(["extend scalar", name, join(directives, " ")], " ")
  },
  ObjectTypeExtension: {
    leave: ({ name, interfaces, directives, fields }) => join(
      [
        "extend type",
        name,
        wrap("implements ", join(interfaces, " & ")),
        join(directives, " "),
        block(fields)
      ],
      " "
    )
  },
  InterfaceTypeExtension: {
    leave: ({ name, interfaces, directives, fields }) => join(
      [
        "extend interface",
        name,
        wrap("implements ", join(interfaces, " & ")),
        join(directives, " "),
        block(fields)
      ],
      " "
    )
  },
  UnionTypeExtension: {
    leave: ({ name, directives, types }) => join(
      [
        "extend union",
        name,
        join(directives, " "),
        wrap("= ", join(types, " | "))
      ],
      " "
    )
  },
  EnumTypeExtension: {
    leave: ({ name, directives, values }) => join(["extend enum", name, join(directives, " "), block(values)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name, directives, fields }) => join(["extend input", name, join(directives, " "), block(fields)], " ")
  },
  // Schema Coordinates
  TypeCoordinate: {
    leave: ({ name }) => name
  },
  MemberCoordinate: {
    leave: ({ name, memberName }) => join([name, wrap(".", memberName)])
  },
  ArgumentCoordinate: {
    leave: ({ name, fieldName, argumentName }) => join([name, wrap(".", fieldName), wrap("(", argumentName, ":)")])
  },
  DirectiveCoordinate: {
    leave: ({ name }) => join(["@", name])
  },
  DirectiveArgumentCoordinate: {
    leave: ({ name, argumentName }) => join(["@", name, wrap("(", argumentName, ":)")])
  }
};
function join(maybeArray, separator = "") {
  var _maybeArray$filter$jo;
  return (_maybeArray$filter$jo = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.filter((x) => x).join(separator)) !== null && _maybeArray$filter$jo !== void 0 ? _maybeArray$filter$jo : "";
}
function block(array) {
  return wrap("{\n", indent(join(array, "\n")), "\n}");
}
function wrap(start, maybeString, end = "") {
  return maybeString != null && maybeString !== "" ? start + maybeString + end : "";
}
function indent(str) {
  return wrap("  ", str.replace(/\n/g, "\n  "));
}
function hasMultilineItems(maybeArray) {
  var _maybeArray$some;
  return (_maybeArray$some = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.some((str) => str.includes("\n"))) !== null && _maybeArray$some !== void 0 ? _maybeArray$some : false;
}

// ../../node_modules/graphql-request/build/lib/http.js
var ACCEPT_HEADER = `Accept`;
var CONTENT_TYPE_HEADER = `Content-Type`;
var CONTENT_TYPE_JSON = `application/json`;
var CONTENT_TYPE_GQL = `application/graphql-response+json`;

// ../../node_modules/graphql-request/build/legacy/lib/graphql.js
var cleanQuery = (str) => str.replace(/([\s,]|#[^\n\r]+)+/g, ` `).trim();
var isGraphQLContentType = (contentType) => {
  const contentTypeLower = contentType.toLowerCase();
  return contentTypeLower.includes(CONTENT_TYPE_GQL) || contentTypeLower.includes(CONTENT_TYPE_JSON);
};
var parseGraphQLExecutionResult = (result) => {
  try {
    if (Array.isArray(result)) {
      return {
        _tag: `Batch`,
        executionResults: result.map(parseExecutionResult)
      };
    } else if (isPlainObject(result)) {
      return {
        _tag: `Single`,
        executionResult: parseExecutionResult(result)
      };
    } else {
      throw new Error(`Invalid execution result: result is not object or array. 
Got:
${String(result)}`);
    }
  } catch (e) {
    return e;
  }
};
var parseExecutionResult = (result) => {
  if (typeof result !== `object` || result === null) {
    throw new Error(`Invalid execution result: result is not object`);
  }
  let errors = void 0;
  let data = void 0;
  let extensions = void 0;
  if (`errors` in result) {
    if (!isPlainObject(result.errors) && !Array.isArray(result.errors)) {
      throw new Error(`Invalid execution result: errors is not plain object OR array`);
    }
    errors = result.errors;
  }
  if (`data` in result) {
    if (!isPlainObject(result.data) && result.data !== null) {
      throw new Error(`Invalid execution result: data is not plain object`);
    }
    data = result.data;
  }
  if (`extensions` in result) {
    if (!isPlainObject(result.extensions))
      throw new Error(`Invalid execution result: extensions is not plain object`);
    extensions = result.extensions;
  }
  return {
    data,
    errors,
    extensions
  };
};
var isRequestResultHaveErrors = (result) => result._tag === `Batch` ? result.executionResults.some(isExecutionResultHaveErrors) : isExecutionResultHaveErrors(result.executionResult);
var isExecutionResultHaveErrors = (result) => Array.isArray(result.errors) ? result.errors.length > 0 : Boolean(result.errors);
var isOperationDefinitionNode = (definition) => {
  return typeof definition === `object` && definition !== null && `kind` in definition && definition.kind === Kind.OPERATION_DEFINITION;
};

// ../../node_modules/graphql-request/build/legacy/helpers/analyzeDocument.js
var extractOperationName = (document) => {
  let operationName = void 0;
  const defs = document.definitions.filter(isOperationDefinitionNode);
  if (defs.length === 1) {
    operationName = defs[0].name?.value;
  }
  return operationName;
};
var extractIsMutation = (document) => {
  let isMutation = false;
  const defs = document.definitions.filter(isOperationDefinitionNode);
  if (defs.length === 1) {
    isMutation = defs[0].operation === `mutation`;
  }
  return isMutation;
};
var analyzeDocument = (document, excludeOperationName) => {
  const normalizedDocument = typeof document === `string` || `kind` in document ? document : String(document);
  const expression = typeof normalizedDocument === `string` ? normalizedDocument : print(normalizedDocument);
  let isMutation = false;
  let operationName = void 0;
  if (excludeOperationName) {
    return { expression, isMutation, operationName };
  }
  const docNode = tryCatch(() => typeof normalizedDocument === `string` ? parse(normalizedDocument) : normalizedDocument);
  if (docNode instanceof Error) {
    return { expression, isMutation, operationName };
  }
  operationName = extractOperationName(docNode);
  isMutation = extractIsMutation(docNode);
  return { expression, operationName, isMutation };
};

// ../../node_modules/graphql-request/build/legacy/helpers/defaultJsonSerializer.js
var defaultJsonSerializer = JSON;

// ../../node_modules/graphql-request/build/legacy/helpers/runRequest.js
var runRequest = async (input) => {
  const config = {
    ...input,
    method: input.request._tag === `Single` ? input.request.document.isMutation ? `POST` : uppercase(input.method ?? `post`) : input.request.hasMutations ? `POST` : uppercase(input.method ?? `post`),
    fetchOptions: {
      ...input.fetchOptions,
      errorPolicy: input.fetchOptions.errorPolicy ?? `none`
    }
  };
  const fetcher = createFetcher(config.method);
  const fetchResponse = await fetcher(config);
  const body = await fetchResponse.text();
  let result;
  try {
    result = parseResultFromText(body, fetchResponse.headers.get(CONTENT_TYPE_HEADER), input.fetchOptions.jsonSerializer ?? defaultJsonSerializer);
  } catch (error) {
    result = error;
  }
  const clientResponseBase = {
    status: fetchResponse.status,
    headers: fetchResponse.headers,
    body
  };
  if (!fetchResponse.ok) {
    if (result instanceof Error) {
      return new ClientError({ ...clientResponseBase }, {
        query: input.request._tag === `Single` ? input.request.document.expression : input.request.query,
        variables: input.request.variables
      });
    }
    const clientResponse = result._tag === `Batch` ? { ...result.executionResults, ...clientResponseBase } : {
      ...result.executionResult,
      ...clientResponseBase
    };
    return new ClientError(clientResponse, {
      query: input.request._tag === `Single` ? input.request.document.expression : input.request.query,
      variables: input.request.variables
    });
  }
  if (result instanceof Error)
    throw result;
  if (isRequestResultHaveErrors(result) && config.fetchOptions.errorPolicy === `none`) {
    const clientResponse = result._tag === `Batch` ? { ...result.executionResults, ...clientResponseBase } : {
      ...result.executionResult,
      ...clientResponseBase
    };
    return new ClientError(clientResponse, {
      query: input.request._tag === `Single` ? input.request.document.expression : input.request.query,
      variables: input.request.variables
    });
  }
  switch (result._tag) {
    case `Single`:
      return {
        ...clientResponseBase,
        ...executionResultClientResponseFields(config)(result.executionResult)
      };
    case `Batch`:
      return {
        ...clientResponseBase,
        data: result.executionResults.map(executionResultClientResponseFields(config))
      };
    default:
      casesExhausted(result);
  }
};
var executionResultClientResponseFields = ($params) => (executionResult) => {
  return {
    extensions: executionResult.extensions,
    data: executionResult.data,
    errors: $params.fetchOptions.errorPolicy === `all` ? executionResult.errors : void 0
  };
};
var parseResultFromText = (text, contentType, jsonSerializer) => {
  if (contentType && isGraphQLContentType(contentType)) {
    return parseGraphQLExecutionResult(jsonSerializer.parse(text));
  } else {
    return parseGraphQLExecutionResult(text);
  }
};
var createFetcher = (method) => async (params) => {
  const headers = new Headers(params.headers);
  let searchParams = null;
  let body = void 0;
  if (!headers.has(ACCEPT_HEADER)) {
    headers.set(ACCEPT_HEADER, [CONTENT_TYPE_GQL, CONTENT_TYPE_JSON].join(`, `));
  }
  if (method === `POST`) {
    const $jsonSerializer = params.fetchOptions.jsonSerializer ?? defaultJsonSerializer;
    body = $jsonSerializer.stringify(buildBody(params));
    if (typeof body === `string` && !headers.has(CONTENT_TYPE_HEADER)) {
      headers.set(CONTENT_TYPE_HEADER, CONTENT_TYPE_JSON);
    }
  } else {
    searchParams = buildQueryParams(params);
  }
  const init = { method, headers, body, ...params.fetchOptions };
  let url = new URL(params.url);
  let initResolved = init;
  if (params.middleware) {
    const result = await Promise.resolve(params.middleware({
      ...init,
      url: params.url,
      operationName: params.request._tag === `Single` ? params.request.document.operationName : void 0,
      variables: params.request.variables
    }));
    const { url: urlNew, ...initNew } = result;
    url = new URL(urlNew);
    initResolved = initNew;
  }
  if (searchParams) {
    searchParams.forEach((value, name) => {
      url.searchParams.append(name, value);
    });
  }
  const $fetch = params.fetch ?? fetch;
  return await $fetch(url, initResolved);
};
var buildBody = (params) => {
  switch (params.request._tag) {
    case `Single`:
      return {
        query: params.request.document.expression,
        variables: params.request.variables,
        operationName: params.request.document.operationName
      };
    case `Batch`:
      return zip(params.request.query, params.request.variables ?? []).map(([query, variables]) => ({
        query,
        variables
      }));
    default:
      throw casesExhausted(params.request);
  }
};
var buildQueryParams = (params) => {
  const $jsonSerializer = params.fetchOptions.jsonSerializer ?? defaultJsonSerializer;
  const searchParams = new URLSearchParams();
  switch (params.request._tag) {
    case `Single`: {
      searchParams.append(`query`, cleanQuery(params.request.document.expression));
      if (params.request.variables) {
        searchParams.append(`variables`, $jsonSerializer.stringify(params.request.variables));
      }
      if (params.request.document.operationName) {
        searchParams.append(`operationName`, params.request.document.operationName);
      }
      return searchParams;
    }
    case `Batch`: {
      const variablesSerialized = params.request.variables?.map((v) => $jsonSerializer.stringify(v)) ?? [];
      const queriesCleaned = params.request.query.map(cleanQuery);
      const payload = zip(queriesCleaned, variablesSerialized).map(([query, variables]) => ({
        query,
        variables
      }));
      searchParams.append(`query`, $jsonSerializer.stringify(payload));
      return searchParams;
    }
    default:
      throw casesExhausted(params.request);
  }
};

// ../../node_modules/graphql-request/build/legacy/classes/GraphQLClient.js
var GraphQLClient = class {
  url;
  requestConfig;
  constructor(url, requestConfig = {}) {
    this.url = url;
    this.requestConfig = requestConfig;
  }
  /**
   * Send a GraphQL query to the server.
   */
  rawRequest = async (...args) => {
    const [queryOrOptions, variables, requestHeaders] = args;
    const rawRequestOptions = parseRawRequestArgs(queryOrOptions, variables, requestHeaders);
    const { headers, fetch: fetch2 = globalThis.fetch, method = `POST`, requestMiddleware, responseMiddleware, excludeOperationName, ...fetchOptions } = this.requestConfig;
    const { url } = this;
    if (rawRequestOptions.signal !== void 0) {
      fetchOptions.signal = rawRequestOptions.signal;
    }
    const document = analyzeDocument(rawRequestOptions.query, excludeOperationName);
    const response = await runRequest({
      url,
      request: {
        _tag: `Single`,
        document,
        variables: rawRequestOptions.variables
      },
      headers: {
        ...HeadersInitToPlainObject(callOrIdentity(headers)),
        ...HeadersInitToPlainObject(rawRequestOptions.requestHeaders)
      },
      fetch: fetch2,
      method,
      fetchOptions,
      middleware: requestMiddleware
    });
    if (responseMiddleware) {
      await responseMiddleware(response, {
        operationName: document.operationName,
        variables,
        url: this.url
      });
    }
    if (response instanceof Error) {
      throw response;
    }
    return response;
  };
  async request(documentOrOptions, ...variablesAndRequestHeaders) {
    const [variables, requestHeaders] = variablesAndRequestHeaders;
    const requestOptions = parseRequestArgs(documentOrOptions, variables, requestHeaders);
    const { headers, fetch: fetch2 = globalThis.fetch, method = `POST`, requestMiddleware, responseMiddleware, excludeOperationName, ...fetchOptions } = this.requestConfig;
    const { url } = this;
    if (requestOptions.signal !== void 0) {
      fetchOptions.signal = requestOptions.signal;
    }
    const analyzedDocument = analyzeDocument(requestOptions.document, excludeOperationName);
    const response = await runRequest({
      url,
      request: {
        _tag: `Single`,
        document: analyzedDocument,
        variables: requestOptions.variables
      },
      headers: {
        ...HeadersInitToPlainObject(callOrIdentity(headers)),
        ...HeadersInitToPlainObject(requestOptions.requestHeaders)
      },
      fetch: fetch2,
      method,
      fetchOptions,
      middleware: requestMiddleware
    });
    if (responseMiddleware) {
      await responseMiddleware(response, {
        operationName: analyzedDocument.operationName,
        variables: requestOptions.variables,
        url: this.url
      });
    }
    if (response instanceof Error) {
      throw response;
    }
    return response.data;
  }
  async batchRequests(documentsOrOptions, requestHeaders) {
    const batchRequestOptions = parseBatchRequestArgs(documentsOrOptions, requestHeaders);
    const { headers, excludeOperationName, ...fetchOptions } = this.requestConfig;
    if (batchRequestOptions.signal !== void 0) {
      fetchOptions.signal = batchRequestOptions.signal;
    }
    const analyzedDocuments = batchRequestOptions.documents.map(({ document }) => analyzeDocument(document, excludeOperationName));
    const expressions = analyzedDocuments.map(({ expression }) => expression);
    const hasMutations = analyzedDocuments.some(({ isMutation }) => isMutation);
    const variables = batchRequestOptions.documents.map(({ variables: variables2 }) => variables2);
    const response = await runRequest({
      url: this.url,
      request: {
        _tag: `Batch`,
        operationName: void 0,
        query: expressions,
        hasMutations,
        variables
      },
      headers: {
        ...HeadersInitToPlainObject(callOrIdentity(headers)),
        ...HeadersInitToPlainObject(batchRequestOptions.requestHeaders)
      },
      fetch: this.requestConfig.fetch ?? globalThis.fetch,
      method: this.requestConfig.method || `POST`,
      fetchOptions,
      middleware: this.requestConfig.requestMiddleware
    });
    if (this.requestConfig.responseMiddleware) {
      await this.requestConfig.responseMiddleware(response, {
        operationName: void 0,
        variables,
        url: this.url
      });
    }
    if (response instanceof Error) {
      throw response;
    }
    return response.data;
  }
  setHeaders(headers) {
    this.requestConfig.headers = headers;
    return this;
  }
  /**
   * Attach a header to the client. All subsequent requests will have this header.
   */
  setHeader(key, value) {
    const { headers } = this.requestConfig;
    if (headers) {
      headers[key] = value;
    } else {
      this.requestConfig.headers = { [key]: value };
    }
    return this;
  }
  /**
   * Change the client endpoint. All subsequent requests will send to this endpoint.
   */
  setEndpoint(value) {
    this.url = value;
    return this;
  }
};

// ../../node_modules/graphql-request/build/legacy/functions/request.js
var parseRequestArgs = (documentOrOptions, variables, requestHeaders) => {
  return documentOrOptions.document ? documentOrOptions : {
    document: documentOrOptions,
    variables,
    requestHeaders,
    signal: void 0
  };
};

// ../../node_modules/graphql-request/build/legacy/functions/gql.js
var gql = (chunks, ...variables) => {
  return chunks.reduce((acc, chunk, index) => `${acc}${chunk}${index in variables ? String(variables[index]) : ``}`, ``);
};

// src/fetcher.ts
var import_dotenv = __toESM(require_main(), 1);
import_dotenv.default.config();
var endpoint = "https://api.github.com/graphql";
async function fetchGitHubData(username, token) {
  const ghToken = token || process.env.GITHUB_TOKEN;
  if (!ghToken) {
    throw new Error("GitHub Token is required. Please provide it via argument or GITHUB_TOKEN environment variable.");
  }
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${ghToken}`
    }
  });
  const query = gql`
    query userInfo($login: String!) {
      user(login: $login) {
        name
        followers {
          totalCount
        }
        contributionsCollection {
          totalCommitContributions
        }
        repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: PUSHED_AT, direction: DESC}) {
          nodes {
            stargazerCount
            languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
              edges {
                size
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
    `;
  const data = await graphQLClient.request(query, { login: username });
  const totalStars = data.user.repositories.nodes.reduce((sum, repo) => sum + repo.stargazerCount, 0);
  const languageMap = /* @__PURE__ */ new Map();
  for (const repo of data.user.repositories.nodes) {
    for (const edge of repo.languages.edges) {
      const current = languageMap.get(edge.node.name) ?? 0;
      languageMap.set(edge.node.name, current + edge.size);
    }
  }
  const totalSize = Array.from(languageMap.values()).reduce((a, b) => a + b, 0);
  const topLanguages = Array.from(languageMap.entries()).sort((a, b) => b[1] - a[1]).map(([name, size]) => ({
    name,
    size,
    percentage: totalSize > 0 ? size / totalSize * 100 : 0
  }));
  const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public`, {
    headers: {
      authorization: `Bearer ${ghToken}`
    }
  });
  const eventsData = await eventsResponse.json();
  const recentEvents = (eventsData || []).slice(0, 10).map((event) => ({
    type: event.type.replace("Event", ""),
    repo: event.repo.name,
    date: event.created_at
  }));
  return {
    name: data.user.name,
    totalCommits: data.user.contributionsCollection.totalCommitContributions,
    totalStars,
    followers: data.user.followers.totalCount,
    topLanguages,
    recentEvents
  };
}

// ../../node_modules/figlet/dist/node-figlet.mjs
var fs2 = __toESM(require("fs"), 1);
var path2 = __toESM(require("path"), 1);

// ../../node_modules/figlet/dist/figlet.mjs
var LAYOUT = {
  FULL_WIDTH: 0,
  FITTING: 1,
  SMUSHING: 2,
  CONTROLLED_SMUSHING: 3
};
var FigletFont = class {
  constructor() {
    this.comment = "";
    this.numChars = 0;
    this.options = {};
  }
};
var fontList = [
  "1Row",
  "3-D",
  "3D Diagonal",
  "3D-ASCII",
  "3x5",
  "4Max",
  "5 Line Oblique",
  "AMC 3 Line",
  "AMC 3 Liv1",
  "AMC AAA01",
  "AMC Neko",
  "AMC Razor",
  "AMC Razor2",
  "AMC Slash",
  "AMC Slider",
  "AMC Thin",
  "AMC Tubes",
  "AMC Untitled",
  "ANSI Regular",
  "ANSI Shadow",
  "ANSI-Compact",
  "ASCII 12",
  "ASCII 9",
  "ASCII New Roman",
  "Acrobatic",
  "Alligator",
  "Alligator2",
  "Alpha",
  "Alphabet",
  "Arrows",
  "Avatar",
  "B1FF",
  "Babyface Lame",
  "Babyface Leet",
  "Banner",
  "Banner3-D",
  "Banner3",
  "Banner4",
  "Barbwire",
  "Basic",
  "Bear",
  "Bell",
  "Benjamin",
  "Big ASCII 12",
  "Big ASCII 9",
  "Big Chief",
  "Big Money-ne",
  "Big Money-nw",
  "Big Money-se",
  "Big Money-sw",
  "Big Mono 12",
  "Big Mono 9",
  "Big",
  "Bigfig",
  "Binary",
  "Block",
  "Blocks",
  "Bloody",
  "BlurVision ASCII",
  "Bolger",
  "Braced",
  "Bright",
  "Broadway KB",
  "Broadway",
  "Bubble",
  "Bulbhead",
  "Caligraphy",
  "Caligraphy2",
  "Calvin S",
  "Cards",
  "Catwalk",
  "Chiseled",
  "Chunky",
  "Circle",
  "Coinstak",
  "Cola",
  "Colossal",
  "Computer",
  "Contessa",
  "Contrast",
  "Cosmike",
  "Cosmike2",
  "Crawford",
  "Crawford2",
  "Crazy",
  "Cricket",
  "Cursive",
  "Cyberlarge",
  "Cybermedium",
  "Cybersmall",
  "Cygnet",
  "DANC4",
  "DOS Rebel",
  "DWhistled",
  "Dancing Font",
  "Decimal",
  "Def Leppard",
  "Delta Corps Priest 1",
  "DiamFont",
  "Diamond",
  "Diet Cola",
  "Digital",
  "Doh",
  "Doom",
  "Dot Matrix",
  "Double Shorts",
  "Double",
  "Dr Pepper",
  "Efti Chess",
  "Efti Font",
  "Efti Italic",
  "Efti Piti",
  "Efti Robot",
  "Efti Wall",
  "Efti Water",
  "Electronic",
  "Elite",
  "Emboss 2",
  "Emboss",
  "Epic",
  "Fender",
  "Filter",
  "Fire Font-k",
  "Fire Font-s",
  "Flipped",
  "Flower Power",
  "Four Tops",
  "Fraktur",
  "Fun Face",
  "Fun Faces",
  "Future",
  "Fuzzy",
  "Georgi16",
  "Georgia11",
  "Ghost",
  "Ghoulish",
  "Glenyn",
  "Goofy",
  "Gothic",
  "Graceful",
  "Gradient",
  "Graffiti",
  "Greek",
  "Heart Left",
  "Heart Right",
  "Henry 3D",
  "Hex",
  "Hieroglyphs",
  "Hollywood",
  "Horizontal Left",
  "Horizontal Right",
  "ICL-1900",
  "Impossible",
  "Invita",
  "Isometric1",
  "Isometric2",
  "Isometric3",
  "Isometric4",
  "Italic",
  "Ivrit",
  "JS Block Letters",
  "JS Bracket Letters",
  "JS Capital Curves",
  "JS Cursive",
  "JS Stick Letters",
  "Jacky",
  "Jazmine",
  "Jerusalem",
  "Katakana",
  "Kban",
  "Keyboard",
  "Knob",
  "Konto Slant",
  "Konto",
  "LCD",
  "Larry 3D 2",
  "Larry 3D",
  "Lean",
  "Letter",
  "Letters",
  "Lil Devil",
  "Line Blocks",
  "Linux",
  "Lockergnome",
  "Madrid",
  "Marquee",
  "Maxfour",
  "Merlin1",
  "Merlin2",
  "Mike",
  "Mini",
  "Mirror",
  "Mnemonic",
  "Modular",
  "Mono 12",
  "Mono 9",
  "Morse",
  "Morse2",
  "Moscow",
  "Mshebrew210",
  "Muzzle",
  "NScript",
  "NT Greek",
  "NV Script",
  "Nancyj-Fancy",
  "Nancyj-Improved",
  "Nancyj-Underlined",
  "Nancyj",
  "Nipples",
  "O8",
  "OS2",
  "Octal",
  "Ogre",
  "Old Banner",
  "Pagga",
  "Patorjk's Cheese",
  "Patorjk-HeX",
  "Pawp",
  "Peaks Slant",
  "Peaks",
  "Pebbles",
  "Pepper",
  "Poison",
  "Puffy",
  "Puzzle",
  "Pyramid",
  "Rammstein",
  "Rebel",
  "Rectangles",
  "Red Phoenix",
  "Relief",
  "Relief2",
  "Reverse",
  "Roman",
  "Rot13",
  "Rotated",
  "Rounded",
  "Rowan Cap",
  "Rozzo",
  "RubiFont",
  "Runic",
  "Runyc",
  "S Blood",
  "SL Script",
  "Santa Clara",
  "Script",
  "Serifcap",
  "Shaded Blocky",
  "Shadow",
  "Shimrod",
  "Short",
  "Slant Relief",
  "Slant",
  "Slide",
  "Small ASCII 12",
  "Small ASCII 9",
  "Small Block",
  "Small Braille",
  "Small Caps",
  "Small Isometric1",
  "Small Keyboard",
  "Small Mono 12",
  "Small Mono 9",
  "Small Poison",
  "Small Script",
  "Small Shadow",
  "Small Slant",
  "Small Tengwar",
  "Small",
  "Soft",
  "Speed",
  "Spliff",
  "Stacey",
  "Stampate",
  "Stampatello",
  "Standard",
  "Star Strips",
  "Star Wars",
  "Stellar",
  "Stforek",
  "Stick Letters",
  "Stop",
  "Straight",
  "Stronger Than All",
  "Sub-Zero",
  "Swamp Land",
  "Swan",
  "Sweet",
  "THIS",
  "Tanja",
  "Tengwar",
  "Term",
  "Terrace",
  "Test1",
  "The Edge",
  "Thick",
  "Thin",
  "Thorned",
  "Three Point",
  "Ticks Slant",
  "Ticks",
  "Tiles",
  "Tinker-Toy",
  "Tmplr",
  "Tombstone",
  "Train",
  "Trek",
  "Tsalagi",
  "Tubular",
  "Twisted",
  "Two Point",
  "USA Flag",
  "Univers",
  "Upside Down Text",
  "Varsity",
  "Wavescape",
  "Wavy",
  "Weird",
  "Wet Letter",
  "Whimsy",
  "WideTerm",
  "Wow",
  "miniwi"
];
function escapeRegExpChar(char) {
  const specialChars = /[.*+?^${}()|[\]\\]/;
  return specialChars.test(char) ? "\\" + char : char;
}
var figlet = (() => {
  const { FULL_WIDTH = 0, FITTING, SMUSHING, CONTROLLED_SMUSHING } = LAYOUT;
  const figFonts = {};
  const figDefaults = {
    font: "Standard",
    fontPath: "./fonts",
    fetchFontIfMissing: true
  };
  function removeEndChar(line, lineNum, fontHeight) {
    const endChar = escapeRegExpChar(line.trim().slice(-1)) || "@";
    const endCharRegEx = lineNum === fontHeight - 1 ? new RegExp(endChar + endChar + "?\\s*$") : new RegExp(endChar + "\\s*$");
    return line.replace(endCharRegEx, "");
  }
  function getSmushingRules(oldLayout = -1, newLayout = null) {
    let rules = {};
    let val;
    let codes = [
      [16384, "vLayout", SMUSHING],
      [8192, "vLayout", FITTING],
      [4096, "vRule5", true],
      [2048, "vRule4", true],
      [1024, "vRule3", true],
      [512, "vRule2", true],
      [256, "vRule1", true],
      [128, "hLayout", SMUSHING],
      [64, "hLayout", FITTING],
      [32, "hRule6", true],
      [16, "hRule5", true],
      [8, "hRule4", true],
      [4, "hRule3", true],
      [2, "hRule2", true],
      [1, "hRule1", true]
    ];
    val = newLayout !== null ? newLayout : oldLayout;
    for (const [code, rule, value] of codes) {
      if (val >= code) {
        val -= code;
        if (rules[rule] === void 0) {
          rules[rule] = value;
        }
      } else if (rule !== "vLayout" && rule !== "hLayout") {
        rules[rule] = false;
      }
    }
    if (typeof rules["hLayout"] === "undefined") {
      if (oldLayout === 0) {
        rules["hLayout"] = FITTING;
      } else if (oldLayout === -1) {
        rules["hLayout"] = FULL_WIDTH;
      } else {
        if (rules["hRule1"] || rules["hRule2"] || rules["hRule3"] || rules["hRule4"] || rules["hRule5"] || rules["hRule6"]) {
          rules["hLayout"] = CONTROLLED_SMUSHING;
        } else {
          rules["hLayout"] = SMUSHING;
        }
      }
    } else if (rules["hLayout"] === SMUSHING) {
      if (rules["hRule1"] || rules["hRule2"] || rules["hRule3"] || rules["hRule4"] || rules["hRule5"] || rules["hRule6"]) {
        rules["hLayout"] = CONTROLLED_SMUSHING;
      }
    }
    if (typeof rules["vLayout"] === "undefined") {
      if (rules["vRule1"] || rules["vRule2"] || rules["vRule3"] || rules["vRule4"] || rules["vRule5"]) {
        rules["vLayout"] = CONTROLLED_SMUSHING;
      } else {
        rules["vLayout"] = FULL_WIDTH;
      }
    } else if (rules["vLayout"] === SMUSHING) {
      if (rules["vRule1"] || rules["vRule2"] || rules["vRule3"] || rules["vRule4"] || rules["vRule5"]) {
        rules["vLayout"] = CONTROLLED_SMUSHING;
      }
    }
    return rules;
  }
  function hRule1_Smush(ch1, ch2, hardBlank = "") {
    if (ch1 === ch2 && ch1 !== hardBlank) {
      return ch1;
    }
    return false;
  }
  function hRule2_Smush(ch1, ch2) {
    let rule2Str = "|/\\[]{}()<>";
    if (ch1 === "_") {
      if (rule2Str.indexOf(ch2) !== -1) {
        return ch2;
      }
    } else if (ch2 === "_") {
      if (rule2Str.indexOf(ch1) !== -1) {
        return ch1;
      }
    }
    return false;
  }
  function hRule3_Smush(ch1, ch2) {
    let rule3Classes = "| /\\ [] {} () <>";
    let r3_pos1 = rule3Classes.indexOf(ch1);
    let r3_pos2 = rule3Classes.indexOf(ch2);
    if (r3_pos1 !== -1 && r3_pos2 !== -1) {
      if (r3_pos1 !== r3_pos2 && Math.abs(r3_pos1 - r3_pos2) !== 1) {
        const startPos = Math.max(r3_pos1, r3_pos2);
        const endPos = startPos + 1;
        return rule3Classes.substring(startPos, endPos);
      }
    }
    return false;
  }
  function hRule4_Smush(ch1, ch2) {
    let rule4Str = "[] {} ()";
    let r4_pos1 = rule4Str.indexOf(ch1);
    let r4_pos2 = rule4Str.indexOf(ch2);
    if (r4_pos1 !== -1 && r4_pos2 !== -1) {
      if (Math.abs(r4_pos1 - r4_pos2) <= 1) {
        return "|";
      }
    }
    return false;
  }
  function hRule5_Smush(ch1, ch2) {
    const patterns = {
      "/\\": "|",
      "\\/": "Y",
      "><": "X"
    };
    return patterns[ch1 + ch2] || false;
  }
  function hRule6_Smush(ch1, ch2, hardBlank = "") {
    if (ch1 === hardBlank && ch2 === hardBlank) {
      return hardBlank;
    }
    return false;
  }
  function vRule1_Smush(ch1, ch2) {
    if (ch1 === ch2) {
      return ch1;
    }
    return false;
  }
  function vRule2_Smush(ch1, ch2) {
    return hRule2_Smush(ch1, ch2);
  }
  function vRule3_Smush(ch1, ch2) {
    return hRule3_Smush(ch1, ch2);
  }
  function vRule4_Smush(ch1, ch2) {
    if (ch1 === "-" && ch2 === "_" || ch1 === "_" && ch2 === "-") {
      return "=";
    }
    return false;
  }
  function vRule5_Smush(ch1, ch2) {
    if (ch1 === "|" && ch2 === "|") {
      return "|";
    }
    return false;
  }
  function uni_Smush(ch1, ch2, hardBlank) {
    if (ch2 === " " || ch2 === "") {
      return ch1;
    } else if (ch2 === hardBlank && ch1 !== " ") {
      return ch1;
    } else {
      return ch2;
    }
  }
  function canVerticalSmush(txt1, txt2, opts) {
    if (opts.fittingRules && opts.fittingRules.vLayout === FULL_WIDTH) {
      return "invalid";
    }
    let ii, len = Math.min(txt1.length, txt2.length), ch1, ch2, endSmush = false, validSmush;
    if (len === 0) {
      return "invalid";
    }
    for (ii = 0; ii < len; ii++) {
      ch1 = txt1.substring(ii, ii + 1);
      ch2 = txt2.substring(ii, ii + 1);
      if (ch1 !== " " && ch2 !== " ") {
        if (opts.fittingRules && opts.fittingRules.vLayout === FITTING) {
          return "invalid";
        } else if (opts.fittingRules && opts.fittingRules.vLayout === SMUSHING) {
          return "end";
        } else {
          if (vRule5_Smush(ch1, ch2)) {
            endSmush = endSmush || false;
            continue;
          }
          validSmush = false;
          validSmush = opts.fittingRules && opts.fittingRules.vRule1 ? vRule1_Smush(ch1, ch2) : validSmush;
          validSmush = !validSmush && opts.fittingRules && opts.fittingRules.vRule2 ? vRule2_Smush(ch1, ch2) : validSmush;
          validSmush = !validSmush && opts.fittingRules && opts.fittingRules.vRule3 ? vRule3_Smush(ch1, ch2) : validSmush;
          validSmush = !validSmush && opts.fittingRules && opts.fittingRules.vRule4 ? vRule4_Smush(ch1, ch2) : validSmush;
          endSmush = true;
          if (!validSmush) {
            return "invalid";
          }
        }
      }
    }
    if (endSmush) {
      return "end";
    } else {
      return "valid";
    }
  }
  function getVerticalSmushDist(lines1, lines2, opts) {
    let maxDist = lines1.length;
    let len1 = lines1.length;
    let subLines1, subLines2, slen;
    let curDist = 1;
    let ii, ret, result;
    while (curDist <= maxDist) {
      subLines1 = lines1.slice(Math.max(0, len1 - curDist), len1);
      subLines2 = lines2.slice(0, Math.min(maxDist, curDist));
      slen = subLines2.length;
      result = "";
      for (ii = 0; ii < slen; ii++) {
        ret = canVerticalSmush(subLines1[ii], subLines2[ii], opts);
        if (ret === "end") {
          result = ret;
        } else if (ret === "invalid") {
          result = ret;
          break;
        } else {
          if (result === "") {
            result = "valid";
          }
        }
      }
      if (result === "invalid") {
        curDist--;
        break;
      }
      if (result === "end") {
        break;
      }
      if (result === "valid") {
        curDist++;
      }
    }
    return Math.min(maxDist, curDist);
  }
  function verticallySmushLines(line1, line2, opts) {
    let ii, len = Math.min(line1.length, line2.length);
    let ch1, ch2, result = "", validSmush;
    const fittingRules = opts.fittingRules || {};
    for (ii = 0; ii < len; ii++) {
      ch1 = line1.substring(ii, ii + 1);
      ch2 = line2.substring(ii, ii + 1);
      if (ch1 !== " " && ch2 !== " ") {
        if (fittingRules.vLayout === FITTING) {
          result += uni_Smush(ch1, ch2);
        } else if (fittingRules.vLayout === SMUSHING) {
          result += uni_Smush(ch1, ch2);
        } else {
          validSmush = false;
          validSmush = fittingRules.vRule5 ? vRule5_Smush(ch1, ch2) : validSmush;
          validSmush = !validSmush && fittingRules.vRule1 ? vRule1_Smush(ch1, ch2) : validSmush;
          validSmush = !validSmush && fittingRules.vRule2 ? vRule2_Smush(ch1, ch2) : validSmush;
          validSmush = !validSmush && fittingRules.vRule3 ? vRule3_Smush(ch1, ch2) : validSmush;
          validSmush = !validSmush && fittingRules.vRule4 ? vRule4_Smush(ch1, ch2) : validSmush;
          result += validSmush;
        }
      } else {
        result += uni_Smush(ch1, ch2);
      }
    }
    return result;
  }
  function verticalSmush(lines1, lines2, overlap, opts) {
    let len1 = lines1.length;
    let len2 = lines2.length;
    let piece1 = lines1.slice(0, Math.max(0, len1 - overlap));
    let piece2_1 = lines1.slice(Math.max(0, len1 - overlap), len1);
    let piece2_2 = lines2.slice(0, Math.min(overlap, len2));
    let ii, len, line, piece2 = [], piece3;
    len = piece2_1.length;
    for (ii = 0; ii < len; ii++) {
      if (ii >= len2) {
        line = piece2_1[ii];
      } else {
        line = verticallySmushLines(piece2_1[ii], piece2_2[ii], opts);
      }
      piece2.push(line);
    }
    piece3 = lines2.slice(Math.min(overlap, len2), len2);
    return [...piece1, ...piece2, ...piece3];
  }
  function padLines(lines, numSpaces) {
    const padding = " ".repeat(numSpaces);
    return lines.map((line) => line + padding);
  }
  function smushVerticalFigLines(output, lines, opts) {
    let len1 = output[0].length;
    let len2 = lines[0].length;
    let overlap;
    if (len1 > len2) {
      lines = padLines(lines, len1 - len2);
    } else if (len2 > len1) {
      output = padLines(output, len2 - len1);
    }
    overlap = getVerticalSmushDist(output, lines, opts);
    return verticalSmush(output, lines, overlap, opts);
  }
  function getHorizontalSmushLength(txt1, txt2, opts) {
    const fittingRules = opts.fittingRules || {};
    if (fittingRules.hLayout === FULL_WIDTH) {
      return 0;
    }
    let ii, len1 = txt1.length, len2 = txt2.length;
    let maxDist = len1;
    let curDist = 1;
    let breakAfter = false;
    let seg1, seg2, ch1, ch2;
    if (len1 === 0) {
      return 0;
    }
    distCal: while (curDist <= maxDist) {
      const seg1StartPos = len1 - curDist;
      seg1 = txt1.substring(seg1StartPos, seg1StartPos + curDist);
      seg2 = txt2.substring(0, Math.min(curDist, len2));
      for (ii = 0; ii < Math.min(curDist, len2); ii++) {
        ch1 = seg1.substring(ii, ii + 1);
        ch2 = seg2.substring(ii, ii + 1);
        if (ch1 !== " " && ch2 !== " ") {
          if (fittingRules.hLayout === FITTING) {
            curDist = curDist - 1;
            break distCal;
          } else if (fittingRules.hLayout === SMUSHING) {
            if (ch1 === opts.hardBlank || ch2 === opts.hardBlank) {
              curDist = curDist - 1;
            }
            break distCal;
          } else {
            breakAfter = true;
            const validSmush = fittingRules.hRule1 && hRule1_Smush(ch1, ch2, opts.hardBlank) || fittingRules.hRule2 && hRule2_Smush(ch1, ch2) || fittingRules.hRule3 && hRule3_Smush(ch1, ch2) || fittingRules.hRule4 && hRule4_Smush(ch1, ch2) || fittingRules.hRule5 && hRule5_Smush(ch1, ch2) || fittingRules.hRule6 && hRule6_Smush(ch1, ch2, opts.hardBlank);
            if (!validSmush) {
              curDist = curDist - 1;
              break distCal;
            }
          }
        }
      }
      if (breakAfter) {
        break;
      }
      curDist++;
    }
    return Math.min(maxDist, curDist);
  }
  function horizontalSmush(textBlock1, textBlock2, overlap, opts) {
    let ii, jj, outputFig = [], overlapStart, piece1, piece2, piece3, len1, len2, txt1, txt2;
    const fittingRules = opts.fittingRules || {};
    if (typeof opts.height !== "number") {
      throw new Error("height is not defined.");
    }
    for (ii = 0; ii < opts.height; ii++) {
      txt1 = textBlock1[ii];
      txt2 = textBlock2[ii];
      len1 = txt1.length;
      len2 = txt2.length;
      overlapStart = len1 - overlap;
      piece1 = txt1.slice(0, Math.max(0, overlapStart));
      piece2 = "";
      const seg1StartPos = Math.max(0, len1 - overlap);
      let seg1 = txt1.substring(seg1StartPos, seg1StartPos + overlap);
      let seg2 = txt2.substring(0, Math.min(overlap, len2));
      for (jj = 0; jj < overlap; jj++) {
        let ch1 = jj < len1 ? seg1.substring(jj, jj + 1) : " ";
        let ch2 = jj < len2 ? seg2.substring(jj, jj + 1) : " ";
        if (ch1 !== " " && ch2 !== " ") {
          if (fittingRules.hLayout === FITTING || fittingRules.hLayout === SMUSHING) {
            piece2 += uni_Smush(ch1, ch2, opts.hardBlank);
          } else {
            const nextCh = fittingRules.hRule1 && hRule1_Smush(ch1, ch2, opts.hardBlank) || fittingRules.hRule2 && hRule2_Smush(ch1, ch2) || fittingRules.hRule3 && hRule3_Smush(ch1, ch2) || fittingRules.hRule4 && hRule4_Smush(ch1, ch2) || fittingRules.hRule5 && hRule5_Smush(ch1, ch2) || fittingRules.hRule6 && hRule6_Smush(ch1, ch2, opts.hardBlank) || uni_Smush(ch1, ch2, opts.hardBlank);
            piece2 += nextCh;
          }
        } else {
          piece2 += uni_Smush(ch1, ch2, opts.hardBlank);
        }
      }
      if (overlap >= len2) {
        piece3 = "";
      } else {
        piece3 = txt2.substring(overlap, overlap + Math.max(0, len2 - overlap));
      }
      outputFig[ii] = piece1 + piece2 + piece3;
    }
    return outputFig;
  }
  function newFigChar(len) {
    return new Array(len).fill("");
  }
  const figLinesWidth = function(textLines) {
    return Math.max(...textLines.map((line) => line.length));
  };
  function joinFigArray(array, len, opts) {
    return array.reduce(function(acc, data) {
      return horizontalSmush(acc, data.fig, data.overlap || 0, opts);
    }, newFigChar(len));
  }
  function breakWord(figChars, len, opts) {
    for (let i = figChars.length - 1; i > 0; i--) {
      const w = joinFigArray(figChars.slice(0, i), len, opts);
      if (figLinesWidth(w) <= opts.width) {
        return {
          outputFigText: w,
          chars: figChars.slice(i)
        };
      }
    }
    return { outputFigText: newFigChar(len), chars: figChars };
  }
  function generateFigTextLines(txt, figChars, opts) {
    let charIndex, figChar, overlap = 0, row, outputFigText, len, height = opts.height, outputFigLines = [], maxWidth2, nextFigChars = {
      chars: [],
      // list of characters is used to break in the middle of the word when word is longer
      overlap
      // chars is array of characters with {fig, overlap} and overlap is for whole word
    }, figWords = [], char, isSpace, textFigWord, textFigLine, tmpBreak;
    if (typeof height !== "number") {
      throw new Error("height is not defined.");
    }
    outputFigText = newFigChar(height);
    const fittingRules = opts.fittingRules || {};
    if (opts.printDirection === 1) {
      txt = txt.split("").reverse().join("");
    }
    len = txt.length;
    for (charIndex = 0; charIndex < len; charIndex++) {
      char = txt.substring(charIndex, charIndex + 1);
      isSpace = char.match(/\s/);
      figChar = figChars[char.charCodeAt(0)];
      textFigLine = null;
      if (figChar) {
        if (fittingRules.hLayout !== FULL_WIDTH) {
          overlap = 1e4;
          for (row = 0; row < height; row++) {
            overlap = Math.min(
              overlap,
              getHorizontalSmushLength(outputFigText[row], figChar[row], opts)
            );
          }
          overlap = overlap === 1e4 ? 0 : overlap;
        }
        if (opts.width > 0) {
          if (opts.whitespaceBreak) {
            textFigWord = joinFigArray(
              nextFigChars.chars.concat([
                {
                  fig: figChar,
                  overlap
                }
              ]),
              height,
              opts
            );
            textFigLine = joinFigArray(
              figWords.concat([
                {
                  fig: textFigWord,
                  overlap: nextFigChars.overlap
                }
              ]),
              height,
              opts
            );
            maxWidth2 = figLinesWidth(textFigLine);
          } else {
            textFigLine = horizontalSmush(
              outputFigText,
              figChar,
              overlap,
              opts
            );
            maxWidth2 = figLinesWidth(textFigLine);
          }
          if (maxWidth2 >= opts.width && charIndex > 0) {
            if (opts.whitespaceBreak) {
              outputFigText = joinFigArray(figWords.slice(0, -1), height, opts);
              if (figWords.length > 1) {
                outputFigLines.push(outputFigText);
                outputFigText = newFigChar(height);
              }
              figWords = [];
            } else {
              outputFigLines.push(outputFigText);
              outputFigText = newFigChar(height);
            }
          }
        }
        if (opts.width > 0 && opts.whitespaceBreak) {
          if (!isSpace || charIndex === len - 1) {
            nextFigChars.chars.push({ fig: figChar, overlap });
          }
          if (isSpace || charIndex === len - 1) {
            tmpBreak = null;
            while (true) {
              textFigLine = joinFigArray(nextFigChars.chars, height, opts);
              maxWidth2 = figLinesWidth(textFigLine);
              if (maxWidth2 >= opts.width) {
                tmpBreak = breakWord(nextFigChars.chars, height, opts);
                nextFigChars = { chars: tmpBreak.chars };
                outputFigLines.push(tmpBreak.outputFigText);
              } else {
                break;
              }
            }
            if (maxWidth2 > 0) {
              if (tmpBreak) {
                figWords.push({ fig: textFigLine, overlap: 1 });
              } else {
                figWords.push({
                  fig: textFigLine,
                  overlap: nextFigChars.overlap
                });
              }
            }
            if (isSpace) {
              figWords.push({ fig: figChar, overlap });
              outputFigText = newFigChar(height);
            }
            if (charIndex === len - 1) {
              outputFigText = joinFigArray(figWords, height, opts);
            }
            nextFigChars = {
              chars: [],
              overlap
            };
            continue;
          }
        }
        outputFigText = horizontalSmush(outputFigText, figChar, overlap, opts);
      }
    }
    if (figLinesWidth(outputFigText) > 0) {
      outputFigLines.push(outputFigText);
    }
    if (!opts.showHardBlanks) {
      outputFigLines.forEach(function(outputFigText2) {
        len = outputFigText2.length;
        for (row = 0; row < len; row++) {
          outputFigText2[row] = outputFigText2[row].replace(
            new RegExp("\\" + opts.hardBlank, "g"),
            " "
          );
        }
      });
    }
    if (txt === "" && outputFigLines.length === 0) {
      outputFigLines.push(new Array(height).fill(""));
    }
    return outputFigLines;
  }
  const getHorizontalFittingRules = function(layout, options) {
    let params;
    const fittingRules = options.fittingRules || {};
    if (layout === "default") {
      params = {
        hLayout: fittingRules.hLayout,
        hRule1: fittingRules.hRule1,
        hRule2: fittingRules.hRule2,
        hRule3: fittingRules.hRule3,
        hRule4: fittingRules.hRule4,
        hRule5: fittingRules.hRule5,
        hRule6: fittingRules.hRule6
      };
    } else if (layout === "full") {
      params = {
        hLayout: FULL_WIDTH,
        hRule1: false,
        hRule2: false,
        hRule3: false,
        hRule4: false,
        hRule5: false,
        hRule6: false
      };
    } else if (layout === "fitted") {
      params = {
        hLayout: FITTING,
        hRule1: false,
        hRule2: false,
        hRule3: false,
        hRule4: false,
        hRule5: false,
        hRule6: false
      };
    } else if (layout === "controlled smushing") {
      params = {
        hLayout: CONTROLLED_SMUSHING,
        hRule1: true,
        hRule2: true,
        hRule3: true,
        hRule4: true,
        hRule5: true,
        hRule6: true
      };
    } else if (layout === "universal smushing") {
      params = {
        hLayout: SMUSHING,
        hRule1: false,
        hRule2: false,
        hRule3: false,
        hRule4: false,
        hRule5: false,
        hRule6: false
      };
    } else {
      return;
    }
    return params;
  };
  const getVerticalFittingRules = function(layout, options) {
    let params = {};
    const fittingRules = options.fittingRules || {};
    if (layout === "default") {
      params = {
        vLayout: fittingRules.vLayout,
        vRule1: fittingRules.vRule1,
        vRule2: fittingRules.vRule2,
        vRule3: fittingRules.vRule3,
        vRule4: fittingRules.vRule4,
        vRule5: fittingRules.vRule5
      };
    } else if (layout === "full") {
      params = {
        vLayout: FULL_WIDTH,
        vRule1: false,
        vRule2: false,
        vRule3: false,
        vRule4: false,
        vRule5: false
      };
    } else if (layout === "fitted") {
      params = {
        vLayout: FITTING,
        vRule1: false,
        vRule2: false,
        vRule3: false,
        vRule4: false,
        vRule5: false
      };
    } else if (layout === "controlled smushing") {
      params = {
        vLayout: CONTROLLED_SMUSHING,
        vRule1: true,
        vRule2: true,
        vRule3: true,
        vRule4: true,
        vRule5: true
      };
    } else if (layout === "universal smushing") {
      params = {
        vLayout: SMUSHING,
        vRule1: false,
        vRule2: false,
        vRule3: false,
        vRule4: false,
        vRule5: false
      };
    } else {
      return;
    }
    return params;
  };
  const generateText = function(fontName, options, txt) {
    txt = txt.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    let lines = txt.split("\n");
    let figLines = [];
    let ii, len, output;
    len = lines.length;
    for (ii = 0; ii < len; ii++) {
      figLines = figLines.concat(
        generateFigTextLines(lines[ii], figFonts[fontName], options)
      );
    }
    len = figLines.length;
    output = figLines[0];
    for (ii = 1; ii < len; ii++) {
      output = smushVerticalFigLines(output, figLines[ii], options);
    }
    return output ? output.join("\n") : "";
  };
  function _reworkFontOpts(fontMeta, options) {
    let myOpts;
    if (typeof structuredClone !== "undefined") {
      myOpts = structuredClone(fontMeta);
    } else {
      myOpts = JSON.parse(JSON.stringify(fontMeta));
    }
    myOpts.showHardBlanks = options.showHardBlanks || false;
    myOpts.width = options.width || -1;
    myOpts.whitespaceBreak = options.whitespaceBreak || false;
    if (options.horizontalLayout) {
      const params = getHorizontalFittingRules(
        options.horizontalLayout,
        fontMeta
      );
      if (params) {
        Object.assign(myOpts.fittingRules, params);
      }
    }
    if (options.verticalLayout) {
      const params = getVerticalFittingRules(options.verticalLayout, fontMeta);
      if (params) {
        Object.assign(myOpts.fittingRules, params);
      }
    }
    myOpts.printDirection = options.printDirection !== null && options.printDirection !== void 0 ? options.printDirection : fontMeta.printDirection;
    return myOpts;
  }
  const me = async function(txt, optionsOrFontOrCallback, callback) {
    return me.text(txt, optionsOrFontOrCallback, callback);
  };
  me.text = async function(txt, optionsOrFontOrCallback, callback) {
    txt = txt + "";
    let options, next;
    if (typeof optionsOrFontOrCallback === "function") {
      next = optionsOrFontOrCallback;
      options = { font: figDefaults.font };
    } else if (typeof optionsOrFontOrCallback === "string") {
      options = { font: optionsOrFontOrCallback };
      next = callback;
    } else if (optionsOrFontOrCallback) {
      options = optionsOrFontOrCallback;
      next = callback;
    } else {
      options = { font: figDefaults.font };
      next = callback;
    }
    const fontName = options.font || figDefaults.font;
    try {
      const fontOpts = await me.loadFont(fontName);
      const generatedTxt = fontOpts ? generateText(fontName, _reworkFontOpts(fontOpts, options), txt) : "";
      if (next) {
        next(null, generatedTxt);
      }
      return generatedTxt;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      if (next) {
        next(error);
        return "";
      }
      throw error;
    }
  };
  me.textSync = function(txt, options) {
    txt = txt + "";
    if (typeof options === "string") {
      options = { font: options };
    } else {
      options = options || {};
    }
    const fontName = options.font || figDefaults.font;
    let fontOpts = _reworkFontOpts(me.loadFontSync(fontName), options);
    return generateText(fontName, fontOpts, txt);
  };
  me.metadata = async function(fontName, callback) {
    fontName = fontName + "";
    try {
      const fontOpts = await me.loadFont(fontName);
      if (!fontOpts) {
        throw new Error("Error loading font.");
      }
      const font = figFonts[fontName] || {};
      const result = [fontOpts, font.comment || ""];
      if (callback) {
        callback(null, fontOpts, font.comment);
      }
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      if (callback) {
        callback(error);
        return null;
      }
      throw error;
    }
  };
  me.defaults = function(opts) {
    if (opts && typeof opts === "object") {
      Object.assign(figDefaults, opts);
    }
    if (typeof structuredClone !== "undefined") {
      return structuredClone(figDefaults);
    } else {
      return JSON.parse(JSON.stringify(figDefaults));
    }
  };
  me.parseFont = function(fontName, data, override = true) {
    if (figFonts[fontName] && !override) {
      return figFonts[fontName].options;
    }
    data = data.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    const font = new FigletFont();
    const lines = data.split("\n");
    const headerLine = lines.shift();
    if (!headerLine) {
      throw new Error("Invalid font file: missing header");
    }
    const headerData = headerLine.split(" ");
    const opts = {
      hardBlank: headerData[0].substring(5, 6),
      height: parseInt(headerData[1], 10),
      baseline: parseInt(headerData[2], 10),
      maxLength: parseInt(headerData[3], 10),
      oldLayout: parseInt(headerData[4], 10),
      numCommentLines: parseInt(headerData[5], 10),
      printDirection: headerData[6] ? parseInt(headerData[6], 10) : 0,
      fullLayout: headerData[7] ? parseInt(headerData[7], 10) : null,
      codeTagCount: headerData[8] ? parseInt(headerData[8], 10) : null
    };
    const hardBlank = opts.hardBlank || "";
    if (hardBlank.length !== 1 || [
      opts.height,
      opts.baseline,
      opts.maxLength,
      opts.oldLayout,
      opts.numCommentLines
    ].some((val) => val === null || val === void 0 || isNaN(val))) {
      throw new Error("FIGlet header contains invalid values.");
    }
    if (opts.height == null || opts.numCommentLines == null) {
      throw new Error("FIGlet header contains invalid values.");
    }
    opts.fittingRules = getSmushingRules(opts.oldLayout, opts.fullLayout);
    font.options = opts;
    const charNums = [];
    for (let i = 32; i <= 126; i++) {
      charNums.push(i);
    }
    charNums.push(196, 214, 220, 228, 246, 252, 223);
    if (lines.length < opts.numCommentLines + opts.height * charNums.length) {
      throw new Error(
        `FIGlet file is missing data. Line length: ${lines.length}. Comment lines: ${opts.numCommentLines}. Height: ${opts.height}. Num chars: ${charNums.length}.`
      );
    }
    font.comment = lines.splice(0, opts.numCommentLines).join("\n");
    font.numChars = 0;
    while (lines.length > 0 && font.numChars < charNums.length) {
      const cNum = charNums[font.numChars];
      font[cNum] = lines.splice(0, opts.height);
      for (let i = 0; i < opts.height; i++) {
        if (typeof font[cNum][i] === "undefined") {
          font[cNum][i] = "";
        } else {
          font[cNum][i] = removeEndChar(font[cNum][i], i, opts.height);
        }
      }
      font.numChars++;
    }
    while (lines.length > 0) {
      const cNumLine = lines.shift();
      if (!cNumLine || cNumLine.trim() === "") break;
      let cNum = cNumLine.split(" ")[0];
      let parsedNum;
      if (/^-?0[xX][0-9a-fA-F]+$/.test(cNum)) {
        parsedNum = parseInt(cNum, 16);
      } else if (/^-?0[0-7]+$/.test(cNum)) {
        parsedNum = parseInt(cNum, 8);
      } else if (/^-?[0-9]+$/.test(cNum)) {
        parsedNum = parseInt(cNum, 10);
      } else {
        throw new Error(`Error parsing data. Invalid data: ${cNum}`);
      }
      if (parsedNum === -1 || parsedNum < -2147483648 || parsedNum > 2147483647) {
        const msg = parsedNum === -1 ? "The char code -1 is not permitted." : `The char code cannot be ${parsedNum < -2147483648 ? "less than -2147483648" : "greater than 2147483647"}.`;
        throw new Error(`Error parsing data. ${msg}`);
      }
      font[parsedNum] = lines.splice(0, opts.height);
      for (let i = 0; i < opts.height; i++) {
        if (typeof font[parsedNum][i] === "undefined") {
          font[parsedNum][i] = "";
        } else {
          font[parsedNum][i] = removeEndChar(
            font[parsedNum][i],
            i,
            opts.height
          );
        }
      }
      font.numChars++;
    }
    figFonts[fontName] = font;
    return opts;
  };
  me.loadedFonts = () => {
    return Object.keys(figFonts);
  };
  me.clearLoadedFonts = () => {
    Object.keys(figFonts).forEach((key) => {
      delete figFonts[key];
    });
  };
  me.loadFont = async function(fontName, callback) {
    if (figFonts[fontName]) {
      const result = figFonts[fontName].options;
      if (callback) {
        callback(null, result);
      }
      return Promise.resolve(result);
    }
    try {
      if (!figDefaults.fetchFontIfMissing) {
        throw new Error(`Font is not loaded: ${fontName}`);
      }
      const response = await fetch(`${figDefaults.fontPath}/${fontName}.flf`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const text = await response.text();
      const result = me.parseFont(fontName, text);
      if (callback) {
        callback(null, result);
      }
      return result;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      if (callback) {
        callback(err);
        return null;
      }
      throw err;
    }
  };
  me.loadFontSync = function(name) {
    if (figFonts[name]) {
      return figFonts[name].options;
    }
    throw new Error(
      "Synchronous font loading is not implemented for the browser, it will only work for fonts already loaded."
    );
  };
  me.preloadFonts = async function(fonts, callback) {
    try {
      for (const name of fonts) {
        const response = await fetch(`${figDefaults.fontPath}/${name}.flf`);
        if (!response.ok) {
          throw new Error(
            `Failed to preload fonts. Error fetching font: ${name}, status code: ${response.statusText}`
          );
        }
        const data = await response.text();
        me.parseFont(name, data);
      }
      if (callback) {
        callback();
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      if (callback) {
        callback(err);
        return;
      }
      throw error;
    }
  };
  me.fonts = function(callback) {
    return new Promise(function(resolve, reject) {
      resolve(fontList);
      if (callback) {
        callback(null, fontList);
      }
    });
  };
  me.fontsSync = function() {
    return fontList;
  };
  me.figFonts = figFonts;
  return me;
})();

// ../../node_modules/figlet/dist/node-figlet.mjs
var import_url = require("url");
var __filename = (0, import_url.fileURLToPath)("file:///dist/index.js");
var __dirname = path2.dirname(__filename);
var fontPath = path2.join(__dirname, "/../fonts/");
var nodeFiglet = figlet;
nodeFiglet.defaults({ fontPath });
nodeFiglet.loadFont = function(name, callback) {
  return new Promise((resolve, reject) => {
    if (nodeFiglet.figFonts[name]) {
      if (callback) {
        callback(null, nodeFiglet.figFonts[name].options);
      }
      resolve(nodeFiglet.figFonts[name].options);
      return;
    }
    fs2.readFile(
      path2.join(nodeFiglet.defaults().fontPath, name + ".flf"),
      { encoding: "utf-8" },
      (err, fontData) => {
        if (err) {
          if (callback) {
            callback(err);
          }
          reject(err);
          return;
        }
        fontData = fontData + "";
        try {
          const font = nodeFiglet.parseFont(name, fontData);
          if (callback) {
            callback(null, font);
          }
          resolve(font);
        } catch (error) {
          const typedError = error instanceof Error ? error : new Error(String(error));
          if (callback) {
            callback(typedError);
          }
          reject(typedError);
        }
      }
    );
  });
};
nodeFiglet.loadFontSync = function(font) {
  if (nodeFiglet.figFonts[font]) {
    return nodeFiglet.figFonts[font].options;
  }
  const fontData = fs2.readFileSync(path2.join(nodeFiglet.defaults().fontPath, font + ".flf"), {
    encoding: "utf-8"
  }) + "";
  return nodeFiglet.parseFont(font, fontData);
};
nodeFiglet.fonts = function(next) {
  return new Promise((resolve, reject) => {
    const fontList2 = [];
    fs2.readdir(
      nodeFiglet.defaults().fontPath,
      (err, files) => {
        if (err) {
          next && next(err);
          reject(err);
          return;
        }
        files.forEach((file) => {
          if (/\.flf$/.test(file)) {
            fontList2.push(file.replace(/\.flf$/, ""));
          }
        });
        next && next(null, fontList2);
        resolve(fontList2);
      }
    );
  });
};
nodeFiglet.fontsSync = function() {
  const fontList2 = [];
  fs2.readdirSync(nodeFiglet.defaults().fontPath).forEach((file) => {
    if (/\.flf$/.test(file)) {
      fontList2.push(file.replace(/\.flf$/, ""));
    }
  });
  return fontList2;
};

// src/ascii/cats.ts
var cat2 = [
  "  /\\___/\\",
  "  )     (",
  "  =\\   /=",
  "  )   (",
  " /     \\",
  " )     (",
  "/       \\",
  "\\       /",
  " \\__ __/",
  "    ))",
  "    //",
  "    ((",
  "    \\)"
];
var cat = [
  "                          ,",
  "  ,-.       _,---._ __  / \\",
  " /  )    .-'       `./ /   \\",
  "(  (   ,'            `/    /|",
  " \\  `-'             \\'\\   / |",
  "  `.              ,  \\ \\ /  |",
  "   /`.          ,'-`----Y   |",
  "  (            ;        |   '",
  "  |  ,-.    ,-'         |  /",
  "  |  | (   |            | /",
  "  )  |  \\  `.___________|/",
  "  `--'   `--'"
];
function normalizeLines(text) {
  const lines = text.split(/\r?\n/);
  while (lines.length > 0 && lines[lines.length - 1] === "") {
    lines.pop();
  }
  return lines;
}
function padVertical(lines, height) {
  const pad = height - lines.length;
  if (pad <= 0) {
    return [...lines];
  }
  const top = Math.floor(pad / 2);
  const bottom = pad - top;
  return [
    ...Array.from({ length: top }, () => ""),
    ...lines,
    ...Array.from({ length: bottom }, () => "")
  ];
}
function maxWidth(lines) {
  return lines.reduce((max, line) => Math.max(max, line.length), 0);
}
function addCatsToAscii(art) {
  const centerLines = normalizeLines(art);
  const totalHeight = Math.max(centerLines.length, cat.length, cat2.length);
  const leftLines = padVertical(cat, totalHeight);
  const rightLines = padVertical(cat2, totalHeight);
  const middleLines = padVertical(centerLines, totalHeight);
  const leftWidth = maxWidth(leftLines);
  const middleWidth = maxWidth(middleLines);
  const gap = "  ";
  const combined = [];
  for (let i = 0; i < totalHeight; i += 1) {
    const left = (leftLines[i] ?? "").padEnd(leftWidth, " ");
    const middle = (middleLines[i] ?? "").padEnd(middleWidth, " ");
    const right = rightLines[i] ?? "";
    combined.push(`${left}${gap}${middle}${gap}${right}`.trimEnd());
  }
  return combined.join("\n");
}

// ../../assets/fonts/Hacker.flf
var Hacker_default = "flf2a$ 15 15 31 0 3 0 64 0\r\nFont Author: yuu\r\n\r\ntest font 2\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n       .            @\r\n      ,ko.          @\r\n      ;XNc          @\r\n      ,KW0,         @\r\n      ;KNNx.        @\r\n      :0dkNl        @\r\n      l0;;KK;    ...@\r\n      o0,.xN0dooool;@\r\n ..';l0XkxxONKl..   @\r\nxOOkxOXd'. .kNd.    @\r\n...  lO,    'ONd.   @\r\n    .Ox.     'ONx.  @\r\n    lK:       .kN0: @\r\n   '0k.        .lx; @\r\n   .;.              @@\r\n                 .     @\r\n   .c:.    .';ldkd,    @\r\n  .dNXd:loddd0NXd.     @\r\n,xkOXWKd:,.'oKk,       @\r\n...'kWO' .:O0c.    .',.@\r\n    lNXl;k0o. .,cod0Xx.@\r\n    ;KNX0xlcoool:,lX0' @\r\n   .lXNNOdoc,.    oNo  @\r\n  .xKXWK:        .OX;  @\r\n  .,'oWX;        ;XO.  @\r\n ..  :XNl        oNo   @\r\ncKXkcoKWd.      '0X;   @\r\n.;ok0XNNKo,..  'kXl.   @\r\n    .'o0O0KK0kxxd,     @\r\n       . ..',,..       @@\r\n    .'.                @\r\n   'kKo.    .,.        @\r\n  .dNWO.   cKNO'       @\r\n  :XNNNd. ;KX0:        @\r\n .kW0dKNd'dWOc.        @\r\n :XWo.,ONKKWk;.        @\r\n oWX:  .dNNWx'.    ''  @\r\n.xW0'   .lKKc.    .kXd.@\r\n.kWO.     ..       ;KNl@\r\n.OWO.              '0Wd@\r\n.kW0'             .oNX:@\r\n lNNl            ,kX0: @\r\n .xNKc.     ..'cxKOc.  @\r\n  .cOKOxooodddddc'     @\r\n     .,,;,,...         @@\r\n    ..                 @\r\n   .x0c                @\r\n   .xW0'        ....'..@\r\n.,,'oNNd;:clodxkkkk0XXo@\r\n:OK0KNWXOxdlc:,'...oNXc@\r\n ...,OWK:         ,0Wx.@\r\n     oNNl        'ONx. @\r\n     ;XWx.      ;0Nd.  @\r\n     .OW0'    .lKKl.   @\r\n     .dWX:   ,kXk'     @\r\n      cXWd.,xKO;       @\r\n      ,0WKO0x;.        @\r\n;xkdllxXWNx.           @\r\n,xO0Oxoll;.            @\r\n  ..                   @@\r\n         .oo.            @\r\n         .dN0c.          @\r\n          ;KKOk:. .;'    @\r\n          .xXl:k0dkO,    @\r\n           ,00,.lKX:     @\r\n       .....;00; ',      @\r\n    ,oOOOOOOkKWKc.     ..@\r\n  .d0x;'..';:ld00,    'kl@\r\n 'kO,          ..    .x0'@\r\n.oNk'                l0: @\r\n .c0Kd,            .dO;  @\r\n    .l0Xkl;'.....':dko.  @\r\n     .:x0XXK00000xc.     @\r\n        ..,,,,,'.        @\r\n                         @@\r\n ..    ,,                 @\r\n.xKx:'lXX:                @\r\n.:dOKKXNN0l;,....         @\r\n    .';xNNX00OOOOOkkkkkxxo@\r\n       'OW0;....',,,,,,'''@\r\n        cXNd.             @\r\n      ':oKWK;.....        @\r\n     .xKXNNNKkkkko.       @\r\n       ..:0WXl..          @\r\n          lNWd.           @\r\n          .kWK;           @\r\n           :XWx.          @\r\n           .kWX:          @\r\n            'ol.          @\r\n                          @@\r\n      ;l;.                @\r\n     ;KWNKOdl;..          @\r\n     cNXo:lx0XKOxol:,...  @\r\n    .xWO'   ..;codk0Odc.  @\r\n    '0Wo           .      @\r\n    :XX:    ..            @\r\n   .dWO.  .xKKOkxddxxkkkxc@\r\n   '0Wl   ,0WKocokKX0xo:,.@\r\n   lNK,   .kWXkddl:'.     @\r\n  .OWd. .:dKWXl.          @\r\n  :XXl:dkdl0WK,           @\r\n .kWX0x:. .dOl.           @\r\n :XNk,     .              @\r\n ;o;.                     @\r\n                          @@\r\n         .lxx;        @\r\n  .ck,  .dWM0'        @\r\n  .kWo   ;KWNl        @\r\n  .xWd.  .kWWO.   .,. @\r\n  .kWo    lXNXo:ool:. @\r\n  .ON:   .l0XWKo,.    @\r\n  ,KX:.:oddd0W0'      @\r\n,cxXNOdo;.  cXXc      @\r\n;xKWO,      '0Wx.     @\r\n .ONl       .dWK,     @\r\n ;XK,        :XNl     @\r\n.dWx.        .kWO'    @\r\n'0Nl          :XNo    @\r\n,Ok'           ;l,    @\r\n .                    @@\r\n                    .. @\r\n                  .:kx.@\r\n         .dk,  .;dkx:. @\r\n         :XNklxOxc.    @\r\n       .;xNNKd:'       @\r\n   .,lxOxOXWd.         @\r\n.cxOOd:. ;KWd.         @\r\n;xo,.    ;KWd.         @\r\n         ;XWd.     .:x:@\r\n         :XWd.   ,d0kl'@\r\n         :XWd.'ckOo'   @\r\n         :XWX00kc.     @\r\n      .;lOKOo;.        @\r\n  .;okOkd:.            @\r\n  ;xo:'.               @@\r\n                     .,.@\r\n                 .;coool@\r\n           .';loool:'.  @\r\n    ..';cox0Xx:'.       @\r\n ,dxxxdoc;:OWk.         @\r\n .,..      ;KNo         @\r\n            lNK;        @\r\n      ..';:'.dNk.       @\r\n,oddxkOkdl:. 'ONl       @\r\n,loxk0KOd:.   :XK;      @\r\n     .':dOKkc'.oNk.     @\r\n         .,o0KxdKNo.    @\r\n            .;xKNNXc    @\r\n               'oKWK;   @\r\n                 .ll'   @@\r\n    :Oc.   cKx.             @\r\n   .dW0,   .kNk.            @\r\n   ;KWX:    'OWx.           @\r\n  :OxxXl    c0k'            @\r\n'dk:.;Xx. 'xOc.             @\r\n.'.  ,Kk,cOd.          ...''@\r\n     '0XOd,...',:cllllclkXKd@\r\n    .cKN0dllllll:;'...'oKk; @\r\n   .cxONk;..        .:00c.  @\r\n      ;Xk.         'xXx.    @\r\n      .OK,        :KK:      @\r\n       dNc      .oXO'       @\r\n       :Xx.    .xXx. ..,,,. @\r\n       .l:.   .kWXxlllc:;'. @\r\n              ,oc;'.        @@\r\n.c:.                  @\r\n'0No                  @\r\n :XXc                 @\r\n .oNO'                @\r\n  '0Nl                @\r\n   oWO.               @\r\n   :NK,               @\r\n   ,KN:        ..     @\r\n   .OWl       ;0Kl.   @\r\n   .kWo       .dNXl   @\r\n   .kWk;''''.. .dNXc .@\r\n   .xXOkkkOO00OxkXNXd'@\r\n    .........,:ldk0KO;@\r\n                  ... @\r\n                      @@\r\n             .;,      @\r\n.,,.        .dWK;     @\r\n:XNk'       .OWNx.    @\r\n'OWN0;      :XNW0,    @\r\n oNNNK:   .cONXNXc    @\r\n ;KNNNKc .dNNOo0Wd.   @\r\n .xNK0NXloXWX:.xWO'   @\r\n  cNKldNNNNXo  cNX:   @\r\n  '0Nl.oKKd:.  ,0Wd.  @\r\n  .xWx. ..     .xW0'  @\r\n  .dW0,         cNNc  @\r\nkX00NX;         'OWk. @\r\n.l0NNX:          oNXc @\r\n  .d0d.          '0WO'@\r\n    .             ,ol'@@\r\n              ..   @\r\n            .cO0l. @\r\n ':'       .oNNx.  @\r\n.oNXx,     ;KWO'   @\r\n .oXWXx,   lNNo    @\r\n  .oNNNXd'.lNNl    @\r\n   .xNNXNKoxNNl    @\r\n    '0WOoONNNNx.   @\r\n     cXNc'dNNNK,   @\r\n     .xWO'.lKNNd.  @\r\n      :XNc  :KWX:  @\r\n      .kWO.  cXWO' @\r\n       cXNc  .dNXo.@\r\n       .OWx.  .''. @\r\n        .;'        @@\r\n                ..       .:,@\r\n        ...  'cdOOl.  .:dko,@\r\n       'kOccoo:;kW0:;dxo;.  @\r\n      .dN0d:.  .xWXOo;.     @\r\n     ,xXK:   .:xXNd.        @\r\n   ;doxNk..:dxdkNK;         @\r\n 'xx,.oN0xkd:..xWd.         @\r\n.ONd:dKNk;.   :X0,          @\r\n.oOOxxXX:    'OXc           @\r\n  .  ,0K,   .dNo.           @\r\n     ,KK,  .oXd.            @\r\n     ;KK, .dKl.             @\r\n     ,KNockk,               @\r\n     .dXKkc.                @\r\n       ..                   @@\r\n  ;dd;                 @\r\n  ,ONXkc.              @\r\n   .xNNNKkl;.          @\r\n    .dNN0dkKKkl;.      @\r\n     .xWK; .;okKKxc'   @\r\n      'OWk.    .:xXXx:.@\r\n       :XNl  .':ldkO0O:@\r\n       .xNKdoooc;'...  @\r\n   .,codkXWx'          @\r\n.lxkxl,..xWk.          @\r\n,c,.     cNK,          @\r\n         'ONl          @\r\n         .kNl          @\r\n          .,.          @\r\n                       @@\r\n      ..        .cko.@\r\n     l0c     .:d0NMx.@\r\n    '00,  .:dkd:lKNl @\r\n    cN0clxkd:.  cNK, @\r\n .,c0WXOo;.    .dMx. @\r\n'OKKNNl        '0Nc  @\r\n.'.;KX;        :N0,  @\r\n   ,KX;       .xWd.  @\r\n   '0N:     ,;cKK;   @\r\n   .OWc    :XWNWx.   @\r\n   .xMx.    ;0WW0c.  @\r\n    ;XNo.   .kNKNWKd;@\r\n     cXNOl::kKc.;dkOo@\r\n      'ok00Oo'       @\r\n                     @@\r\n ;dl'                        @\r\n lNWKxc'.                    @\r\n .oXNNXK0kdoc;''..           @\r\n  .dNNx,,:loxkkOOkkxd:.      @\r\n   .dNXc      ...;xXKd.      @\r\n    .xNK:     ':oOkc.        @\r\n     .kWK; .:xkko,           @\r\n      'ON0xkd;.              @\r\n     .;ONW0;                 @\r\n  .;oOXKKNXd,...             @\r\n .d0Okkxk0NNKOOOkdl:'.       @\r\n  ..     ,0WO;',;cdk00xc,.   @\r\n         .o0l.      .;oOKOo;.@\r\n           .            ,oxo.@\r\n                             @@\r\n       ,o;             @\r\n      .xWK:            @\r\n      .OWNXd,.      .. @\r\n      ,KXdokkd:.  .cOd.@\r\n      :NO.      'o0NO,.@\r\n      cN0,  .'cdONXo.  @\r\n      .xX0ddddod0O;    @\r\ncOxc.   .''...c0x.     @\r\n.lkXKd,     .dKo.      @\r\n   'o0Xx,  .dXo        @\r\n     .oXXl.lNx.        @\r\n       :KXOX0,         @\r\n        :KWXl          @\r\n        .xXd.          @\r\n         .'            @@\r\n                    .'ckKo.@\r\n                .'codkXNk. @\r\n           ..;lodoc,.,kx'  @\r\n'c:'.',;cldOXOc'.     .    @\r\ncXNXOxdol;c0Wo             @\r\n ,dkl.    .OWo             @\r\n          ,KN:             @\r\n          :N0'             @\r\n          dWx.             @\r\n         .kWo              @\r\n         .ONl              @\r\n         .kWo              @\r\n          cNO.             @\r\n          .c0c             @\r\n            .'             @@\r\n       .lx,  .;'        @\r\n       ;KNc  cNO.       @\r\n       ,KWl  '0K,       @\r\n       ;XNc   oNo       @\r\n       lNK,   '00'      @\r\n      .xWx.    cKo.     @\r\n      ;KNc     .oKc     @\r\n     .dWk.      .xKl.   @\r\n     ;KX:        .xXx.  @\r\n    .kNo.        .,kNO; @\r\n    lNO.  .':loododxkOk;@\r\n   ,0Ndcodddlc,'..      @\r\n  .xNXko;..             @\r\n  .cc'                  @\r\n                        @@\r\n           .ok:@\r\n          .xNk.@\r\n          oNO' @\r\n ..      ;KX:  @\r\n.x0:    .dWk.  @\r\n ;KXl.  '0Nl   @\r\n  ;KNo. ;XX;   @\r\n   ;KNd.;XX;   @\r\n    :KNlcXX;   @\r\n     cXXOXX:   @\r\n      lXNNNc   @\r\n      .oNNNl   @\r\n       .oXXc   @\r\n         ''    @\r\n               @@\r\n        .colclll;.  @\r\n        .xNNkl:'.   @\r\n         .kNx.      @\r\n          'ONo.     @\r\n,xl.    .. :XK:     @\r\n.lXx. .dXd..dNO.    @\r\n .dNl ,0WXx.'ONl    @\r\n  '00':XKOXO,cX0,   @\r\n   dNloNd.oX0ldXd.  @\r\n   :XOOXc  cKKkKXc  @\r\n   .ONNK,   ,ONNNK: @\r\n   .dNWO.    .oXNWO'@\r\n    lNNo       ;0NNd@\r\n    :Kk.        .dOl@\r\n    ...           . @@\r\n                          .'.@\r\n                        .c:. @\r\n                      .ld;.  @\r\n                    .cOd.    @\r\n                   ;kO:.     @\r\n.:do;            .d0d.       @\r\n.xNNNk;         :0O;         @\r\n .':kNNOl,.   .xKd.          @\r\n     ,oOXX0dcl00:            @\r\n        ':oONWWOc'.      .:lo@\r\n          .xXkldO0Odc,.  .cc:@\r\n        ;k0Xd.   .;lxOOxoc;. @\r\n        cNWx.        ..;:c;. @\r\n        .:c.                 @\r\n                             @@\r\n            .c,             @\r\n     ..     '0K:            @\r\n    .xKl.    ;KKc           @\r\n     'dK0l.   oNXl.         @\r\n       'oKKo' ,KWXo.        @\r\n         .oKXo:kWNNx.       @\r\n           'xXXXN0OXk'      @\r\n             ;kXXl.oX0;     @\r\n               ,'   cXK:    @\r\n.:looooooollc:;,...  :KXl   @\r\n.cc::ccllodxkO0KKKOxocdXXo. @\r\n              ..';cox0XNNNo.@\r\n                     .,ckXO'@\r\n                         .. @\r\n                            @@\r\n                        @\r\n                 ..,'   @\r\n            .':ox0K0l.  @\r\n       .,coxkkdxKKl.    @\r\n .codxkkxdc,..;xx'      @\r\n .:ol:'.    'dk:        @\r\n          .lOl.   ..    @\r\n        .:kd'    'kd.   @\r\n       ,xx;      .k0,   @\r\n     .dk:.        ,OO;  @\r\n   .l0Olcodxxxkkkkx0NXd'@\r\n  :ONXOxdl:;,'''',:cokKO@\r\n.xKxc,.               ..@\r\n.:'                     @\r\n                        @@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n       .            @\r\n      ,ko.          @\r\n      ;XNc          @\r\n      ,KW0,         @\r\n      ;KNNx.        @\r\n      :0dkNl        @\r\n      l0;;KK;    ...@\r\n      o0,.xN0dooool;@\r\n ..';l0XkxxONKl..   @\r\nxOOkxOXd'. .kNd.    @\r\n...  lO,    'ONd.   @\r\n    .Ox.     'ONx.  @\r\n    lK:       .kN0: @\r\n   '0k.        .lx; @\r\n   .;.              @@\r\n                 .     @\r\n   .c:.    .';ldkd,    @\r\n  .dNXd:loddd0NXd.     @\r\n,xkOXWKd:,.'oKk,       @\r\n...'kWO' .:O0c.    .',.@\r\n    lNXl;k0o. .,cod0Xx.@\r\n    ;KNX0xlcoool:,lX0' @\r\n   .lXNNOdoc,.    oNo  @\r\n  .xKXWK:        .OX;  @\r\n  .,'oWX;        ;XO.  @\r\n ..  :XNl        oNo   @\r\ncKXkcoKWd.      '0X;   @\r\n.;ok0XNNKo,..  'kXl.   @\r\n    .'o0O0KK0kxxd,     @\r\n       . ..',,..       @@\r\n    .'.                @\r\n   'kKo.    .,.        @\r\n  .dNWO.   cKNO'       @\r\n  :XNNNd. ;KX0:        @\r\n .kW0dKNd'dWOc.        @\r\n :XWo.,ONKKWk;.        @\r\n oWX:  .dNNWx'.    ''  @\r\n.xW0'   .lKKc.    .kXd.@\r\n.kWO.     ..       ;KNl@\r\n.OWO.              '0Wd@\r\n.kW0'             .oNX:@\r\n lNNl            ,kX0: @\r\n .xNKc.     ..'cxKOc.  @\r\n  .cOKOxooodddddc'     @\r\n     .,,;,,...         @@\r\n    ..                 @\r\n   .x0c                @\r\n   .xW0'        ....'..@\r\n.,,'oNNd;:clodxkkkk0XXo@\r\n:OK0KNWXOxdlc:,'...oNXc@\r\n ...,OWK:         ,0Wx.@\r\n     oNNl        'ONx. @\r\n     ;XWx.      ;0Nd.  @\r\n     .OW0'    .lKKl.   @\r\n     .dWX:   ,kXk'     @\r\n      cXWd.,xKO;       @\r\n      ,0WKO0x;.        @\r\n;xkdllxXWNx.           @\r\n,xO0Oxoll;.            @\r\n  ..                   @@\r\n         .oo.            @\r\n         .dN0c.          @\r\n          ;KKOk:. .;'    @\r\n          .xXl:k0dkO,    @\r\n           ,00,.lKX:     @\r\n       .....;00; ',      @\r\n    ,oOOOOOOkKWKc.     ..@\r\n  .d0x;'..';:ld00,    'kl@\r\n 'kO,          ..    .x0'@\r\n.oNk'                l0: @\r\n .c0Kd,            .dO;  @\r\n    .l0Xkl;'.....':dko.  @\r\n     .:x0XXK00000xc.     @\r\n        ..,,,,,'.        @\r\n                         @@\r\n ..    ,,                 @\r\n.xKx:'lXX:                @\r\n.:dOKKXNN0l;,....         @\r\n    .';xNNX00OOOOOkkkkkxxo@\r\n       'OW0;....',,,,,,'''@\r\n        cXNd.             @\r\n      ':oKWK;.....        @\r\n     .xKXNNNKkkkko.       @\r\n       ..:0WXl..          @\r\n          lNWd.           @\r\n          .kWK;           @\r\n           :XWx.          @\r\n           .kWX:          @\r\n            'ol.          @\r\n                          @@\r\n      ;l;.                @\r\n     ;KWNKOdl;..          @\r\n     cNXo:lx0XKOxol:,...  @\r\n    .xWO'   ..;codk0Odc.  @\r\n    '0Wo           .      @\r\n    :XX:    ..            @\r\n   .dWO.  .xKKOkxddxxkkkxc@\r\n   '0Wl   ,0WKocokKX0xo:,.@\r\n   lNK,   .kWXkddl:'.     @\r\n  .OWd. .:dKWXl.          @\r\n  :XXl:dkdl0WK,           @\r\n .kWX0x:. .dOl.           @\r\n :XNk,     .              @\r\n ;o;.                     @\r\n                          @@\r\n         .lxx;        @\r\n  .ck,  .dWM0'        @\r\n  .kWo   ;KWNl        @\r\n  .xWd.  .kWWO.   .,. @\r\n  .kWo    lXNXo:ool:. @\r\n  .ON:   .l0XWKo,.    @\r\n  ,KX:.:oddd0W0'      @\r\n,cxXNOdo;.  cXXc      @\r\n;xKWO,      '0Wx.     @\r\n .ONl       .dWK,     @\r\n ;XK,        :XNl     @\r\n.dWx.        .kWO'    @\r\n'0Nl          :XNo    @\r\n,Ok'           ;l,    @\r\n .                    @@\r\n                    .. @\r\n                  .:kx.@\r\n         .dk,  .;dkx:. @\r\n         :XNklxOxc.    @\r\n       .;xNNKd:'       @\r\n   .,lxOxOXWd.         @\r\n.cxOOd:. ;KWd.         @\r\n;xo,.    ;KWd.         @\r\n         ;XWd.     .:x:@\r\n         :XWd.   ,d0kl'@\r\n         :XWd.'ckOo'   @\r\n         :XWX00kc.     @\r\n      .;lOKOo;.        @\r\n  .;okOkd:.            @\r\n  ;xo:'.               @@\r\n                     .,.@\r\n                 .;coool@\r\n           .';loool:'.  @\r\n    ..';cox0Xx:'.       @\r\n ,dxxxdoc;:OWk.         @\r\n .,..      ;KNo         @\r\n            lNK;        @\r\n      ..';:'.dNk.       @\r\n,oddxkOkdl:. 'ONl       @\r\n,loxk0KOd:.   :XK;      @\r\n     .':dOKkc'.oNk.     @\r\n         .,o0KxdKNo.    @\r\n            .;xKNNXc    @\r\n               'oKWK;   @\r\n                 .ll'   @@\r\n    :Oc.   cKx.             @\r\n   .dW0,   .kNk.            @\r\n   ;KWX:    'OWx.           @\r\n  :OxxXl    c0k'            @\r\n'dk:.;Xx. 'xOc.             @\r\n.'.  ,Kk,cOd.          ...''@\r\n     '0XOd,...',:cllllclkXKd@\r\n    .cKN0dllllll:;'...'oKk; @\r\n   .cxONk;..        .:00c.  @\r\n      ;Xk.         'xXx.    @\r\n      .OK,        :KK:      @\r\n       dNc      .oXO'       @\r\n       :Xx.    .xXx. ..,,,. @\r\n       .l:.   .kWXxlllc:;'. @\r\n              ,oc;'.        @@\r\n.c:.                  @\r\n'0No                  @\r\n :XXc                 @\r\n .oNO'                @\r\n  '0Nl                @\r\n   oWO.               @\r\n   :NK,               @\r\n   ,KN:        ..     @\r\n   .OWl       ;0Kl.   @\r\n   .kWo       .dNXl   @\r\n   .kWk;''''.. .dNXc .@\r\n   .xXOkkkOO00OxkXNXd'@\r\n    .........,:ldk0KO;@\r\n                  ... @\r\n                      @@\r\n             .;,      @\r\n.,,.        .dWK;     @\r\n:XNk'       .OWNx.    @\r\n'OWN0;      :XNW0,    @\r\n oNNNK:   .cONXNXc    @\r\n ;KNNNKc .dNNOo0Wd.   @\r\n .xNK0NXloXWX:.xWO'   @\r\n  cNKldNNNNXo  cNX:   @\r\n  '0Nl.oKKd:.  ,0Wd.  @\r\n  .xWx. ..     .xW0'  @\r\n  .dW0,         cNNc  @\r\nkX00NX;         'OWk. @\r\n.l0NNX:          oNXc @\r\n  .d0d.          '0WO'@\r\n    .             ,ol'@@\r\n              ..   @\r\n            .cO0l. @\r\n ':'       .oNNx.  @\r\n.oNXx,     ;KWO'   @\r\n .oXWXx,   lNNo    @\r\n  .oNNNXd'.lNNl    @\r\n   .xNNXNKoxNNl    @\r\n    '0WOoONNNNx.   @\r\n     cXNc'dNNNK,   @\r\n     .xWO'.lKNNd.  @\r\n      :XNc  :KWX:  @\r\n      .kWO.  cXWO' @\r\n       cXNc  .dNXo.@\r\n       .OWx.  .''. @\r\n        .;'        @@\r\n                ..       .:,@\r\n        ...  'cdOOl.  .:dko,@\r\n       'kOccoo:;kW0:;dxo;.  @\r\n      .dN0d:.  .xWXOo;.     @\r\n     ,xXK:   .:xXNd.        @\r\n   ;doxNk..:dxdkNK;         @\r\n 'xx,.oN0xkd:..xWd.         @\r\n.ONd:dKNk;.   :X0,          @\r\n.oOOxxXX:    'OXc           @\r\n  .  ,0K,   .dNo.           @\r\n     ,KK,  .oXd.            @\r\n     ;KK, .dKl.             @\r\n     ,KNockk,               @\r\n     .dXKkc.                @\r\n       ..                   @@\r\n  ;dd;                 @\r\n  ,ONXkc.              @\r\n   .xNNNKkl;.          @\r\n    .dNN0dkKKkl;.      @\r\n     .xWK; .;okKKxc'   @\r\n      'OWk.    .:xXXx:.@\r\n       :XNl  .':ldkO0O:@\r\n       .xNKdoooc;'...  @\r\n   .,codkXWx'          @\r\n.lxkxl,..xWk.          @\r\n,c,.     cNK,          @\r\n         'ONl          @\r\n         .kNl          @\r\n          .,.          @\r\n                       @@\r\n      ..        .cko.@\r\n     l0c     .:d0NMx.@\r\n    '00,  .:dkd:lKNl @\r\n    cN0clxkd:.  cNK, @\r\n .,c0WXOo;.    .dMx. @\r\n'OKKNNl        '0Nc  @\r\n.'.;KX;        :N0,  @\r\n   ,KX;       .xWd.  @\r\n   '0N:     ,;cKK;   @\r\n   .OWc    :XWNWx.   @\r\n   .xMx.    ;0WW0c.  @\r\n    ;XNo.   .kNKNWKd;@\r\n     cXNOl::kKc.;dkOo@\r\n      'ok00Oo'       @\r\n                     @@\r\n ;dl'                        @\r\n lNWKxc'.                    @\r\n .oXNNXK0kdoc;''..           @\r\n  .dNNx,,:loxkkOOkkxd:.      @\r\n   .dNXc      ...;xXKd.      @\r\n    .xNK:     ':oOkc.        @\r\n     .kWK; .:xkko,           @\r\n      'ON0xkd;.              @\r\n     .;ONW0;                 @\r\n  .;oOXKKNXd,...             @\r\n .d0Okkxk0NNKOOOkdl:'.       @\r\n  ..     ,0WO;',;cdk00xc,.   @\r\n         .o0l.      .;oOKOo;.@\r\n           .            ,oxo.@\r\n                             @@\r\n       ,o;             @\r\n      .xWK:            @\r\n      .OWNXd,.      .. @\r\n      ,KXdokkd:.  .cOd.@\r\n      :NO.      'o0NO,.@\r\n      cN0,  .'cdONXo.  @\r\n      .xX0ddddod0O;    @\r\ncOxc.   .''...c0x.     @\r\n.lkXKd,     .dKo.      @\r\n   'o0Xx,  .dXo        @\r\n     .oXXl.lNx.        @\r\n       :KXOX0,         @\r\n        :KWXl          @\r\n        .xXd.          @\r\n         .'            @@\r\n                    .'ckKo.@\r\n                .'codkXNk. @\r\n           ..;lodoc,.,kx'  @\r\n'c:'.',;cldOXOc'.     .    @\r\ncXNXOxdol;c0Wo             @\r\n ,dkl.    .OWo             @\r\n          ,KN:             @\r\n          :N0'             @\r\n          dWx.             @\r\n         .kWo              @\r\n         .ONl              @\r\n         .kWo              @\r\n          cNO.             @\r\n          .c0c             @\r\n            .'             @@\r\n       .lx,  .;'        @\r\n       ;KNc  cNO.       @\r\n       ,KWl  '0K,       @\r\n       ;XNc   oNo       @\r\n       lNK,   '00'      @\r\n      .xWx.    cKo.     @\r\n      ;KNc     .oKc     @\r\n     .dWk.      .xKl.   @\r\n     ;KX:        .xXx.  @\r\n    .kNo.        .,kNO; @\r\n    lNO.  .':loododxkOk;@\r\n   ,0Ndcodddlc,'..      @\r\n  .xNXko;..             @\r\n  .cc'                  @\r\n                        @@\r\n           .ok:@\r\n          .xNk.@\r\n          oNO' @\r\n ..      ;KX:  @\r\n.x0:    .dWk.  @\r\n ;KXl.  '0Nl   @\r\n  ;KNo. ;XX;   @\r\n   ;KNd.;XX;   @\r\n    :KNlcXX;   @\r\n     cXXOXX:   @\r\n      lXNNNc   @\r\n      .oNNNl   @\r\n       .oXXc   @\r\n         ''    @\r\n               @@\r\n        .colclll;.  @\r\n        .xNNkl:'.   @\r\n         .kNx.      @\r\n          'ONo.     @\r\n,xl.    .. :XK:     @\r\n.lXx. .dXd..dNO.    @\r\n .dNl ,0WXx.'ONl    @\r\n  '00':XKOXO,cX0,   @\r\n   dNloNd.oX0ldXd.  @\r\n   :XOOXc  cKKkKXc  @\r\n   .ONNK,   ,ONNNK: @\r\n   .dNWO.    .oXNWO'@\r\n    lNNo       ;0NNd@\r\n    :Kk.        .dOl@\r\n    ...           . @@\r\n                          .'.@\r\n                        .c:. @\r\n                      .ld;.  @\r\n                    .cOd.    @\r\n                   ;kO:.     @\r\n.:do;            .d0d.       @\r\n.xNNNk;         :0O;         @\r\n .':kNNOl,.   .xKd.          @\r\n     ,oOXX0dcl00:            @\r\n        ':oONWWOc'.      .:lo@\r\n          .xXkldO0Odc,.  .cc:@\r\n        ;k0Xd.   .;lxOOxoc;. @\r\n        cNWx.        ..;:c;. @\r\n        .:c.                 @\r\n                             @@\r\n            .c,             @\r\n     ..     '0K:            @\r\n    .xKl.    ;KKc           @\r\n     'dK0l.   oNXl.         @\r\n       'oKKo' ,KWXo.        @\r\n         .oKXo:kWNNx.       @\r\n           'xXXXN0OXk'      @\r\n             ;kXXl.oX0;     @\r\n               ,'   cXK:    @\r\n.:looooooollc:;,...  :KXl   @\r\n.cc::ccllodxkO0KKKOxocdXXo. @\r\n              ..';cox0XNNNo.@\r\n                     .,ckXO'@\r\n                         .. @\r\n                            @@\r\n                        @\r\n                 ..,'   @\r\n            .':ox0K0l.  @\r\n       .,coxkkdxKKl.    @\r\n .codxkkxdc,..;xx'      @\r\n .:ol:'.    'dk:        @\r\n          .lOl.   ..    @\r\n        .:kd'    'kd.   @\r\n       ,xx;      .k0,   @\r\n     .dk:.        ,OO;  @\r\n   .l0Olcodxxxkkkkx0NXd'@\r\n  :ONXOxdl:;,'''',:cokKO@\r\n.xKxc,.               ..@\r\n.:'                     @\r\n                        @@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n";

// ../../assets/fonts/Hacker2.flf
var Hacker2_default = "flf2a$ 20 19 33 0 3 0 64 0\r\nFont Author: yuu\r\n\r\ntest font 1\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n    ',.                        @\r\n   .lkxc.                      @\r\n    ;xxx:                      @\r\n    'dxxd;                     @\r\n    .oxxxd,                    @\r\n    .oxxxxo'                   @\r\n    .lxxdxxo.  .,cc;           @\r\n    .lkx:;dxl,;oxl,.           @\r\n    .lkx;.:xxxdc'              @\r\n  ...'oxxocccoxd,              @\r\n....;dxx:.  .:xd:.             @\r\n    .oxx,     ,oxl'            @\r\n    'dxd'      .:dd:.          @\r\n    ;xxo.        .cdo;.        @\r\n   .cxxc           'cdo;.      @\r\n    ':;.             'cdo;.    @\r\n                       .:dd:.  @\r\n                         .,:,. @\r\n                               @\r\n                               @@\r\n                       @\r\n                       @\r\n       .......         @\r\n   .':lddxxxxdl:'      @\r\n  'oxxdc::ccodxxxc.    @\r\n ;dxxxo;.    .'cdx;    @\r\n'dc;ldxxl.      :x;    @\r\ncx;  'lxxd;     co.    @\r\n;lxo.   ;dxx:.  ,l'    @\r\n,dxo,   'oxxc.;dc,,,,..@\r\n :xxxl;. .oxxdxxxxxxxxo@\r\n  'lxxd'  'oxxdc::::lxd@\r\n    .,.    ,dxl.    ,d:@\r\n            ;xx;   'o: @\r\n            .cxo. ,o;  @\r\n             .oxc:l'   @\r\n              ;xxo.    @\r\n              .lx;     @\r\n               ':.     @\r\n                       @@\r\n                          @\r\n                          @\r\n               .          @\r\n             'col'        @\r\n     .......,dxd,         @\r\n  .,col;,cdddxxc.         @\r\n 'oxd;.  .cxxxd'          @\r\n'oxo'     'dxx:           @\r\n.oxx;      ,dxx;          @\r\n:xxd'      cxxd'          @\r\ndxxo.      .;;'           @\r\ndxxd'                   .,@\r\n'oxx:                 .cx @\r\n.lxd:.             .;oxl' @\r\n .;oxo,.        .'coo:'   @\r\n   .':ll:;;;;;,:c:;.''    @\r\n       .........          @\r\n                          @\r\n                          @\r\n                          @@\r\n                         @\r\n                         @\r\n        ...';;;...       @\r\n   .':lool:;,,,,;:;'.    @\r\n  ,oxxxc.        .;oo;.  @\r\n.cxxoldd;.         ,dxl. @\r\n:xxd' .lxl.        .oxxo @\r\n.oxxc.  .:dd;       .oxxd@\r\n.lxx:     ,oxc.     ,dxx:@\r\n,dxo.     .lxl.   .cxxd. @\r\n 'ldl.     .lxo.  ;xxx;  @\r\n    ''.    .lxo,,dxxc.   @\r\n            .lxddxxo'    @\r\n             'oxxxx:     @\r\n              ;xxxo.     @\r\n              'dxx:      @\r\n              .okx;      @\r\n               ';;'      @\r\n                         @\r\n                         @@\r\n                     @\r\n                     @\r\n    .',,'.     .     @\r\n .;cclodxdc'  ':     @\r\n,d:.   .;oxxcco,     @\r\n,xo.      'oxxx;     @\r\noxd'       ;xxl.     @\r\noxxl.      ,xx;      @\r\n.cxxo:.    ;xd'      @\r\n.,ldxdl:,';:.        @\r\n  ,looodxdl.         @\r\n .c:.. ....        od@\r\n;d:              .cod@\r\n'dx,              :d;@\r\n,xxo.           .:l' @\r\n.lxxo:'..    .';:'   @\r\n.,ldxxdolcc:;,.      @\r\n   ..',,,'.          @\r\n                     @\r\n                     @@\r\n   ..''..    @\r\n .cdxxdooc'  @\r\n.oxxd:..cxx: @\r\n.oxxc.  ,dxd,@\r\n.cxxc.  .oxx:@\r\n .oxd'  .oxxc@\r\n 'dxo.  ,lo: @\r\n  ,dxc'.,:llc@\r\n..;dxxdc,'';:@\r\n:::;,:dxc.   @\r\n     ,dxc.   @\r\n      ,dxc.  @\r\n       ;dxc. @\r\n       .cxx; @\r\n        'dxo.@\r\n        .oxx:@\r\n        .oxxc@\r\n        'oxx:@\r\n         ..' @\r\n             @@\r\n                        @\r\n            ..          @\r\n          .;do.         @\r\n          .okd'         @\r\n          .oxx;         @\r\n      .';;cdxxo.        @\r\n   .;coc,,:oxxxc.       @\r\n  ;dxx:    .cxxd' .:c:, @\r\n 'dkkd.     .','':dxxxl @\r\n;lxxkd.      .;ldxxxxd  @\r\ncxxxx, ..,:lddodxxxx'   @\r\n.;oxxxl.........cxxx'   @\r\n  ;xxxx:        :xxx'   @\r\n  .:dxxx:.      :xxxx;  @\r\n    .;dxxo,.    :xxdxl. @\r\n      .;oxxdl:,;oo,,ox; @\r\n        .,;::;,.   'dx' @\r\n                    'ox.@\r\n                     .o.@\r\n                        @@\r\n   ''.              @\r\n  ,xxo'             @\r\n  cxxl.             @\r\n  cxx:       ..     @\r\n  ;xxc.    .lxc     @\r\n  .oxd'    ,dxo.    @\r\n   :xx:    .lxx:.   @\r\n   ,dkl...';oxxd;   @\r\ndolldxdodddlloxd,   @\r\n:cllloxxo;..  ;xxl. @\r\n    .lxd'    .lxd,  @\r\n     ;xx:     ;xxc  @\r\n     .dko.    .oko. @\r\n     .okd'    .lkd' @\r\n     .oxx;     cxd:.@\r\n     .oxx;     :xxx @\r\n     ;xxd'     cko; @\r\n    'oxxc.    .ox;  @\r\n    'xxo.     ,xc.  @\r\n    ,oc.     .;,.   @@\r\n                   @\r\n                   @\r\n                   @\r\n       ..,:.       @\r\n .;;;:cll;.        @\r\n'odooxxl.          @\r\n .. 'dkd.          @\r\n    .lxx;          @\r\n     ;xxl.         @\r\n     .oxd'         @\r\n     .lxx:         @\r\n      ;xxl.        @\r\n      'dxd'        @\r\n      .cxxo        @\r\n      ,:lc         @\r\n       olc;'.      @\r\n      ,''..        @\r\n                   @\r\n                   @\r\n                   @@\r\n                     @\r\n                     @\r\n                .,.  @\r\n             ...':d; @\r\n.:c:,',,,,;::::ccclx:@\r\n.;:ccc:;;oxd;        @\r\n        ;xx;         @\r\n        .oxo.        @\r\n       ..;dxc.       @\r\n     .:, .cxx;       @\r\n    ,o,   .lxd,      @\r\n   ,dc.    'dko.     @\r\n .'lx;      :xx,     @\r\n xdxxc.     'xd'     @\r\n  ,lxd:.    ;l'      @\r\n   .:oxdl;,'..       @\r\n     .....           @\r\n                     @\r\n                     @\r\n                     @@\r\n                    @\r\n                    @\r\n.,;.                @\r\n':dx;     ',.       @\r\nlodx:    'd.        @\r\n.cxo. 'lxd,         @\r\n .lxc:dxxo:;,'.     @\r\n  'oxxxdl;'..'ll.   @\r\n   ,dxo'     .ck:.  @\r\n    ;dd'     .lkc.  @\r\n     ;xo.    .ok:   @\r\n     .cxl.   ,dx;   @\r\n      'dx;   ;xd'   @\r\n       :ko.  ;xo.   @\r\n       ,xd,  ;xl.   @\r\n       'oo'  ,xo.   @\r\n        ..   .ld'.,.@\r\n              'oc.  @\r\n               .;.  @\r\n                    @@\r\n                       @\r\n                       @\r\n.'.                    @\r\n.cxo.                  @\r\n;xx;                   @\r\n.okl.                  @\r\n :xd,                  @\r\n 'dx:                  @\r\n .lkl                  @\r\n :ko.                  @\r\n ,xd.                  @\r\n 'xd.                  @\r\n ,xo.        ..okl;lxx;@\r\n ;xc.  .,;cllodoxo..:  @\r\n :xc,:c::;'....,xo.    @\r\n.od:,.                 @\r\n                       @\r\n                       @\r\n                       @\r\n                       @@\r\n                       @\r\n         .:l'          @\r\n         ;xxc.         @\r\n         ;xxd'         @\r\n.;.      ;xxx:         @\r\n.oxo'    .cxxxd'       @\r\n:xxo'   .lxodxc        @\r\n.oxxo'  .do':xd'       @\r\n :xxxo' ,xc .oxc.      @\r\n 'dxxxo,cx,  ;xd,      @\r\n .lxddxdxo.  .lko.     @\r\n ,okl;lxx;    'dx:     @\r\n  oxo..:,      :xd,    @\r\n  ,xo.         .oxo.   @\r\n  .:'           ,dxl.  @\r\n                 ;dxl. @\r\n                  ;dx' @\r\n                   ,dx.@\r\n                    .'.@\r\n                       @@\r\n                @\r\n                @\r\n          ..    @\r\n         .ldc.  @\r\n         ;xxo.  @\r\n..       ;xxo.  @\r\n;doc.     ;xxl. @\r\n.oxxl.    ,dko  @\r\n:xxxo.   .dkd   @\r\n'dxxxo'  .oxx   @\r\n.lxxxxd; .cxx   @\r\n cxxllxx:.;xx   @\r\n ;xx:.;xxlcxx   @\r\n ,xxl. ,dxxxx;  @\r\n 'dko.  .lxxxx  @\r\n 'dko.   .cxxxc @\r\n 'oxl.    .:xko.@\r\n  ...       ';,.@\r\n                @\r\n                @@\r\n               @\r\n               @\r\n               @\r\n     ....      @\r\n   'codxo:.    @\r\n  'c,.;oxxxo.  @\r\n 'dc.  .:dxxo. @\r\n;lx,     ,dxxl @\r\noxd'      ;xxx @\r\nxxd'      .oxxx@\r\nxxx;       cxxc@\r\nxxxl.      ;xx,@\r\nxxxx;      ;xo.@\r\n xxxd,     :x; @\r\n llxxd:.  .oc. @\r\n  'cxxxdl:c;.  @\r\n    ,cooc;.    @\r\n     'cd'      @\r\n               @\r\n               @@\r\n                 @\r\n                 @\r\n   ...';ccc;.    @\r\n 'co:.  .':dxl,  @\r\n.cdloxl.    .lxx;@\r\noxo..cxo'    .oxd@\r\nxxd' .:xd;   .odd@\r\nxxl. .:xx;..lc,  @\r\n:lc'  .:xdl:'    @\r\n       .cxd'     @\r\n        .okl.    @\r\n         ,dx:    @\r\n         .lkd'   @\r\n          :xx:   @\r\n          ,dkc.  @\r\n          'dxc   @\r\n           ...   @\r\n                 @\r\n                 @\r\n                 @@\r\n                 @\r\n                 @\r\n                 @\r\n   .;::c:,.      @\r\n ,::;:lxxxd:.    @\r\n.cd'    'cxxxl;  @\r\ndxc.      ;dxxxx @\r\ndxx:        ;dxx @\r\ncxxc.       .cxx'@\r\n;xxo.        dxl.@\r\n'dxx:       .okl.@\r\n.cxxd,   .''.'dx;@\r\n.oxxd:.,oxxood:. @\r\n .lxxxoccoxxxd'  @\r\n  ,cdxxdoloxxo.  @\r\n    ..... 'dxxl. @\r\n           :xxd, @\r\n           .cl;. @\r\n                 @\r\n                 @@\r\n      ..             @\r\n .,,'',:cc;'         @\r\n.:odd;.  .;oxl'      @\r\n'od;'ox;    .lxd,    @\r\nlkl. ,dd'    ,xx;    @\r\nxxo.  :xl.   :xo.    @\r\n dd;  .lx; .:dxoc:;..@\r\n '.   ;xd:;,...,okcc @\r\n     .okc.     :xoc. @\r\n     .cko.    .ox    @\r\n      ;xx,    :d:    @\r\n      ,xx:   .ol.    @\r\n      ;xxc.  :d'     @\r\n      :xx:  .dl.     @\r\n     .ckd'  ;xc      @\r\n      .'.  .ck:      @\r\n          .ckc.      @\r\n           :xo.      @\r\n           'dxc.     @\r\n            ;dx      @@\r\n                   @\r\n                   @\r\n     .             @\r\n    ;o'            @\r\n    ;xl.           @\r\n   .;dxo.          @\r\n .,;codxxo,        @\r\n.oo. .':dxd,       @\r\n lxo:'...,'.       @\r\nc. ':lool:,'.      @\r\noc.   ..,:lddc;.   @\r\ndx,        .,lxd:. @\r\ncxc           'lxl.@\r\n'dd'           .od'@\r\n.:xo'           co.@\r\n .:xd;.        .c' @\r\n   'lxdc,.. .....  @\r\n      ';cllc:,'.   @\r\n                   @\r\n                   @@\r\n                 @\r\n                 @\r\n                 @\r\n        ..';:cox @\r\n.....';:loll;,...@\r\nlddolc:cdxxo'    @\r\n';.'   ;dxxo'    @\r\n       ;ddxo.    @\r\n        .:xxl.   @\r\n         .cxxc.  @\r\n          .oxx;  @\r\n           ;xxo. @\r\n           .oxx; @\r\n           .cxxl.@\r\n            cxxo.@\r\n           .lxxo.@\r\n           .;cl; @\r\n                 @\r\n                 @\r\n                 @@\r\n                 @\r\n..               @\r\ndo,              @\r\n'ld:.     ''     @\r\n.ox:.   .oxl.    @\r\n ;xx,   .lkx;    @\r\n 'dkl.  .oxxc.   @\r\n .okd'  'dxxo.   @\r\n .lkx,  :xxxx,   @\r\n .lxx; 'dxxxxc   @\r\n .oxx;.lxxddxo.  @\r\n .oxx::xxd;:xx;  @\r\n 'dxxddxx; .okl. @\r\n .cxxxxx:.  ;xx; @\r\n  .':cc,    .cko.@\r\n             .ox:@\r\n             .cl'@\r\n                 @\r\n                 @\r\n                 @@\r\n              @\r\n              @\r\n.'.           @\r\n.co;.         @\r\n.cdl.       ',@\r\n ,dd,      'dc@\r\n  'ox:.    .do@\r\n   .lxc.   .ox@\r\n    .lxc.  .do@\r\n     .lx:  ,d;@\r\n      .ox, ;d'@\r\n       ,do,cd.@\r\n        :xodc.@\r\n        .oxx; @\r\n        .cxd' @\r\n         ;xl. @\r\n         .:.  @\r\n              @\r\n              @\r\n              @@\r\n                  @\r\n     ..           @\r\n   .;ll;.         @\r\n     .;dd;.       @\r\n        .cxo,     @\r\n'.         ,dxdx  @\r\nxd;   ...   'oxxx @\r\noxd' .cxd,   ,dxdo@\r\n,dxl..cxxl.  .cxd,@\r\n.cxx,.lxxxc.  ;xx,@\r\n,dxl..cxxl.  .cxd,@\r\n.cxx,.lxxxc.  ;xx,@\r\n'dkl;oxxxx:  :xo. @\r\n.cxddxxccxd,.lkl. @\r\n 'dxxxd..lxocdx:  @\r\n .cxxxc. ,dxxxd'  @\r\n  ;xkd'  .cxxxl   @\r\n  .,;'    'dxxc   @\r\n           cxxl   @\r\n           .:l:   @@\r\n               @\r\n               @\r\n       ;c.     @\r\n      .dl.     @\r\n      .lx,     @\r\nd,     .ck:    @\r\ndc.   .lkc     @\r\n'dd:. .dx;     @\r\n'cddclxo.      @\r\n  .:dxxl.      @\r\n   'oxdxo;     @\r\n  ,dxc.,dxc.   @\r\n .:xd;.  .lx:  @\r\n.lxo'     .dd. @\r\n,cko.      .cx,@\r\n'lx,        cx:@\r\n..,.      .;c' @\r\n.         ''.  @\r\n               @\r\n               @@\r\n                      @\r\n       '              @\r\n      ':'             @\r\n      lol.            @\r\n .c:..okc.            @\r\n ,xl..lkl.            @\r\n ,xl..ckd             @\r\n ,xl..lxxo.           @\r\n ,xl..oxdxo.          @\r\n ,xl.'xl,lxo'         @\r\n ,xo,cd' .cxd:.       @\r\n .oxl:.    ;dxl'      @\r\n  ...       .cxd:.    @\r\n   ..'',,;;;;:oxxl'   @\r\n..'''''''''',;coxxxd  @\r\n'               ';cdxl@\r\n                  ,'d @\r\n                      @\r\n                      @\r\n                      @@\r\n                      @\r\n                      @\r\n                      @\r\n                      @\r\n.oxxdl,...   ....     @\r\n,dxxxdddlc::lc.       @\r\n ;xxo'....,:,         @\r\n .okl.  .;:.  .       @\r\n .::.  .c;  .:o:      @\r\n      ,o,   'dxd,     @\r\n     :o,    .cxxd;    @\r\n    :d;      .cxxxc.  @\r\n   ;d:    ..',cdxxxo' @\r\n ;do..',;;::cldxxxxd:.@\r\n dxl,...      ..;lxdl @\r\ncdxl'              .. @\r\n.,'                   @\r\n                      @\r\n                      @\r\n                      @@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@\r\n@@\r\n";

// src/ascii/custom-fonts.ts
var customFonts = {
  "Hacker": Hacker_default,
  "Hacker2": Hacker2_default
};
var customFontNames = Object.keys(customFonts);

// src/sections/asci.ts
function hasInk(fontName, charCode) {
  const font = nodeFiglet.figFonts?.[fontName];
  if (!font) return false;
  const glyph = font[charCode];
  if (!glyph) return false;
  const hardBlank = font.options?.hardBlank;
  return glyph.some((line) => {
    let cleaned = line;
    if (hardBlank) {
      cleaned = line.split(hardBlank).join(" ");
    }
    return cleaned.trim().length > 0;
  });
}
function patchFlfSpace(data) {
  if (data.charCodeAt(0) === 65279) {
    data = data.slice(1);
  }
  const lines = data.split(/\r?\n/);
  const header = lines[0];
  if (!header || !header.startsWith("flf2a")) return data;
  const hardblank = header.charAt(5);
  const headerParts = header.split(" ");
  const heightStr = headerParts[1] ?? "0";
  const commentLinesStr = headerParts[5] ?? "0";
  const height = parseInt(heightStr, 10);
  const commentLines = parseInt(commentLinesStr, 10);
  if (isNaN(height) || isNaN(commentLines)) return data;
  const spaceStartIndex = 1 + commentLines;
  if (lines.length >= spaceStartIndex + height) {
    let isEmpty = true;
    for (let i = 0; i < height; i++) {
      const line = lines[spaceStartIndex + i];
      if (!line || !/^@+$/.test(line)) {
        isEmpty = false;
        break;
      }
    }
    if (isEmpty) {
      const spacer = hardblank.repeat(4);
      for (let i = 0; i < height; i++) {
        const line = lines[spaceStartIndex + i];
        if (line !== void 0) {
          lines[spaceStartIndex + i] = spacer + line;
        }
      }
      return lines.join("\n");
    }
  }
  return data;
}
function processTextForFont(text, font) {
  const hasUpper = hasInk(font, 65);
  const hasLower = hasInk(font, 97);
  if (hasUpper && !hasLower) {
    return text.toUpperCase();
  } else if (hasLower && !hasUpper) {
    return text.toLowerCase();
  }
  return text;
}
function renderAscii(text, font = "Standard") {
  let textToRender = text.trim();
  if (!textToRender) {
    throw new Error("ASCII text cannot be empty");
  }
  if (customFonts[font]) {
    let fontContent = customFonts[font];
    fontContent = patchFlfSpace(fontContent);
    nodeFiglet.parseFont(font, fontContent);
    textToRender = processTextForFont(textToRender, font);
  }
  return nodeFiglet.textSync(textToRender, {
    font,
    width: 1e3,
    whitespaceBreak: true
  });
}
var asciiSection = {
  id: "ascii",
  render(_data, config) {
    const { text, font } = config.sections.ascii;
    const art = renderAscii(text, font);
    const output = config.sections.ascii.showCats ? addCatsToAscii(art) : art;
    const styleText = config.style === "classic" ? (config.styleText ?? "").trim() : "";
    const suffix = styleText ? `
${styleText}` : "";
    return `\`\`\`text
${output}${suffix}
\`\`\``;
  }
};

// src/sections/stats.ts
var statsSection = {
  id: "stats",
  render(data, config) {
    const { showCommits, showStars, showFollowers } = config.sections.stats;
    const lines = [];
    if (showCommits) {
      lines.push(`Commits | ${data.totalCommits}`);
    }
    if (showStars) {
      lines.push(`Stars   | ${data.totalStars}`);
    }
    if (showFollowers) {
      lines.push(`Followers | ${data.followers}`);
    }
    if (lines.length === 0) {
      return "";
    }
    const maxLen = Math.max(...lines.map((l) => l.length));
    const border = "+" + "-".repeat(maxLen + 2) + "+";
    const formatted = lines.map((l) => `| ${l.padEnd(maxLen)} |`).join("\n");
    return `#### Stats

\`\`\`text
${border}
${formatted}
${border}
\`\`\``;
  }
};

// src/sections/languages.ts
function createBar(percentage, width = 20) {
  const filled = Math.round(percentage / 100 * width);
  const empty = width - filled;
  return "\u2588".repeat(filled) + "\u2500".repeat(empty);
}
var languagesSection = {
  id: "languages",
  render(data, config) {
    const { topN } = config.sections.languages;
    const langs = data.topLanguages.slice(0, topN);
    if (langs.length === 0) {
      return "";
    }
    const maxNameLen = Math.max(...langs.map((l) => l.name.length));
    const lines = langs.map((l) => {
      const bar = createBar(l.percentage);
      const pct = l.percentage.toFixed(1).padStart(5);
      return `${l.name.padEnd(maxNameLen)} [${bar}] ${pct}%`;
    });
    const maxLen = Math.max(...lines.map((l) => l.length));
    const border = "+" + "-".repeat(maxLen + 2) + "+";
    const formatted = lines.map((l) => `| ${l.padEnd(maxLen)} |`).join("\n");
    return `#### Languages

\`\`\`text
${border}
${formatted}
${border}
\`\`\``;
  }
};

// src/sections/activity.ts
var activitySection = {
  id: "activity",
  render(data, config) {
    const { limit } = config.sections.activity;
    const events = data.recentEvents.slice(0, limit);
    if (events.length === 0) {
      return "";
    }
    const lines = events.map((event) => {
      const date = new Date(event.date);
      const formattedDate = date.toISOString().replace("T", " ").slice(0, 16);
      return `${formattedDate} | ${event.type.padEnd(14)} | ${event.repo}`;
    });
    const maxLen = Math.max(...lines.map((l) => l.length), 20);
    const border = "-".repeat(maxLen);
    const now = /* @__PURE__ */ new Date();
    const lastUpdated = now.toISOString().replace("T", " ").slice(0, 19);
    return `#### Activity

\`\`\`text
${border}
${lines.join("\n")}
${border}

Last updated: ${lastUpdated}
\`\`\``;
  }
};

// src/generator.ts
function extractCodeBlock(content) {
  if (!content) return [];
  const match = content.match(/```text\s*\n([\s\S]*?)\n```/);
  if (!match) return [];
  const block2 = match[1];
  if (!block2) return [];
  return block2.split("\n");
}
function mergeColumns(left, right, gap = 4) {
  if (left.length === 0) return right;
  if (right.length === 0) return left;
  const leftWidth = left.reduce((max, line) => Math.max(max, line.length), 0);
  const rows = Math.max(left.length, right.length);
  const merged = [];
  for (let i = 0; i < rows; i += 1) {
    const leftLine = (left[i] ?? "").padEnd(leftWidth, " ");
    const rightLine = right[i] ?? "";
    merged.push(`${leftLine}${" ".repeat(gap)}${rightLine}`.trimEnd());
  }
  return merged;
}
function stackBlocks(blocks) {
  const result = [];
  for (const block2 of blocks) {
    if (block2.length === 0) continue;
    if (result.length > 0) result.push("");
    result.push(...block2);
  }
  return result;
}
function trimEmptyLines(lines) {
  const result = [...lines];
  while (result.length > 0) {
    const first = result[0];
    if (!first || first.trim() !== "") break;
    result.shift();
  }
  while (result.length > 0) {
    const last = result[result.length - 1];
    if (!last || last.trim() !== "") break;
    result.pop();
  }
  return result;
}
function centerText(text, width) {
  if (text.length >= width) return text;
  const left = Math.floor((width - text.length) / 2);
  const right = width - text.length - left;
  return `${" ".repeat(left)}${text}${" ".repeat(right)}`;
}
function buildBox(title, lines, minWidth = 0) {
  if (lines.length === 0) return [];
  const maxLine = Math.max(...lines.map((line) => line.length));
  const innerWidth = Math.max(minWidth, title.length, maxLine);
  const remaining = innerWidth - title.length;
  const filler = remaining > 0 ? ` ${"\u2500".repeat(Math.max(remaining - 1, 0))}` : "";
  const top = `\u250C ${title}${filler} \u2510`;
  const middle = lines.map((line) => `\u2502 ${line.padEnd(innerWidth)} \u2502`);
  const bottom = `\u2514${"\u2500".repeat(innerWidth + 2)}\u2518`;
  return [top, ...middle, bottom];
}
function buildValueBox(title, value) {
  const text = String(value);
  const width = Math.max(title.length, text.length);
  return buildBox(title, [centerText(text, width)], width);
}
function buildLanguagesBox(data, config) {
  const { topN } = config.sections.languages;
  const langs = data.topLanguages.slice(0, topN);
  if (langs.length === 0) return [];
  const maxNameLen = Math.max(...langs.map((l) => l.name.length));
  const barWidth = 12;
  const lines = langs.map((l) => {
    const filled = Math.round(l.percentage / 100 * barWidth);
    const empty = barWidth - filled;
    const bar = "\u2588".repeat(filled) + "\u2591".repeat(empty);
    const pct = l.percentage.toFixed(1).padStart(5);
    return `${l.name.padEnd(maxNameLen)} ${bar} ${pct}%`;
  });
  return buildBox("Languages", lines);
}
function buildActivityBox(data, config) {
  const { limit } = config.sections.activity;
  const events = data.recentEvents.slice(0, limit);
  if (events.length === 0) return [];
  const typeWidth = Math.max(4, ...events.map((e) => e.type.length));
  const lines = events.map((event) => `${event.type.padEnd(typeWidth)} ${event.repo}`);
  return buildBox("Activity", lines);
}
function buildStatsBox(data, config) {
  const lines = [];
  if (config.sections.stats.showCommits) {
    lines.push(`Commits ${data.totalCommits}`);
  }
  if (lines.length === 0) return [];
  return buildBox("Stats", lines);
}
function renderCompactLayout(data, config) {
  const asciiLines = config.sections.ascii.enabled ? extractCodeBlock(asciiSection.render(data, config)) : [];
  const statsLines = config.sections.stats.enabled ? extractCodeBlock(statsSection.render(data, config)) : [];
  const languageLines = config.sections.languages.enabled ? extractCodeBlock(languagesSection.render(data, config)) : [];
  const activityLines = config.sections.activity.enabled ? extractCodeBlock(activitySection.render(data, config)) : [];
  const left = stackBlocks([languageLines, activityLines]);
  const right = stackBlocks([statsLines]);
  const body = [];
  const styleText = (config.styleText ?? "").trim();
  if (asciiLines.length > 0) {
    body.push(...asciiLines);
    if (styleText) body.push(styleText);
  }
  const bottom = mergeColumns(left, right);
  if (bottom.length > 0) {
    if (body.length > 0) body.push("");
    body.push(...bottom);
  }
  if (body.length === 0) return "";
  return `\`\`\`text
${body.join("\n")}
\`\`\``;
}
function renderTerminalLayout(data, config) {
  const asciiConfig = {
    ...config,
    sections: {
      ...config.sections,
      ascii: { ...config.sections.ascii, showCats: false }
    }
  };
  const asciiLines = config.sections.ascii.enabled ? trimEmptyLines(extractCodeBlock(asciiSection.render(data, asciiConfig))) : [];
  const showStats = config.sections.stats.enabled;
  const followersBox = showStats && config.sections.stats.showFollowers ? buildValueBox("Followers", data.followers) : [];
  const starsBox = showStats && config.sections.stats.showStars ? buildValueBox("Stars", data.totalStars) : [];
  const topRow = mergeColumns(followersBox, starsBox, 2);
  const languagesBox = config.sections.languages.enabled ? buildLanguagesBox(data, config) : [];
  let middleBlock = [];
  if (topRow.length > 0) middleBlock = [...topRow];
  if (languagesBox.length > 0) middleBlock.push(...languagesBox);
  middleBlock = trimEmptyLines(middleBlock);
  if (config.sections.ascii.showCats && middleBlock.length > 0) {
    middleBlock = addCatsToAscii(middleBlock.join("\n")).split("\n");
  }
  const activityBox = config.sections.activity.enabled ? buildActivityBox(data, config) : [];
  const statsBox = showStats ? buildStatsBox(data, config) : [];
  const bottomRow = mergeColumns(activityBox, statsBox, 2);
  const body = [];
  const styleText = (config.styleText ?? "").trim();
  if (asciiLines.length > 0) {
    body.push(...asciiLines, "");
    if (styleText) body.push(styleText);
  }
  if (middleBlock.length > 0) {
    if (body.length > 0) body.push("");
    body.push(...middleBlock);
  }
  if (bottomRow.length > 0) {
    if (body.length > 0) body.push("");
    body.push(...bottomRow);
  }
  const finalBody = trimEmptyLines(body);
  if (finalBody.length === 0) return "";
  return `\`\`\`text
${finalBody.join("\n")}
\`\`\``;
}

// src/main.ts
var sections = [asciiSection, statsSection, languagesSection, activitySection];
function injectSection(content, sectionId, rendered) {
  const regex = new RegExp(
    `<!-- START_SECTION:${sectionId} -->[\\s\\S]*?<!-- END_SECTION:${sectionId} -->`,
    "g"
  );
  const replacement = `<!-- START_SECTION:${sectionId} -->
${rendered}
<!-- END_SECTION:${sectionId} -->`;
  if (!regex.test(content)) {
    throw new Error(`Missing marker for section: ${sectionId}`);
  }
  regex.lastIndex = 0;
  return content.replace(regex, replacement);
}
function removeSection(content, sectionId) {
  const regex = new RegExp(
    `\\n?<!-- START_SECTION:${sectionId} -->[\\s\\S]*?<!-- END_SECTION:${sectionId} -->\\n?`,
    "g"
  );
  return content.replace(regex, "\n").replace(/\n{3,}/g, "\n\n");
}
function ensureSection(content, sectionId) {
  const start = `<!-- START_SECTION:${sectionId} -->`;
  if (content.includes(start)) return content;
  const end = `<!-- END_SECTION:${sectionId} -->`;
  const suffix = content.endsWith("\n") ? "" : "\n";
  return `${content}${suffix}
${start}
${end}
`;
}
async function main() {
  const config = loadConfig();
  const data = await fetchGitHubData(config.username);
  const style = config.style ?? "terminal";
  const readmePath = "README.md";
  let readmeContent;
  if (!import_fs2.default.existsSync(readmePath)) {
    if (style !== "classic") {
      readmeContent = `<!-- START_SECTION:style --><!-- END_SECTION:style -->`;
    } else {
      readmeContent = sections.filter((s) => config.sections[s.id]?.enabled).map((s) => `<!-- START_SECTION:${s.id} --><!-- END_SECTION:${s.id} -->`).join("\n\n");
    }
    import_fs2.default.writeFileSync(readmePath, readmeContent);
  } else {
    readmeContent = import_fs2.default.readFileSync(readmePath, "utf8");
  }
  if (style !== "classic") {
    for (const section of sections) {
      readmeContent = removeSection(readmeContent, section.id);
    }
    readmeContent = ensureSection(readmeContent, "style");
    const rendered = style === "compact" ? renderCompactLayout(data, config) : renderTerminalLayout(data, config);
    if (rendered) {
      readmeContent = injectSection(readmeContent, "style", rendered);
    }
    import_fs2.default.writeFileSync(readmePath, readmeContent);
    return;
  }
  for (const section of sections) {
    const sectionConfig = config.sections[section.id];
    if (!sectionConfig?.enabled) continue;
    const rendered = section.render(data, config);
    if (rendered) {
      readmeContent = injectSection(readmeContent, section.id, rendered);
    }
  }
  import_fs2.default.writeFileSync(readmePath, readmeContent);
}
main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
