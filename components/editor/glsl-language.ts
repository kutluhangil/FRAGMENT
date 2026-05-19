import type { Monaco } from "@monaco-editor/react";

const KEYWORDS = [
  "void", "if", "else", "for", "while", "do", "return", "break", "continue",
  "discard", "const", "uniform", "varying", "attribute", "in", "out", "inout",
  "precision", "highp", "mediump", "lowp", "struct", "layout", "flat",
  "smooth", "centroid", "invariant",
];

const TYPES = [
  "float", "int", "uint", "bool", "double",
  "vec2", "vec3", "vec4",
  "dvec2", "dvec3", "dvec4",
  "ivec2", "ivec3", "ivec4",
  "uvec2", "uvec3", "uvec4",
  "bvec2", "bvec3", "bvec4",
  "mat2", "mat3", "mat4",
  "mat2x2", "mat2x3", "mat2x4",
  "mat3x2", "mat3x3", "mat3x4",
  "mat4x2", "mat4x3", "mat4x4",
  "sampler2D", "sampler3D", "samplerCube",
  "sampler2DShadow", "samplerCubeShadow",
  "sampler2DArray", "sampler2DArrayShadow",
  "isampler2D", "isampler3D", "isamplerCube",
  "usampler2D", "usampler3D", "usamplerCube",
];

const BUILTINS = [
  "radians", "degrees", "sin", "cos", "tan", "asin", "acos", "atan",
  "sinh", "cosh", "tanh", "asinh", "acosh", "atanh",
  "pow", "exp", "log", "exp2", "log2", "sqrt", "inversesqrt",
  "abs", "sign", "floor", "trunc", "round", "roundEven", "ceil", "fract",
  "mod", "modf", "min", "max", "clamp", "mix", "step", "smoothstep",
  "isnan", "isinf",
  "floatBitsToInt", "floatBitsToUint", "intBitsToFloat", "uintBitsToFloat",
  "packSnorm2x16", "unpackSnorm2x16", "packUnorm2x16", "unpackUnorm2x16",
  "length", "distance", "dot", "cross", "normalize", "faceforward",
  "reflect", "refract",
  "matrixCompMult", "outerProduct", "transpose", "determinant", "inverse",
  "lessThan", "lessThanEqual", "greaterThan", "greaterThanEqual", "equal", "notEqual",
  "any", "all", "not",
  "textureSize", "texture", "textureProj", "textureLod", "textureOffset",
  "texelFetch", "texelFetchOffset", "textureProjOffset", "textureLodOffset",
  "textureProjLod", "textureProjLodOffset", "textureGrad", "textureGradOffset",
  "textureProjGrad", "textureProjGradOffset",
  "dFdx", "dFdy", "fwidth", "emit", "endPrimitive",
];

const CONSTANTS = [
  "gl_FragColor", "gl_FragCoord", "gl_FragDepth", "gl_FrontFacing",
  "gl_Position", "gl_PointSize", "gl_PointCoord",
  "gl_VertexID", "gl_InstanceID",
  "true", "false",
];

const STANDARD_UNIFORMS = [
  "u_time", "u_resolution", "u_mouse", "u_mouse_delta", "u_frame", "u_dpr",
  "u_audio_low", "u_audio_mid", "u_audio_high", "u_audio_tex",
  "u_camera", "u_texture_0", "u_texture_1", "u_texture_2", "u_texture_3",
];

export function registerGLSLLanguage(monaco: Monaco) {
  // Only register once
  const existing = monaco.languages
    .getLanguages()
    .find((l: { id: string }) => l.id === "glsl");
  if (!existing) {
    monaco.languages.register({ id: "glsl" });
  }

  monaco.languages.setLanguageConfiguration("glsl", {
    comments: { lineComment: "//", blockComment: ["/*", "*/"] },
    brackets: [
      ["(", ")"],
      ["{", "}"],
      ["[", "]"],
    ],
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
    ],
    indentationRules: {
      increaseIndentPattern: /^.*\{[^}"']*$/,
      decreaseIndentPattern: /^\s*\}/,
    },
  });

  monaco.languages.setMonarchTokensProvider("glsl", {
    keywords: KEYWORDS,
    types: TYPES,
    builtins: BUILTINS,
    constants: CONSTANTS,
    standardUniforms: STANDARD_UNIFORMS,

    tokenizer: {
      root: [
        [/#\s*\w+/, "keyword.preprocessor"],
        [/\/\/.*$/, "comment.glsl"],
        [/\/\*/, "comment.block.glsl", "@comment"],
        [/\b(uniform)\s+/, { token: "keyword.glsl", next: "@uniformDecl" }],
        [/\b(attribute|varying)\s+/, "attribute.glsl"],
        [/\b[A-Z_][A-Z0-9_]*\b/, "constant.glsl"],
        [/\b(u_\w+)\b/, "uniform.glsl"],
        [new RegExp(`\\b(${CONSTANTS.join("|")})\\b`), "constant.glsl"],
        [new RegExp(`\\b(${BUILTINS.join("|")})\\b`), "builtin.glsl"],
        [new RegExp(`\\b(${TYPES.join("|")})\\b`), "type.glsl"],
        [new RegExp(`\\b(${KEYWORDS.join("|")})\\b`), "keyword.glsl"],
        [/\b\d+\.\d*([eE][+-]?\d+)?[fFhH]?\b/, "float.glsl"],
        [/\b0[xX][0-9a-fA-F]+[uU]?\b/, "number.glsl"],
        [/\b\d+[uU]?\b/, "number.glsl"],
        [/[{}()[\]]/, "delimiter"],
        [/[;,.]/, "delimiter"],
        [/[=<>!+\-*\/&|^~?:]+/, "operator"],
        [/\b\w+(?=\s*\()/, "builtin.glsl"],
      ],
      uniformDecl: [
        [new RegExp(`\\b(${TYPES.join("|")})\\b`), "type.glsl"],
        [/\b\w+\b/, "uniform.glsl"],
        [/;/, { token: "delimiter", next: "@pop" }],
        [/$/, "", "@pop"],
      ],
      comment: [
        [/[^/*]+/, "comment.block.glsl"],
        [/\*\//, "comment.block.glsl", "@pop"],
        [/[/*]/, "comment.block.glsl"],
      ],
    },
  });
}
