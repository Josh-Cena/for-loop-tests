# For loop tests

Which JS transpiler holds the holy grail for compiling for loops?

(Spoiler: no one)

Build with each compiler:

```bash
bun install
bun build:babel
bun build:tsc
bun build:swc
bun build:esbuild
```

You'll see that `esbuild` straight out doesn't work. Let's try the rest.

```bash
bun test.js
```

Here's the output as of time of writing:

```plain
swc failed to compile 2.js:
for (let i = 0, getI = () => i; i < 3; i++) {
  console.log(getI());
}

baseline: "0\n0\n0\n"
swc: "0\n1\n2\n"

swc failed to compile 4.js:
for (let i = 0, getI = () => i; i < 3; ) {
  i++;
  console.log(getI());
}

baseline: "0\n0\n0\n"
swc: "1\n2\n3\n"

swc failed to compile 5.js:
for (
  let i = 0, getI = () => i, incrementI = () => i++;
  getI() < 3;
  incrementI()
) {
  console.log(i);
}

baseline: "0\n0\n0\n"
swc: "0\n1\n2\n"

tsc failed to compile 2.js:
for (let i = 0, getI = () => i; i < 3; i++) {
  console.log(getI());
}

baseline: "0\n0\n0\n"
tsc: "Threw error: 4 |     out_i_1 = i;\n5 | };\n6 | var out_i_1, out_getI_1;\n7 | _loop_init_1();\n8 | for (var i = out_i_1, getI = out_getI_1; i < 3; i++) {\n9 |     console.log(getI());\n                    ^\nTypeError: getI is not a function. (In 'getI()', 'getI' is undefined)\n      at /output-tsc/2.js:9:17\n\nBun v1.1.34 (macOS arm64)\n"

tsc failed to compile 3.js:
for (let i = 0, getI = () => i; i < 3; i++, getI = () => i) {
  console.log(getI());
}

baseline: "0\n1\n2\n"
tsc: "Threw error:  6 | var _loop_1 = function (i, getI) {\n 7 |     if (inc_1)\n 8 |         i++, getI = function () { return i; };\n 9 |     else\n10 |         inc_1 = true;\n11 |     console.log(getI());\n                     ^\nTypeError: getI is not a function. (In 'getI()', 'getI' is undefined)\n      at _loop_1 (/output-tsc/3.js:11:17)\n      at /output-tsc/3.js:17:5\n\nBun v1.1.34 (macOS arm64)\n"

tsc failed to compile 4.js:
for (let i = 0, getI = () => i; i < 3; ) {
  i++;
  console.log(getI());
}

baseline: "0\n0\n0\n"
tsc: "Threw error:  5 | };\n 6 | var out_i_1, out_getI_1;\n 7 | _loop_init_1();\n 8 | for (var i = out_i_1, getI = out_getI_1; i < 3;) {\n 9 |     i++;\n10 |     console.log(getI());\n                     ^\nTypeError: getI is not a function. (In 'getI()', 'getI' is undefined)\n      at /output-tsc/4.js:10:17\n\nBun v1.1.34 (macOS arm64)\n"

tsc failed to compile 5.js:
for (
  let i = 0, getI = () => i, incrementI = () => i++;
  getI() < 3;
  incrementI()
) {
  console.log(i);
}

baseline: "0\n0\n0\n"
tsc: "Threw error: 3 |     var i = 0, getI = function () { return i; }, incrementI = function () { return i++; };\n4 |     out_i_1 = i;\n5 | };\n6 | var out_i_1, out_getI_1, out_incrementI_1;\n7 | _loop_init_1();\n8 | for (var i = out_i_1, getI = out_getI_1, incrementI = out_incrementI_1; getI() < 3; incrementI()) {\n                                                                            ^\nTypeError: getI is not a function. (In 'getI()', 'getI' is undefined)\n      at /output-tsc/5.js:8:73\n\nBun v1.1.34 (macOS arm64)\n"

babel failed to compile 2.js:
for (let i = 0, getI = () => i; i < 3; i++) {
  console.log(getI());
}

baseline: "0\n0\n0\n"
babel: "0\n1\n2\n"

babel failed to compile 4.js:
for (let i = 0, getI = () => i; i < 3; ) {
  i++;
  console.log(getI());
}

baseline: "0\n0\n0\n"
babel: "1\n2\n3\n"

babel failed to compile 5.js:
for (
  let i = 0, getI = () => i, incrementI = () => i++;
  getI() < 3;
  incrementI()
) {
  console.log(i);
}

baseline: "0\n0\n0\n"
babel: "0\n1\n2\n"
```

Issues:

- [microsoft/TypeScript#60613](https://github.com/microsoft/TypeScript/issues/60613)
- [swc-project/swc#6440](https://github.com/swc-project/swc/issues/6440)
- [babel/babel#15189](https://github.com/babel/babel/issues/15189)
