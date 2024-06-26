let imports = {};
imports['__wbindgen_placeholder__'] = module.exports;
let wasm;
const { TextDecoder, TextEncoder } = require(`util`);

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedBigInt64Memory0 = null;

function getBigInt64Memory0() {
    if (cachedBigInt64Memory0 === null || cachedBigInt64Memory0.byteLength === 0) {
        cachedBigInt64Memory0 = new BigInt64Array(wasm.memory.buffer);
    }
    return cachedBigInt64Memory0;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
*/
module.exports.init_panic_hook = function() {
    wasm.init_panic_hook();
};

let cachedUint32Memory0 = null;

function getUint32Memory0() {
    if (cachedUint32Memory0 === null || cachedUint32Memory0.byteLength === 0) {
        cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32Memory0;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    const mem = getUint32Memory0();
    for (let i = 0; i < array.length; i++) {
        mem[ptr / 4 + i] = addHeapObject(array[i]);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getUint32Memory0();
    const slice = mem.subarray(ptr / 4, ptr / 4 + len);
    const result = [];
    for (let i = 0; i < slice.length; i++) {
        result.push(takeObject(slice[i]));
    }
    return result;
}

let cachedUint16Memory0 = null;

function getUint16Memory0() {
    if (cachedUint16Memory0 === null || cachedUint16Memory0.byteLength === 0) {
        cachedUint16Memory0 = new Uint16Array(wasm.memory.buffer);
    }
    return cachedUint16Memory0;
}

function passArray16ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 2, 2) >>> 0;
    getUint16Memory0().set(arg, ptr / 2);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getUint32Memory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

let cachedBigUint64Memory0 = null;

function getBigUint64Memory0() {
    if (cachedBigUint64Memory0 === null || cachedBigUint64Memory0.byteLength === 0) {
        cachedBigUint64Memory0 = new BigUint64Array(wasm.memory.buffer);
    }
    return cachedBigUint64Memory0;
}

function passArray64ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 8, 8) >>> 0;
    getBigUint64Memory0().set(arg, ptr / 8);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
/**
*/
module.exports.BooleanEncryptionKeyChoice = Object.freeze({ Big:0,"0":"Big",Small:1,"1":"Small", });
/**
*/
module.exports.ShortintEncryptionKeyChoice = Object.freeze({ Big:0,"0":"Big",Small:1,"1":"Small", });
/**
*/
module.exports.ShortintParametersName = Object.freeze({ PARAM_MESSAGE_1_CARRY_0_KS_PBS:0,"0":"PARAM_MESSAGE_1_CARRY_0_KS_PBS",PARAM_MESSAGE_1_CARRY_1_KS_PBS:1,"1":"PARAM_MESSAGE_1_CARRY_1_KS_PBS",PARAM_MESSAGE_2_CARRY_0_KS_PBS:2,"2":"PARAM_MESSAGE_2_CARRY_0_KS_PBS",PARAM_MESSAGE_1_CARRY_2_KS_PBS:3,"3":"PARAM_MESSAGE_1_CARRY_2_KS_PBS",PARAM_MESSAGE_2_CARRY_1_KS_PBS:4,"4":"PARAM_MESSAGE_2_CARRY_1_KS_PBS",PARAM_MESSAGE_3_CARRY_0_KS_PBS:5,"5":"PARAM_MESSAGE_3_CARRY_0_KS_PBS",PARAM_MESSAGE_1_CARRY_3_KS_PBS:6,"6":"PARAM_MESSAGE_1_CARRY_3_KS_PBS",PARAM_MESSAGE_2_CARRY_2_KS_PBS:7,"7":"PARAM_MESSAGE_2_CARRY_2_KS_PBS",PARAM_MESSAGE_3_CARRY_1_KS_PBS:8,"8":"PARAM_MESSAGE_3_CARRY_1_KS_PBS",PARAM_MESSAGE_4_CARRY_0_KS_PBS:9,"9":"PARAM_MESSAGE_4_CARRY_0_KS_PBS",PARAM_MESSAGE_1_CARRY_4_KS_PBS:10,"10":"PARAM_MESSAGE_1_CARRY_4_KS_PBS",PARAM_MESSAGE_2_CARRY_3_KS_PBS:11,"11":"PARAM_MESSAGE_2_CARRY_3_KS_PBS",PARAM_MESSAGE_3_CARRY_2_KS_PBS:12,"12":"PARAM_MESSAGE_3_CARRY_2_KS_PBS",PARAM_MESSAGE_4_CARRY_1_KS_PBS:13,"13":"PARAM_MESSAGE_4_CARRY_1_KS_PBS",PARAM_MESSAGE_5_CARRY_0_KS_PBS:14,"14":"PARAM_MESSAGE_5_CARRY_0_KS_PBS",PARAM_MESSAGE_1_CARRY_5_KS_PBS:15,"15":"PARAM_MESSAGE_1_CARRY_5_KS_PBS",PARAM_MESSAGE_2_CARRY_4_KS_PBS:16,"16":"PARAM_MESSAGE_2_CARRY_4_KS_PBS",PARAM_MESSAGE_3_CARRY_3_KS_PBS:17,"17":"PARAM_MESSAGE_3_CARRY_3_KS_PBS",PARAM_MESSAGE_4_CARRY_2_KS_PBS:18,"18":"PARAM_MESSAGE_4_CARRY_2_KS_PBS",PARAM_MESSAGE_5_CARRY_1_KS_PBS:19,"19":"PARAM_MESSAGE_5_CARRY_1_KS_PBS",PARAM_MESSAGE_6_CARRY_0_KS_PBS:20,"20":"PARAM_MESSAGE_6_CARRY_0_KS_PBS",PARAM_MESSAGE_1_CARRY_6_KS_PBS:21,"21":"PARAM_MESSAGE_1_CARRY_6_KS_PBS",PARAM_MESSAGE_2_CARRY_5_KS_PBS:22,"22":"PARAM_MESSAGE_2_CARRY_5_KS_PBS",PARAM_MESSAGE_3_CARRY_4_KS_PBS:23,"23":"PARAM_MESSAGE_3_CARRY_4_KS_PBS",PARAM_MESSAGE_4_CARRY_3_KS_PBS:24,"24":"PARAM_MESSAGE_4_CARRY_3_KS_PBS",PARAM_MESSAGE_5_CARRY_2_KS_PBS:25,"25":"PARAM_MESSAGE_5_CARRY_2_KS_PBS",PARAM_MESSAGE_6_CARRY_1_KS_PBS:26,"26":"PARAM_MESSAGE_6_CARRY_1_KS_PBS",PARAM_MESSAGE_7_CARRY_0_KS_PBS:27,"27":"PARAM_MESSAGE_7_CARRY_0_KS_PBS",PARAM_MESSAGE_1_CARRY_7_KS_PBS:28,"28":"PARAM_MESSAGE_1_CARRY_7_KS_PBS",PARAM_MESSAGE_2_CARRY_6_KS_PBS:29,"29":"PARAM_MESSAGE_2_CARRY_6_KS_PBS",PARAM_MESSAGE_3_CARRY_5_KS_PBS:30,"30":"PARAM_MESSAGE_3_CARRY_5_KS_PBS",PARAM_MESSAGE_4_CARRY_4_KS_PBS:31,"31":"PARAM_MESSAGE_4_CARRY_4_KS_PBS",PARAM_MESSAGE_5_CARRY_3_KS_PBS:32,"32":"PARAM_MESSAGE_5_CARRY_3_KS_PBS",PARAM_MESSAGE_6_CARRY_2_KS_PBS:33,"33":"PARAM_MESSAGE_6_CARRY_2_KS_PBS",PARAM_MESSAGE_7_CARRY_1_KS_PBS:34,"34":"PARAM_MESSAGE_7_CARRY_1_KS_PBS",PARAM_MESSAGE_8_CARRY_0_KS_PBS:35,"35":"PARAM_MESSAGE_8_CARRY_0_KS_PBS",PARAM_MESSAGE_1_CARRY_1_PBS_KS:36,"36":"PARAM_MESSAGE_1_CARRY_1_PBS_KS",PARAM_MESSAGE_2_CARRY_2_PBS_KS:37,"37":"PARAM_MESSAGE_2_CARRY_2_PBS_KS",PARAM_MESSAGE_3_CARRY_3_PBS_KS:38,"38":"PARAM_MESSAGE_3_CARRY_3_PBS_KS",PARAM_MESSAGE_4_CARRY_4_PBS_KS:39,"39":"PARAM_MESSAGE_4_CARRY_4_PBS_KS",PARAM_MESSAGE_1_CARRY_2_COMPACT_PK_KS_PBS:40,"40":"PARAM_MESSAGE_1_CARRY_2_COMPACT_PK_KS_PBS",PARAM_MESSAGE_1_CARRY_3_COMPACT_PK_KS_PBS:41,"41":"PARAM_MESSAGE_1_CARRY_3_COMPACT_PK_KS_PBS",PARAM_MESSAGE_1_CARRY_4_COMPACT_PK_KS_PBS:42,"42":"PARAM_MESSAGE_1_CARRY_4_COMPACT_PK_KS_PBS",PARAM_MESSAGE_1_CARRY_5_COMPACT_PK_KS_PBS:43,"43":"PARAM_MESSAGE_1_CARRY_5_COMPACT_PK_KS_PBS",PARAM_MESSAGE_1_CARRY_6_COMPACT_PK_KS_PBS:44,"44":"PARAM_MESSAGE_1_CARRY_6_COMPACT_PK_KS_PBS",PARAM_MESSAGE_1_CARRY_7_COMPACT_PK_KS_PBS:45,"45":"PARAM_MESSAGE_1_CARRY_7_COMPACT_PK_KS_PBS",PARAM_MESSAGE_2_CARRY_1_COMPACT_PK_KS_PBS:46,"46":"PARAM_MESSAGE_2_CARRY_1_COMPACT_PK_KS_PBS",PARAM_MESSAGE_2_CARRY_2_COMPACT_PK_KS_PBS:47,"47":"PARAM_MESSAGE_2_CARRY_2_COMPACT_PK_KS_PBS",PARAM_MESSAGE_2_CARRY_3_COMPACT_PK_KS_PBS:48,"48":"PARAM_MESSAGE_2_CARRY_3_COMPACT_PK_KS_PBS",PARAM_MESSAGE_2_CARRY_4_COMPACT_PK_KS_PBS:49,"49":"PARAM_MESSAGE_2_CARRY_4_COMPACT_PK_KS_PBS",PARAM_MESSAGE_2_CARRY_5_COMPACT_PK_KS_PBS:50,"50":"PARAM_MESSAGE_2_CARRY_5_COMPACT_PK_KS_PBS",PARAM_MESSAGE_2_CARRY_6_COMPACT_PK_KS_PBS:51,"51":"PARAM_MESSAGE_2_CARRY_6_COMPACT_PK_KS_PBS",PARAM_MESSAGE_3_CARRY_1_COMPACT_PK_KS_PBS:52,"52":"PARAM_MESSAGE_3_CARRY_1_COMPACT_PK_KS_PBS",PARAM_MESSAGE_3_CARRY_2_COMPACT_PK_KS_PBS:53,"53":"PARAM_MESSAGE_3_CARRY_2_COMPACT_PK_KS_PBS",PARAM_MESSAGE_3_CARRY_3_COMPACT_PK_KS_PBS:54,"54":"PARAM_MESSAGE_3_CARRY_3_COMPACT_PK_KS_PBS",PARAM_MESSAGE_3_CARRY_4_COMPACT_PK_KS_PBS:55,"55":"PARAM_MESSAGE_3_CARRY_4_COMPACT_PK_KS_PBS",PARAM_MESSAGE_3_CARRY_5_COMPACT_PK_KS_PBS:56,"56":"PARAM_MESSAGE_3_CARRY_5_COMPACT_PK_KS_PBS",PARAM_MESSAGE_4_CARRY_1_COMPACT_PK_KS_PBS:57,"57":"PARAM_MESSAGE_4_CARRY_1_COMPACT_PK_KS_PBS",PARAM_MESSAGE_4_CARRY_2_COMPACT_PK_KS_PBS:58,"58":"PARAM_MESSAGE_4_CARRY_2_COMPACT_PK_KS_PBS",PARAM_MESSAGE_4_CARRY_3_COMPACT_PK_KS_PBS:59,"59":"PARAM_MESSAGE_4_CARRY_3_COMPACT_PK_KS_PBS",PARAM_MESSAGE_4_CARRY_4_COMPACT_PK_KS_PBS:60,"60":"PARAM_MESSAGE_4_CARRY_4_COMPACT_PK_KS_PBS",PARAM_MESSAGE_5_CARRY_1_COMPACT_PK_KS_PBS:61,"61":"PARAM_MESSAGE_5_CARRY_1_COMPACT_PK_KS_PBS",PARAM_MESSAGE_5_CARRY_2_COMPACT_PK_KS_PBS:62,"62":"PARAM_MESSAGE_5_CARRY_2_COMPACT_PK_KS_PBS",PARAM_MESSAGE_5_CARRY_3_COMPACT_PK_KS_PBS:63,"63":"PARAM_MESSAGE_5_CARRY_3_COMPACT_PK_KS_PBS",PARAM_MESSAGE_6_CARRY_1_COMPACT_PK_KS_PBS:64,"64":"PARAM_MESSAGE_6_CARRY_1_COMPACT_PK_KS_PBS",PARAM_MESSAGE_6_CARRY_2_COMPACT_PK_KS_PBS:65,"65":"PARAM_MESSAGE_6_CARRY_2_COMPACT_PK_KS_PBS",PARAM_MESSAGE_7_CARRY_1_COMPACT_PK_KS_PBS:66,"66":"PARAM_MESSAGE_7_CARRY_1_COMPACT_PK_KS_PBS",PARAM_MESSAGE_1_CARRY_1_COMPACT_PK_PBS_KS:67,"67":"PARAM_MESSAGE_1_CARRY_1_COMPACT_PK_PBS_KS",PARAM_MESSAGE_1_CARRY_2_COMPACT_PK_PBS_KS:68,"68":"PARAM_MESSAGE_1_CARRY_2_COMPACT_PK_PBS_KS",PARAM_MESSAGE_1_CARRY_3_COMPACT_PK_PBS_KS:69,"69":"PARAM_MESSAGE_1_CARRY_3_COMPACT_PK_PBS_KS",PARAM_MESSAGE_1_CARRY_4_COMPACT_PK_PBS_KS:70,"70":"PARAM_MESSAGE_1_CARRY_4_COMPACT_PK_PBS_KS",PARAM_MESSAGE_1_CARRY_5_COMPACT_PK_PBS_KS:71,"71":"PARAM_MESSAGE_1_CARRY_5_COMPACT_PK_PBS_KS",PARAM_MESSAGE_1_CARRY_6_COMPACT_PK_PBS_KS:72,"72":"PARAM_MESSAGE_1_CARRY_6_COMPACT_PK_PBS_KS",PARAM_MESSAGE_1_CARRY_7_COMPACT_PK_PBS_KS:73,"73":"PARAM_MESSAGE_1_CARRY_7_COMPACT_PK_PBS_KS",PARAM_MESSAGE_2_CARRY_1_COMPACT_PK_PBS_KS:74,"74":"PARAM_MESSAGE_2_CARRY_1_COMPACT_PK_PBS_KS",PARAM_MESSAGE_2_CARRY_2_COMPACT_PK_PBS_KS:75,"75":"PARAM_MESSAGE_2_CARRY_2_COMPACT_PK_PBS_KS",PARAM_MESSAGE_2_CARRY_3_COMPACT_PK_PBS_KS:76,"76":"PARAM_MESSAGE_2_CARRY_3_COMPACT_PK_PBS_KS",PARAM_MESSAGE_2_CARRY_4_COMPACT_PK_PBS_KS:77,"77":"PARAM_MESSAGE_2_CARRY_4_COMPACT_PK_PBS_KS",PARAM_MESSAGE_2_CARRY_5_COMPACT_PK_PBS_KS:78,"78":"PARAM_MESSAGE_2_CARRY_5_COMPACT_PK_PBS_KS",PARAM_MESSAGE_2_CARRY_6_COMPACT_PK_PBS_KS:79,"79":"PARAM_MESSAGE_2_CARRY_6_COMPACT_PK_PBS_KS",PARAM_MESSAGE_3_CARRY_1_COMPACT_PK_PBS_KS:80,"80":"PARAM_MESSAGE_3_CARRY_1_COMPACT_PK_PBS_KS",PARAM_MESSAGE_3_CARRY_2_COMPACT_PK_PBS_KS:81,"81":"PARAM_MESSAGE_3_CARRY_2_COMPACT_PK_PBS_KS",PARAM_MESSAGE_3_CARRY_3_COMPACT_PK_PBS_KS:82,"82":"PARAM_MESSAGE_3_CARRY_3_COMPACT_PK_PBS_KS",PARAM_MESSAGE_3_CARRY_4_COMPACT_PK_PBS_KS:83,"83":"PARAM_MESSAGE_3_CARRY_4_COMPACT_PK_PBS_KS",PARAM_MESSAGE_3_CARRY_5_COMPACT_PK_PBS_KS:84,"84":"PARAM_MESSAGE_3_CARRY_5_COMPACT_PK_PBS_KS",PARAM_MESSAGE_4_CARRY_1_COMPACT_PK_PBS_KS:85,"85":"PARAM_MESSAGE_4_CARRY_1_COMPACT_PK_PBS_KS",PARAM_MESSAGE_4_CARRY_2_COMPACT_PK_PBS_KS:86,"86":"PARAM_MESSAGE_4_CARRY_2_COMPACT_PK_PBS_KS",PARAM_MESSAGE_4_CARRY_3_COMPACT_PK_PBS_KS:87,"87":"PARAM_MESSAGE_4_CARRY_3_COMPACT_PK_PBS_KS",PARAM_MESSAGE_4_CARRY_4_COMPACT_PK_PBS_KS:88,"88":"PARAM_MESSAGE_4_CARRY_4_COMPACT_PK_PBS_KS",PARAM_MESSAGE_5_CARRY_1_COMPACT_PK_PBS_KS:89,"89":"PARAM_MESSAGE_5_CARRY_1_COMPACT_PK_PBS_KS",PARAM_MESSAGE_5_CARRY_2_COMPACT_PK_PBS_KS:90,"90":"PARAM_MESSAGE_5_CARRY_2_COMPACT_PK_PBS_KS",PARAM_MESSAGE_5_CARRY_3_COMPACT_PK_PBS_KS:91,"91":"PARAM_MESSAGE_5_CARRY_3_COMPACT_PK_PBS_KS",PARAM_MESSAGE_6_CARRY_1_COMPACT_PK_PBS_KS:92,"92":"PARAM_MESSAGE_6_CARRY_1_COMPACT_PK_PBS_KS",PARAM_MESSAGE_6_CARRY_2_COMPACT_PK_PBS_KS:93,"93":"PARAM_MESSAGE_6_CARRY_2_COMPACT_PK_PBS_KS",PARAM_MESSAGE_7_CARRY_1_COMPACT_PK_PBS_KS:94,"94":"PARAM_MESSAGE_7_CARRY_1_COMPACT_PK_PBS_KS",PARAM_MESSAGE_1_CARRY_0:95,"95":"PARAM_MESSAGE_1_CARRY_0",PARAM_MESSAGE_1_CARRY_1:96,"96":"PARAM_MESSAGE_1_CARRY_1",PARAM_MESSAGE_2_CARRY_0:97,"97":"PARAM_MESSAGE_2_CARRY_0",PARAM_MESSAGE_1_CARRY_2:98,"98":"PARAM_MESSAGE_1_CARRY_2",PARAM_MESSAGE_2_CARRY_1:99,"99":"PARAM_MESSAGE_2_CARRY_1",PARAM_MESSAGE_3_CARRY_0:100,"100":"PARAM_MESSAGE_3_CARRY_0",PARAM_MESSAGE_1_CARRY_3:101,"101":"PARAM_MESSAGE_1_CARRY_3",PARAM_MESSAGE_2_CARRY_2:102,"102":"PARAM_MESSAGE_2_CARRY_2",PARAM_MESSAGE_3_CARRY_1:103,"103":"PARAM_MESSAGE_3_CARRY_1",PARAM_MESSAGE_4_CARRY_0:104,"104":"PARAM_MESSAGE_4_CARRY_0",PARAM_MESSAGE_1_CARRY_4:105,"105":"PARAM_MESSAGE_1_CARRY_4",PARAM_MESSAGE_2_CARRY_3:106,"106":"PARAM_MESSAGE_2_CARRY_3",PARAM_MESSAGE_3_CARRY_2:107,"107":"PARAM_MESSAGE_3_CARRY_2",PARAM_MESSAGE_4_CARRY_1:108,"108":"PARAM_MESSAGE_4_CARRY_1",PARAM_MESSAGE_5_CARRY_0:109,"109":"PARAM_MESSAGE_5_CARRY_0",PARAM_MESSAGE_1_CARRY_5:110,"110":"PARAM_MESSAGE_1_CARRY_5",PARAM_MESSAGE_2_CARRY_4:111,"111":"PARAM_MESSAGE_2_CARRY_4",PARAM_MESSAGE_3_CARRY_3:112,"112":"PARAM_MESSAGE_3_CARRY_3",PARAM_MESSAGE_4_CARRY_2:113,"113":"PARAM_MESSAGE_4_CARRY_2",PARAM_MESSAGE_5_CARRY_1:114,"114":"PARAM_MESSAGE_5_CARRY_1",PARAM_MESSAGE_6_CARRY_0:115,"115":"PARAM_MESSAGE_6_CARRY_0",PARAM_MESSAGE_1_CARRY_6:116,"116":"PARAM_MESSAGE_1_CARRY_6",PARAM_MESSAGE_2_CARRY_5:117,"117":"PARAM_MESSAGE_2_CARRY_5",PARAM_MESSAGE_3_CARRY_4:118,"118":"PARAM_MESSAGE_3_CARRY_4",PARAM_MESSAGE_4_CARRY_3:119,"119":"PARAM_MESSAGE_4_CARRY_3",PARAM_MESSAGE_5_CARRY_2:120,"120":"PARAM_MESSAGE_5_CARRY_2",PARAM_MESSAGE_6_CARRY_1:121,"121":"PARAM_MESSAGE_6_CARRY_1",PARAM_MESSAGE_7_CARRY_0:122,"122":"PARAM_MESSAGE_7_CARRY_0",PARAM_MESSAGE_1_CARRY_7:123,"123":"PARAM_MESSAGE_1_CARRY_7",PARAM_MESSAGE_2_CARRY_6:124,"124":"PARAM_MESSAGE_2_CARRY_6",PARAM_MESSAGE_3_CARRY_5:125,"125":"PARAM_MESSAGE_3_CARRY_5",PARAM_MESSAGE_4_CARRY_4:126,"126":"PARAM_MESSAGE_4_CARRY_4",PARAM_MESSAGE_5_CARRY_3:127,"127":"PARAM_MESSAGE_5_CARRY_3",PARAM_MESSAGE_6_CARRY_2:128,"128":"PARAM_MESSAGE_6_CARRY_2",PARAM_MESSAGE_7_CARRY_1:129,"129":"PARAM_MESSAGE_7_CARRY_1",PARAM_MESSAGE_8_CARRY_0:130,"130":"PARAM_MESSAGE_8_CARRY_0",PARAM_SMALL_MESSAGE_1_CARRY_1:131,"131":"PARAM_SMALL_MESSAGE_1_CARRY_1",PARAM_SMALL_MESSAGE_2_CARRY_2:132,"132":"PARAM_SMALL_MESSAGE_2_CARRY_2",PARAM_SMALL_MESSAGE_3_CARRY_3:133,"133":"PARAM_SMALL_MESSAGE_3_CARRY_3",PARAM_SMALL_MESSAGE_4_CARRY_4:134,"134":"PARAM_SMALL_MESSAGE_4_CARRY_4", });
/**
*/
module.exports.BooleanParameterSet = Object.freeze({ Default:0,"0":"Default",TfheLib:1,"1":"TfheLib",DefaultKsPbs:2,"2":"DefaultKsPbs",TfheLibKsPbs:3,"3":"TfheLibKsPbs", });

const BooleanFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_boolean_free(ptr >>> 0));
/**
*/
class Boolean {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BooleanFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_boolean_free(ptr);
    }
    /**
    * @param {number} parameter_choice
    * @returns {BooleanParameters}
    */
    static get_parameters(parameter_choice) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.boolean_get_parameters(retptr, parameter_choice);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return BooleanParameters.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} lwe_dimension
    * @param {number} glwe_dimension
    * @param {number} polynomial_size
    * @param {number} lwe_modular_std_dev
    * @param {number} glwe_modular_std_dev
    * @param {number} pbs_base_log
    * @param {number} pbs_level
    * @param {number} ks_base_log
    * @param {number} ks_level
    * @param {BooleanEncryptionKeyChoice} encryption_key_choice
    * @returns {BooleanParameters}
    */
    static new_parameters(lwe_dimension, glwe_dimension, polynomial_size, lwe_modular_std_dev, glwe_modular_std_dev, pbs_base_log, pbs_level, ks_base_log, ks_level, encryption_key_choice) {
        const ret = wasm.boolean_new_parameters(lwe_dimension, glwe_dimension, polynomial_size, lwe_modular_std_dev, glwe_modular_std_dev, pbs_base_log, pbs_level, ks_base_log, ks_level, encryption_key_choice);
        return BooleanParameters.__wrap(ret);
    }
    /**
    * @param {bigint} seed_high_bytes
    * @param {bigint} seed_low_bytes
    * @param {BooleanParameters} parameters
    * @returns {BooleanClientKey}
    */
    static new_client_key_from_seed_and_parameters(seed_high_bytes, seed_low_bytes, parameters) {
        _assertClass(parameters, BooleanParameters);
        const ret = wasm.boolean_new_client_key_from_seed_and_parameters(seed_high_bytes, seed_low_bytes, parameters.__wbg_ptr);
        return BooleanClientKey.__wrap(ret);
    }
    /**
    * @param {BooleanParameters} parameters
    * @returns {BooleanClientKey}
    */
    static new_client_key(parameters) {
        _assertClass(parameters, BooleanParameters);
        const ret = wasm.boolean_new_client_key(parameters.__wbg_ptr);
        return BooleanClientKey.__wrap(ret);
    }
    /**
    * @param {BooleanClientKey} client_key
    * @returns {BooleanPublicKey}
    */
    static new_public_key(client_key) {
        _assertClass(client_key, BooleanClientKey);
        const ret = wasm.boolean_new_public_key(client_key.__wbg_ptr);
        return BooleanPublicKey.__wrap(ret);
    }
    /**
    * @param {BooleanClientKey} client_key
    * @returns {BooleanCompressedServerKey}
    */
    static new_compressed_server_key(client_key) {
        _assertClass(client_key, BooleanClientKey);
        const ret = wasm.boolean_new_compressed_server_key(client_key.__wbg_ptr);
        return BooleanCompressedServerKey.__wrap(ret);
    }
    /**
    * @param {BooleanClientKey} client_key
    * @param {boolean} message
    * @returns {BooleanCiphertext}
    */
    static encrypt(client_key, message) {
        _assertClass(client_key, BooleanClientKey);
        const ret = wasm.boolean_encrypt(client_key.__wbg_ptr, message);
        return BooleanCiphertext.__wrap(ret);
    }
    /**
    * @param {BooleanClientKey} client_key
    * @param {boolean} message
    * @returns {BooleanCompressedCiphertext}
    */
    static encrypt_compressed(client_key, message) {
        _assertClass(client_key, BooleanClientKey);
        const ret = wasm.boolean_encrypt_compressed(client_key.__wbg_ptr, message);
        return BooleanCompressedCiphertext.__wrap(ret);
    }
    /**
    * @param {BooleanCompressedCiphertext} compressed_ciphertext
    * @returns {BooleanCiphertext}
    */
    static decompress_ciphertext(compressed_ciphertext) {
        _assertClass(compressed_ciphertext, BooleanCompressedCiphertext);
        const ret = wasm.boolean_decompress_ciphertext(compressed_ciphertext.__wbg_ptr);
        return BooleanCiphertext.__wrap(ret);
    }
    /**
    * @param {BooleanPublicKey} public_key
    * @param {boolean} message
    * @returns {BooleanCiphertext}
    */
    static encrypt_with_public_key(public_key, message) {
        _assertClass(public_key, BooleanPublicKey);
        const ret = wasm.boolean_encrypt_with_public_key(public_key.__wbg_ptr, message);
        return BooleanCiphertext.__wrap(ret);
    }
    /**
    * @param {boolean} message
    * @returns {BooleanCiphertext}
    */
    static trivial_encrypt(message) {
        const ret = wasm.boolean_trivial_encrypt(message);
        return BooleanCiphertext.__wrap(ret);
    }
    /**
    * @param {BooleanClientKey} client_key
    * @param {BooleanCiphertext} ct
    * @returns {boolean}
    */
    static decrypt(client_key, ct) {
        _assertClass(client_key, BooleanClientKey);
        _assertClass(ct, BooleanCiphertext);
        const ret = wasm.boolean_decrypt(client_key.__wbg_ptr, ct.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {BooleanCiphertext} ciphertext
    * @returns {Uint8Array}
    */
    static serialize_ciphertext(ciphertext) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(ciphertext, BooleanCiphertext);
            wasm.boolean_serialize_ciphertext(retptr, ciphertext.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {BooleanCiphertext}
    */
    static deserialize_ciphertext(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.boolean_deserialize_ciphertext(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return BooleanCiphertext.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {BooleanCompressedCiphertext} ciphertext
    * @returns {Uint8Array}
    */
    static serialize_compressed_ciphertext(ciphertext) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(ciphertext, BooleanCompressedCiphertext);
            wasm.boolean_serialize_compressed_ciphertext(retptr, ciphertext.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {BooleanCompressedCiphertext}
    */
    static deserialize_compressed_ciphertext(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.boolean_deserialize_compressed_ciphertext(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return BooleanCompressedCiphertext.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {BooleanClientKey} client_key
    * @returns {Uint8Array}
    */
    static serialize_client_key(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, BooleanClientKey);
            wasm.boolean_serialize_client_key(retptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {BooleanClientKey}
    */
    static deserialize_client_key(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.boolean_deserialize_client_key(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return BooleanClientKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {BooleanPublicKey} public_key
    * @returns {Uint8Array}
    */
    static serialize_public_key(public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, BooleanPublicKey);
            wasm.boolean_serialize_public_key(retptr, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {BooleanPublicKey}
    */
    static deserialize_public_key(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.boolean_deserialize_public_key(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return BooleanPublicKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {BooleanCompressedServerKey} server_key
    * @returns {Uint8Array}
    */
    static serialize_compressed_server_key(server_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(server_key, BooleanCompressedServerKey);
            wasm.boolean_serialize_compressed_server_key(retptr, server_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {BooleanCompressedServerKey}
    */
    static deserialize_compressed_server_key(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.boolean_deserialize_compressed_server_key(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return BooleanCompressedServerKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.Boolean = Boolean;

const BooleanCiphertextFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_booleanciphertext_free(ptr >>> 0));
/**
*/
class BooleanCiphertext {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(BooleanCiphertext.prototype);
        obj.__wbg_ptr = ptr;
        BooleanCiphertextFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BooleanCiphertextFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_booleanciphertext_free(ptr);
    }
}
module.exports.BooleanCiphertext = BooleanCiphertext;

const BooleanClientKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_booleanclientkey_free(ptr >>> 0));
/**
*/
class BooleanClientKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(BooleanClientKey.prototype);
        obj.__wbg_ptr = ptr;
        BooleanClientKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BooleanClientKeyFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_booleanclientkey_free(ptr);
    }
}
module.exports.BooleanClientKey = BooleanClientKey;

const BooleanCompressedCiphertextFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_booleancompressedciphertext_free(ptr >>> 0));
/**
*/
class BooleanCompressedCiphertext {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(BooleanCompressedCiphertext.prototype);
        obj.__wbg_ptr = ptr;
        BooleanCompressedCiphertextFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BooleanCompressedCiphertextFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_booleancompressedciphertext_free(ptr);
    }
}
module.exports.BooleanCompressedCiphertext = BooleanCompressedCiphertext;

const BooleanCompressedServerKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_booleancompressedserverkey_free(ptr >>> 0));
/**
*/
class BooleanCompressedServerKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(BooleanCompressedServerKey.prototype);
        obj.__wbg_ptr = ptr;
        BooleanCompressedServerKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BooleanCompressedServerKeyFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_booleancompressedserverkey_free(ptr);
    }
}
module.exports.BooleanCompressedServerKey = BooleanCompressedServerKey;

const BooleanParametersFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_booleanparameters_free(ptr >>> 0));
/**
*/
class BooleanParameters {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(BooleanParameters.prototype);
        obj.__wbg_ptr = ptr;
        BooleanParametersFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BooleanParametersFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_booleanparameters_free(ptr);
    }
}
module.exports.BooleanParameters = BooleanParameters;

const BooleanPublicKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_booleanpublickey_free(ptr >>> 0));
/**
*/
class BooleanPublicKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(BooleanPublicKey.prototype);
        obj.__wbg_ptr = ptr;
        BooleanPublicKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BooleanPublicKeyFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_booleanpublickey_free(ptr);
    }
}
module.exports.BooleanPublicKey = BooleanPublicKey;

const CompactFheBoolFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfhebool_free(ptr >>> 0));
/**
*/
class CompactFheBool {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheBool.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheBoolFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheBoolFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfhebool_free(ptr);
    }
    /**
    * @param {boolean} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheBool}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfhebool_encrypt_with_compact_public_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheBool.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheBool}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfhebool_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheBool.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfhebool_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheBool}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfhebool_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheBool.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfhebool_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheBool}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfhebool_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheBool.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheBool = CompactFheBool;

const CompactFheBoolListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheboollist_free(ptr >>> 0));
/**
*/
class CompactFheBoolList {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheBoolList.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheBoolListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheBoolListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheboollist_free(ptr);
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheboollist_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheboollist_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheBoolList}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheboollist_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheBoolList.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {any[]} values
    * @param {TfheCompactPublicKey} public_key
    * @returns {CompactFheBoolList}
    */
    static encrypt_with_compact_public_key(values, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArrayJsValueToWasm0(values, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(public_key, TfheCompactPublicKey);
            wasm.compactfheboollist_encrypt_with_compact_public_key(retptr, ptr0, len0, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheBoolList.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheBoolList = CompactFheBoolList;

const CompactFheInt10Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheint10_free(ptr >>> 0));
/**
*/
class CompactFheInt10 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheInt10.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheInt10Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheInt10Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheint10_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheInt10}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfheint10_encrypt_with_compact_public_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheInt10}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint10_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint10_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheInt10}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint10_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint10_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheInt10}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint10_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheInt10 = CompactFheInt10;

const CompactFheInt10ListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheint10list_free(ptr >>> 0));
/**
*/
class CompactFheInt10List {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheInt10List.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheInt10ListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheInt10ListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheint10list_free(ptr);
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint10list_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint10list_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheInt10List}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint10list_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt10List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheInt10List = CompactFheInt10List;

const CompactFheInt12Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheint12_free(ptr >>> 0));
/**
*/
class CompactFheInt12 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheInt12.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheInt12Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheInt12Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheint12_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheInt12}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfheint12_encrypt_with_compact_public_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheInt12}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint10_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint12_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheInt12}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint12_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint12_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheInt12}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint12_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheInt12 = CompactFheInt12;

const CompactFheInt128Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheint128_free(ptr >>> 0));
/**
*/
class CompactFheInt128 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheInt128.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheInt128Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheInt128Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheint128_free(ptr);
    }
    /**
    * @param {any} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheInt128}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfheint128_encrypt_with_compact_public_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheInt128}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint10_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint128_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheInt128}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint128_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint128_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheInt128}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint128_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheInt128 = CompactFheInt128;

const CompactFheInt128ListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheint128list_free(ptr >>> 0));
/**
*/
class CompactFheInt128List {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheInt128List.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheInt128ListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheInt128ListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheint128list_free(ptr);
    }
    /**
    * @param {any[]} values
    * @param {TfheCompactPublicKey} public_key
    * @returns {CompactFheInt128List}
    */
    static encrypt_with_compact_public_key(values, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArrayJsValueToWasm0(values, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(public_key, TfheCompactPublicKey);
            wasm.compactfheint128list_encrypt_with_compact_public_key(retptr, ptr0, len0, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt128List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint128list_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint128list_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheInt128List}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint128list_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt128List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheInt128List = CompactFheInt128List;

const CompactFheInt12ListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheint12list_free(ptr >>> 0));
/**
*/
class CompactFheInt12List {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheInt12List.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheInt12ListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheInt12ListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheint12list_free(ptr);
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint12list_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint12list_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheInt12List}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint12list_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt12List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Int16Array} values
    * @param {TfheCompactPublicKey} public_key
    * @returns {CompactFheInt12List}
    */
    static encrypt_with_compact_public_key(values, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray16ToWasm0(values, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(public_key, TfheCompactPublicKey);
            wasm.compactfheint12list_encrypt_with_compact_public_key(retptr, ptr0, len0, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt12List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheInt12List = CompactFheInt12List;

const CompactFheInt14Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheint14_free(ptr >>> 0));
/**
*/
class CompactFheInt14 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheInt14.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheInt14Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheInt14Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheint14_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheInt14}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfheint14_encrypt_with_compact_public_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheInt14}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint10_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint14_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheInt14}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint14_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint14_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheInt14}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint14_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheInt14 = CompactFheInt14;

const CompactFheInt14ListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheint14list_free(ptr >>> 0));
/**
*/
class CompactFheInt14List {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheInt14List.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheInt14ListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheInt14ListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheint14list_free(ptr);
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint14list_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint14list_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheInt14List}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint14list_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt14List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Int16Array} values
    * @param {TfheCompactPublicKey} public_key
    * @returns {CompactFheInt14List}
    */
    static encrypt_with_compact_public_key(values, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray16ToWasm0(values, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(public_key, TfheCompactPublicKey);
            wasm.compactfheint14list_encrypt_with_compact_public_key(retptr, ptr0, len0, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt14List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheInt14List = CompactFheInt14List;

const CompactFheInt16Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheint16_free(ptr >>> 0));
/**
*/
class CompactFheInt16 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheInt16.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheInt16Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheInt16Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheint16_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheInt16}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfheint16_encrypt_with_compact_public_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheInt16}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint10_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint16_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheInt16}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint16_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint16_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheInt16}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint16_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheInt16 = CompactFheInt16;

const CompactFheInt160Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheint160_free(ptr >>> 0));
/**
*/
class CompactFheInt160 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheInt160.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheInt160Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheInt160Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheint160_free(ptr);
    }
    /**
    * @param {any} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheInt160}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfheint160_encrypt_with_compact_public_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheInt160}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint10_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint160_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheInt160}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint160_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint160_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheInt160}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint160_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheInt160 = CompactFheInt160;

const CompactFheInt160ListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheint160list_free(ptr >>> 0));
/**
*/
class CompactFheInt160List {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheInt160List.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheInt160ListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheInt160ListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheint160list_free(ptr);
    }
    /**
    * @param {any[]} values
    * @param {TfheCompactPublicKey} public_key
    * @returns {CompactFheInt160List}
    */
    static encrypt_with_compact_public_key(values, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArrayJsValueToWasm0(values, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(public_key, TfheCompactPublicKey);
            wasm.compactfheint160list_encrypt_with_compact_public_key(retptr, ptr0, len0, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt160List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint160list_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint160list_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheInt160List}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint160list_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt160List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheInt160List = CompactFheInt160List;

const CompactFheInt16ListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheint16list_free(ptr >>> 0));
/**
*/
class CompactFheInt16List {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheInt16List.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheInt16ListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheInt16ListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheint16list_free(ptr);
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint16list_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint16list_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheInt16List}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint16list_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt16List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Int16Array} values
    * @param {TfheCompactPublicKey} public_key
    * @returns {CompactFheInt16List}
    */
    static encrypt_with_compact_public_key(values, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray16ToWasm0(values, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(public_key, TfheCompactPublicKey);
            wasm.compactfheint16list_encrypt_with_compact_public_key(retptr, ptr0, len0, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt16List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheInt16List = CompactFheInt16List;

const CompactFheInt2Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheint2_free(ptr >>> 0));
/**
*/
class CompactFheInt2 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheInt2.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheInt2Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheInt2Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheint2_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheInt2}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfheint2_encrypt_with_compact_public_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheInt2}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint10_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint2_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheInt2}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint2_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint2_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheInt2}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint2_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheInt2 = CompactFheInt2;

const CompactFheInt256Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheint256_free(ptr >>> 0));
/**
*/
class CompactFheInt256 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheInt256.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheInt256Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheInt256Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheint256_free(ptr);
    }
    /**
    * @param {any} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheInt256}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfheint256_encrypt_with_compact_public_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheInt256}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint10_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint256_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheInt256}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint256_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint256_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheInt256}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint256_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheInt256 = CompactFheInt256;

const CompactFheInt256ListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheint256list_free(ptr >>> 0));
/**
*/
class CompactFheInt256List {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheInt256List.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheInt256ListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheInt256ListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheint256list_free(ptr);
    }
    /**
    * @param {any[]} values
    * @param {TfheCompactPublicKey} public_key
    * @returns {CompactFheInt256List}
    */
    static encrypt_with_compact_public_key(values, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArrayJsValueToWasm0(values, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(public_key, TfheCompactPublicKey);
            wasm.compactfheint256list_encrypt_with_compact_public_key(retptr, ptr0, len0, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt256List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint256list_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint256list_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheInt256List}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint256list_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt256List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheInt256List = CompactFheInt256List;

const CompactFheInt2ListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheint2list_free(ptr >>> 0));
/**
*/
class CompactFheInt2List {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheInt2List.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheInt2ListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheInt2ListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheint2list_free(ptr);
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint2list_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint2list_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheInt2List}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint2list_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt2List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Int8Array} values
    * @param {TfheCompactPublicKey} public_key
    * @returns {CompactFheInt2List}
    */
    static encrypt_with_compact_public_key(values, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(values, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(public_key, TfheCompactPublicKey);
            wasm.compactfheint2list_encrypt_with_compact_public_key(retptr, ptr0, len0, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt2List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheInt2List = CompactFheInt2List;

const CompactFheInt32Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheint32_free(ptr >>> 0));
/**
*/
class CompactFheInt32 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheInt32.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheInt32Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheInt32Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheint32_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheInt32}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfheint32_encrypt_with_compact_public_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheInt32}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint10_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint32_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheInt32}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint32_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint32_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheInt32}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint32_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheInt32 = CompactFheInt32;

const CompactFheInt32ListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheint32list_free(ptr >>> 0));
/**
*/
class CompactFheInt32List {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheInt32List.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheInt32ListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheInt32ListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheint32list_free(ptr);
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint32list_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint32list_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheInt32List}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint32list_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt32List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Int32Array} values
    * @param {TfheCompactPublicKey} public_key
    * @returns {CompactFheInt32List}
    */
    static encrypt_with_compact_public_key(values, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray32ToWasm0(values, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(public_key, TfheCompactPublicKey);
            wasm.compactfheint32list_encrypt_with_compact_public_key(retptr, ptr0, len0, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt32List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheInt32List = CompactFheInt32List;

const CompactFheInt4Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheint4_free(ptr >>> 0));
/**
*/
class CompactFheInt4 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheInt4.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheInt4Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheInt4Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheint4_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheInt4}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfheint4_encrypt_with_compact_public_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheInt4}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint10_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint4_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheInt4}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint4_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint4_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheInt4}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint4_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheInt4 = CompactFheInt4;

const CompactFheInt4ListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheint4list_free(ptr >>> 0));
/**
*/
class CompactFheInt4List {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheInt4List.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheInt4ListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheInt4ListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheint4list_free(ptr);
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint4list_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint4list_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheInt4List}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint4list_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt4List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Int8Array} values
    * @param {TfheCompactPublicKey} public_key
    * @returns {CompactFheInt4List}
    */
    static encrypt_with_compact_public_key(values, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(values, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(public_key, TfheCompactPublicKey);
            wasm.compactfheint4list_encrypt_with_compact_public_key(retptr, ptr0, len0, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt4List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheInt4List = CompactFheInt4List;

const CompactFheInt6Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheint6_free(ptr >>> 0));
/**
*/
class CompactFheInt6 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheInt6.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheInt6Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheInt6Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheint6_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheInt6}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfheint6_encrypt_with_compact_public_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheInt6}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint10_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint6_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheInt6}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint6_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint6_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheInt6}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint6_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheInt6 = CompactFheInt6;

const CompactFheInt64Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheint64_free(ptr >>> 0));
/**
*/
class CompactFheInt64 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheInt64.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheInt64Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheInt64Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheint64_free(ptr);
    }
    /**
    * @param {bigint} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheInt64}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfheint64_encrypt_with_compact_public_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheInt64}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint10_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint64_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheInt64}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint64_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint64_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheInt64}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint64_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheInt64 = CompactFheInt64;

const CompactFheInt64ListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheint64list_free(ptr >>> 0));
/**
*/
class CompactFheInt64List {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheInt64List.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheInt64ListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheInt64ListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheint64list_free(ptr);
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint64list_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint64list_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheInt64List}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint64list_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt64List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {BigInt64Array} values
    * @param {TfheCompactPublicKey} public_key
    * @returns {CompactFheInt64List}
    */
    static encrypt_with_compact_public_key(values, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray64ToWasm0(values, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(public_key, TfheCompactPublicKey);
            wasm.compactfheint64list_encrypt_with_compact_public_key(retptr, ptr0, len0, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt64List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheInt64List = CompactFheInt64List;

const CompactFheInt6ListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheint6list_free(ptr >>> 0));
/**
*/
class CompactFheInt6List {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheInt6List.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheInt6ListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheInt6ListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheint6list_free(ptr);
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint6list_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint6list_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheInt6List}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint6list_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt6List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Int8Array} values
    * @param {TfheCompactPublicKey} public_key
    * @returns {CompactFheInt6List}
    */
    static encrypt_with_compact_public_key(values, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(values, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(public_key, TfheCompactPublicKey);
            wasm.compactfheint6list_encrypt_with_compact_public_key(retptr, ptr0, len0, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt6List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheInt6List = CompactFheInt6List;

const CompactFheInt8Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheint8_free(ptr >>> 0));
/**
*/
class CompactFheInt8 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheInt8.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheInt8Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheInt8Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheint8_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheInt8}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfheint8_encrypt_with_compact_public_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheInt8}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint10_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint8_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheInt8}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint8_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint8_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheInt8}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint8_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheInt8 = CompactFheInt8;

const CompactFheInt8ListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheint8list_free(ptr >>> 0));
/**
*/
class CompactFheInt8List {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheInt8List.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheInt8ListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheInt8ListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheint8list_free(ptr);
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint8list_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheint8list_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheInt8List}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheint8list_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt8List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Int8Array} values
    * @param {TfheCompactPublicKey} public_key
    * @returns {CompactFheInt8List}
    */
    static encrypt_with_compact_public_key(values, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(values, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(public_key, TfheCompactPublicKey);
            wasm.compactfheint8list_encrypt_with_compact_public_key(retptr, ptr0, len0, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheInt8List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheInt8List = CompactFheInt8List;

const CompactFheUint10Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheuint10_free(ptr >>> 0));
/**
*/
class CompactFheUint10 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheUint10.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheUint10Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheUint10Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheuint10_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheUint10}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfheuint10_encrypt_with_compact_public_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheUint10}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint10_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint10_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheUint10}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint10_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint10_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheUint10}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint10_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheUint10 = CompactFheUint10;

const CompactFheUint10ListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheuint10list_free(ptr >>> 0));
/**
*/
class CompactFheUint10List {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheUint10List.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheUint10ListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheUint10ListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheuint10list_free(ptr);
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint10list_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint10list_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheUint10List}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint10list_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint10List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheUint10List = CompactFheUint10List;

const CompactFheUint12Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheuint12_free(ptr >>> 0));
/**
*/
class CompactFheUint12 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheUint12.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheUint12Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheUint12Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheuint12_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheUint12}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfheuint12_encrypt_with_compact_public_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheUint12}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint10_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint12_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheUint12}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint12_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint12_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheUint12}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint12_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheUint12 = CompactFheUint12;

const CompactFheUint128Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheuint128_free(ptr >>> 0));
/**
*/
class CompactFheUint128 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheUint128.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheUint128Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheUint128Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheuint128_free(ptr);
    }
    /**
    * @param {any} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheUint128}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfheuint128_encrypt_with_compact_public_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheUint128}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint10_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint128_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheUint128}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint128_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint128_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheUint128}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint128_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheUint128 = CompactFheUint128;

const CompactFheUint128ListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheuint128list_free(ptr >>> 0));
/**
*/
class CompactFheUint128List {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheUint128List.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheUint128ListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheUint128ListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheuint128list_free(ptr);
    }
    /**
    * @param {any[]} values
    * @param {TfheCompactPublicKey} public_key
    * @returns {CompactFheUint128List}
    */
    static encrypt_with_compact_public_key(values, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArrayJsValueToWasm0(values, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(public_key, TfheCompactPublicKey);
            wasm.compactfheuint128list_encrypt_with_compact_public_key(retptr, ptr0, len0, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint128List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint128list_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint128list_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheUint128List}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint128list_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint128List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheUint128List = CompactFheUint128List;

const CompactFheUint12ListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheuint12list_free(ptr >>> 0));
/**
*/
class CompactFheUint12List {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheUint12List.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheUint12ListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheUint12ListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheuint12list_free(ptr);
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint12list_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint12list_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheUint12List}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint12list_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint12List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint16Array} values
    * @param {TfheCompactPublicKey} public_key
    * @returns {CompactFheUint12List}
    */
    static encrypt_with_compact_public_key(values, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray16ToWasm0(values, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(public_key, TfheCompactPublicKey);
            wasm.compactfheuint12list_encrypt_with_compact_public_key(retptr, ptr0, len0, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint12List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheUint12List = CompactFheUint12List;

const CompactFheUint14Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheuint14_free(ptr >>> 0));
/**
*/
class CompactFheUint14 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheUint14.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheUint14Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheUint14Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheuint14_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheUint14}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfheuint14_encrypt_with_compact_public_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheUint14}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint10_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint14_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheUint14}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint14_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint14_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheUint14}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint14_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheUint14 = CompactFheUint14;

const CompactFheUint14ListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheuint14list_free(ptr >>> 0));
/**
*/
class CompactFheUint14List {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheUint14List.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheUint14ListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheUint14ListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheuint14list_free(ptr);
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint14list_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint14list_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheUint14List}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint14list_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint14List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint16Array} values
    * @param {TfheCompactPublicKey} public_key
    * @returns {CompactFheUint14List}
    */
    static encrypt_with_compact_public_key(values, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray16ToWasm0(values, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(public_key, TfheCompactPublicKey);
            wasm.compactfheuint14list_encrypt_with_compact_public_key(retptr, ptr0, len0, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint14List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheUint14List = CompactFheUint14List;

const CompactFheUint16Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheuint16_free(ptr >>> 0));
/**
*/
class CompactFheUint16 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheUint16.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheUint16Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheUint16Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheuint16_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheUint16}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfheuint16_encrypt_with_compact_public_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheUint16}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint10_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint16_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheUint16}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint16_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint16_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheUint16}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint16_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheUint16 = CompactFheUint16;

const CompactFheUint160Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheuint160_free(ptr >>> 0));
/**
*/
class CompactFheUint160 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheUint160.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheUint160Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheUint160Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheuint160_free(ptr);
    }
    /**
    * @param {any} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheUint160}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfheuint160_encrypt_with_compact_public_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheUint160}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint10_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint160_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheUint160}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint160_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint160_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheUint160}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint160_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheUint160 = CompactFheUint160;

const CompactFheUint160ListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheuint160list_free(ptr >>> 0));
/**
*/
class CompactFheUint160List {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheUint160List.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheUint160ListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheUint160ListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheuint160list_free(ptr);
    }
    /**
    * @param {any[]} values
    * @param {TfheCompactPublicKey} public_key
    * @returns {CompactFheUint160List}
    */
    static encrypt_with_compact_public_key(values, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArrayJsValueToWasm0(values, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(public_key, TfheCompactPublicKey);
            wasm.compactfheuint160list_encrypt_with_compact_public_key(retptr, ptr0, len0, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint160List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint160list_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint160list_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheUint160List}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint160list_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint160List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheUint160List = CompactFheUint160List;

const CompactFheUint16ListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheuint16list_free(ptr >>> 0));
/**
*/
class CompactFheUint16List {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheUint16List.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheUint16ListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheUint16ListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheuint16list_free(ptr);
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint16list_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint16list_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheUint16List}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint16list_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint16List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint16Array} values
    * @param {TfheCompactPublicKey} public_key
    * @returns {CompactFheUint16List}
    */
    static encrypt_with_compact_public_key(values, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray16ToWasm0(values, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(public_key, TfheCompactPublicKey);
            wasm.compactfheuint16list_encrypt_with_compact_public_key(retptr, ptr0, len0, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint16List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheUint16List = CompactFheUint16List;

const CompactFheUint2Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheuint2_free(ptr >>> 0));
/**
*/
class CompactFheUint2 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheUint2.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheUint2Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheUint2Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheuint2_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheUint2}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfheuint2_encrypt_with_compact_public_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheUint2}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint10_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint2_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheUint2}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint2_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint2_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheUint2}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint2_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheUint2 = CompactFheUint2;

const CompactFheUint256Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheuint256_free(ptr >>> 0));
/**
*/
class CompactFheUint256 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheUint256.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheUint256Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheUint256Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheuint256_free(ptr);
    }
    /**
    * @param {any} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheUint256}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfheuint256_encrypt_with_compact_public_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheUint256}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint10_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint256_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheUint256}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint256_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint256_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheUint256}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint256_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheUint256 = CompactFheUint256;

const CompactFheUint256ListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheuint256list_free(ptr >>> 0));
/**
*/
class CompactFheUint256List {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheUint256List.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheUint256ListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheUint256ListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheuint256list_free(ptr);
    }
    /**
    * @param {any[]} values
    * @param {TfheCompactPublicKey} public_key
    * @returns {CompactFheUint256List}
    */
    static encrypt_with_compact_public_key(values, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArrayJsValueToWasm0(values, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(public_key, TfheCompactPublicKey);
            wasm.compactfheuint256list_encrypt_with_compact_public_key(retptr, ptr0, len0, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint256List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint256list_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint256list_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheUint256List}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint256list_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint256List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheUint256List = CompactFheUint256List;

const CompactFheUint2ListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheuint2list_free(ptr >>> 0));
/**
*/
class CompactFheUint2List {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheUint2List.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheUint2ListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheUint2ListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheuint2list_free(ptr);
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint2list_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint2list_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheUint2List}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint2list_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint2List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} values
    * @param {TfheCompactPublicKey} public_key
    * @returns {CompactFheUint2List}
    */
    static encrypt_with_compact_public_key(values, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(values, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(public_key, TfheCompactPublicKey);
            wasm.compactfheuint2list_encrypt_with_compact_public_key(retptr, ptr0, len0, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint2List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheUint2List = CompactFheUint2List;

const CompactFheUint32Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheuint32_free(ptr >>> 0));
/**
*/
class CompactFheUint32 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheUint32.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheUint32Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheUint32Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheuint32_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheUint32}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfheuint32_encrypt_with_compact_public_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheUint32}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint10_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint32_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheUint32}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint32_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint32_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheUint32}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint32_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheUint32 = CompactFheUint32;

const CompactFheUint32ListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheuint32list_free(ptr >>> 0));
/**
*/
class CompactFheUint32List {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheUint32List.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheUint32ListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheUint32ListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheuint32list_free(ptr);
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint32list_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint32list_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheUint32List}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint32list_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint32List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint32Array} values
    * @param {TfheCompactPublicKey} public_key
    * @returns {CompactFheUint32List}
    */
    static encrypt_with_compact_public_key(values, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray32ToWasm0(values, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(public_key, TfheCompactPublicKey);
            wasm.compactfheuint32list_encrypt_with_compact_public_key(retptr, ptr0, len0, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint32List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheUint32List = CompactFheUint32List;

const CompactFheUint4Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheuint4_free(ptr >>> 0));
/**
*/
class CompactFheUint4 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheUint4.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheUint4Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheUint4Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheuint4_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheUint4}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfheuint4_encrypt_with_compact_public_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheUint4}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint10_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint4_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheUint4}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint4_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint4_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheUint4}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint4_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheUint4 = CompactFheUint4;

const CompactFheUint4ListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheuint4list_free(ptr >>> 0));
/**
*/
class CompactFheUint4List {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheUint4List.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheUint4ListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheUint4ListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheuint4list_free(ptr);
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint4list_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint4list_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheUint4List}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint4list_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint4List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} values
    * @param {TfheCompactPublicKey} public_key
    * @returns {CompactFheUint4List}
    */
    static encrypt_with_compact_public_key(values, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(values, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(public_key, TfheCompactPublicKey);
            wasm.compactfheuint4list_encrypt_with_compact_public_key(retptr, ptr0, len0, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint4List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheUint4List = CompactFheUint4List;

const CompactFheUint6Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheuint6_free(ptr >>> 0));
/**
*/
class CompactFheUint6 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheUint6.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheUint6Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheUint6Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheuint6_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheUint6}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfheuint6_encrypt_with_compact_public_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheUint6}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint10_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint6_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheUint6}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint6_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint6_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheUint6}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint6_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheUint6 = CompactFheUint6;

const CompactFheUint64Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheuint64_free(ptr >>> 0));
/**
*/
class CompactFheUint64 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheUint64.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheUint64Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheUint64Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheuint64_free(ptr);
    }
    /**
    * @param {bigint} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheUint64}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfheuint64_encrypt_with_compact_public_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheUint64}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint10_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint64_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheUint64}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint64_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint64_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheUint64}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint64_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheUint64 = CompactFheUint64;

const CompactFheUint64ListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheuint64list_free(ptr >>> 0));
/**
*/
class CompactFheUint64List {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheUint64List.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheUint64ListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheUint64ListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheuint64list_free(ptr);
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint64list_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint64list_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheUint64List}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint64list_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint64List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {BigUint64Array} values
    * @param {TfheCompactPublicKey} public_key
    * @returns {CompactFheUint64List}
    */
    static encrypt_with_compact_public_key(values, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray64ToWasm0(values, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(public_key, TfheCompactPublicKey);
            wasm.compactfheuint64list_encrypt_with_compact_public_key(retptr, ptr0, len0, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint64List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheUint64List = CompactFheUint64List;

const CompactFheUint6ListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheuint6list_free(ptr >>> 0));
/**
*/
class CompactFheUint6List {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheUint6List.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheUint6ListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheUint6ListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheuint6list_free(ptr);
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint6list_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint6list_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheUint6List}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint6list_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint6List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} values
    * @param {TfheCompactPublicKey} public_key
    * @returns {CompactFheUint6List}
    */
    static encrypt_with_compact_public_key(values, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(values, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(public_key, TfheCompactPublicKey);
            wasm.compactfheuint6list_encrypt_with_compact_public_key(retptr, ptr0, len0, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint6List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheUint6List = CompactFheUint6List;

const CompactFheUint8Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheuint8_free(ptr >>> 0));
/**
*/
class CompactFheUint8 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheUint8.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheUint8Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheUint8Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheuint8_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} client_key
    * @returns {CompactFheUint8}
    */
    static encrypt_with_compact_public_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheCompactPublicKey);
            wasm.compactfheuint8_encrypt_with_compact_public_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheUint8}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint10_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint8_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheUint8}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint8_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint8_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompactFheUint8}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint8_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheUint8 = CompactFheUint8;

const CompactFheUint8ListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compactfheuint8list_free(ptr >>> 0));
/**
*/
class CompactFheUint8List {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompactFheUint8List.prototype);
        obj.__wbg_ptr = ptr;
        CompactFheUint8ListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompactFheUint8ListFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compactfheuint8list_free(ptr);
    }
    /**
    * @returns {any[]}
    */
    expand() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint8list_expand(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compactfheuint8list_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompactFheUint8List}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compactfheuint8list_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint8List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} values
    * @param {TfheCompactPublicKey} public_key
    * @returns {CompactFheUint8List}
    */
    static encrypt_with_compact_public_key(values, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(values, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(public_key, TfheCompactPublicKey);
            wasm.compactfheuint8list_encrypt_with_compact_public_key(retptr, ptr0, len0, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompactFheUint8List.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompactFheUint8List = CompactFheUint8List;

const CompressedFheBoolFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfhebool_free(ptr >>> 0));
/**
*/
class CompressedFheBool {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheBool.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheBoolFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheBoolFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfhebool_free(ptr);
    }
    /**
    * @param {boolean} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheBool}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfhebool_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheBool.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheBool}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfhebool_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheBool.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfhebool_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheBool}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfhebool_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheBool.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfhebool_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheBool}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfhebool_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheBool.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheBool = CompressedFheBool;

const CompressedFheInt10Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfheint10_free(ptr >>> 0));
/**
*/
class CompressedFheInt10 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheInt10.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheInt10Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheInt10Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfheint10_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheInt10}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfheint10_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheInt10}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint10_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint10_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheInt10}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheint10_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint10_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheInt10}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheint10_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheInt10 = CompressedFheInt10;

const CompressedFheInt12Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfheint12_free(ptr >>> 0));
/**
*/
class CompressedFheInt12 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheInt12.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheInt12Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheInt12Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfheint12_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheInt12}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfheint12_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheInt12}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint10_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint12_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheInt12}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheint12_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint12_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheInt12}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheint12_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheInt12 = CompressedFheInt12;

const CompressedFheInt128Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfheint128_free(ptr >>> 0));
/**
*/
class CompressedFheInt128 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheInt128.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheInt128Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheInt128Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfheint128_free(ptr);
    }
    /**
    * @param {any} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheInt128}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfheint128_encrypt_with_client_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheInt128}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint10_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint128_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheInt128}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheint128_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint128_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheInt128}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheint128_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheInt128 = CompressedFheInt128;

const CompressedFheInt14Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfheint14_free(ptr >>> 0));
/**
*/
class CompressedFheInt14 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheInt14.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheInt14Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheInt14Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfheint14_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheInt14}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfheint14_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheInt14}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint10_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint14_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheInt14}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheint14_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint14_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheInt14}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheint14_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheInt14 = CompressedFheInt14;

const CompressedFheInt16Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfheint16_free(ptr >>> 0));
/**
*/
class CompressedFheInt16 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheInt16.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheInt16Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheInt16Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfheint16_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheInt16}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfheint16_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheInt16}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint10_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint16_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheInt16}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheint16_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint16_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheInt16}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheint16_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheInt16 = CompressedFheInt16;

const CompressedFheInt160Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfheint160_free(ptr >>> 0));
/**
*/
class CompressedFheInt160 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheInt160.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheInt160Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheInt160Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfheint160_free(ptr);
    }
    /**
    * @param {any} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheInt160}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfheint160_encrypt_with_client_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheInt160}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint10_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint160_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheInt160}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheint160_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint160_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheInt160}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheint160_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheInt160 = CompressedFheInt160;

const CompressedFheInt2Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfheint2_free(ptr >>> 0));
/**
*/
class CompressedFheInt2 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheInt2.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheInt2Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheInt2Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfheint2_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheInt2}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfheint2_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheInt2}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint10_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint2_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheInt2}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheint2_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint2_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheInt2}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheint2_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheInt2 = CompressedFheInt2;

const CompressedFheInt256Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfheint256_free(ptr >>> 0));
/**
*/
class CompressedFheInt256 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheInt256.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheInt256Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheInt256Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfheint256_free(ptr);
    }
    /**
    * @param {any} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheInt256}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfheint256_encrypt_with_client_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheInt256}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint10_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint256_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheInt256}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheint256_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint256_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheInt256}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheint256_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheInt256 = CompressedFheInt256;

const CompressedFheInt32Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfheint32_free(ptr >>> 0));
/**
*/
class CompressedFheInt32 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheInt32.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheInt32Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheInt32Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfheint32_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheInt32}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfheint32_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheInt32}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint10_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint32_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheInt32}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheint32_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint32_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheInt32}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheint32_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheInt32 = CompressedFheInt32;

const CompressedFheInt4Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfheint4_free(ptr >>> 0));
/**
*/
class CompressedFheInt4 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheInt4.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheInt4Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheInt4Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfheint4_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheInt4}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfheint4_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheInt4}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint10_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint4_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheInt4}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheint4_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint4_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheInt4}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheint4_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheInt4 = CompressedFheInt4;

const CompressedFheInt6Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfheint6_free(ptr >>> 0));
/**
*/
class CompressedFheInt6 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheInt6.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheInt6Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheInt6Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfheint6_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheInt6}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfheint6_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheInt6}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint10_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint6_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheInt6}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheint6_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint6_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheInt6}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheint6_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheInt6 = CompressedFheInt6;

const CompressedFheInt64Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfheint64_free(ptr >>> 0));
/**
*/
class CompressedFheInt64 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheInt64.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheInt64Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheInt64Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfheint64_free(ptr);
    }
    /**
    * @param {bigint} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheInt64}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfheint64_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheInt64}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint10_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint64_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheInt64}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheint64_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint64_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheInt64}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheint64_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheInt64 = CompressedFheInt64;

const CompressedFheInt8Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfheint8_free(ptr >>> 0));
/**
*/
class CompressedFheInt8 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheInt8.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheInt8Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheInt8Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfheint8_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheInt8}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfheint8_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheInt8}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint10_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint8_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheInt8}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheint8_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheint8_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheInt8}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheint8_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheInt8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheInt8 = CompressedFheInt8;

const CompressedFheUint10Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfheuint10_free(ptr >>> 0));
/**
*/
class CompressedFheUint10 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheUint10.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheUint10Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheUint10Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfheuint10_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheUint10}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfheuint10_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheUint10}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint10_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint10_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheUint10}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheuint10_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint10_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheUint10}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheuint10_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheUint10 = CompressedFheUint10;

const CompressedFheUint12Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfheuint12_free(ptr >>> 0));
/**
*/
class CompressedFheUint12 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheUint12.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheUint12Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheUint12Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfheuint12_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheUint12}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfheuint12_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheUint12}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint10_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint12_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheUint12}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheuint12_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint12_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheUint12}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheuint12_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheUint12 = CompressedFheUint12;

const CompressedFheUint128Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfheuint128_free(ptr >>> 0));
/**
*/
class CompressedFheUint128 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheUint128.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheUint128Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheUint128Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfheuint128_free(ptr);
    }
    /**
    * @param {any} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheUint128}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfheuint128_encrypt_with_client_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheUint128}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint10_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint128_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheUint128}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheuint128_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint128_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheUint128}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheuint128_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheUint128 = CompressedFheUint128;

const CompressedFheUint14Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfheuint14_free(ptr >>> 0));
/**
*/
class CompressedFheUint14 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheUint14.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheUint14Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheUint14Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfheuint14_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheUint14}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfheuint14_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheUint14}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint10_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint14_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheUint14}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheuint14_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint14_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheUint14}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheuint14_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheUint14 = CompressedFheUint14;

const CompressedFheUint16Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfheuint16_free(ptr >>> 0));
/**
*/
class CompressedFheUint16 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheUint16.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheUint16Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheUint16Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfheuint16_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheUint16}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfheuint16_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheUint16}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint10_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint16_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheUint16}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheuint16_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint16_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheUint16}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheuint16_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheUint16 = CompressedFheUint16;

const CompressedFheUint160Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfheuint160_free(ptr >>> 0));
/**
*/
class CompressedFheUint160 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheUint160.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheUint160Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheUint160Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfheuint160_free(ptr);
    }
    /**
    * @param {any} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheUint160}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfheuint160_encrypt_with_client_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheUint160}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint10_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint160_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheUint160}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheuint160_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint160_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheUint160}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheuint160_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheUint160 = CompressedFheUint160;

const CompressedFheUint2Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfheuint2_free(ptr >>> 0));
/**
*/
class CompressedFheUint2 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheUint2.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheUint2Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheUint2Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfheuint2_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheUint2}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfheuint2_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheUint2}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint10_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint2_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheUint2}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheuint2_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint2_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheUint2}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheuint2_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheUint2 = CompressedFheUint2;

const CompressedFheUint256Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfheuint256_free(ptr >>> 0));
/**
*/
class CompressedFheUint256 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheUint256.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheUint256Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheUint256Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfheuint256_free(ptr);
    }
    /**
    * @param {any} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheUint256}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfheuint256_encrypt_with_client_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheUint256}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint10_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint256_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheUint256}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheuint256_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint256_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheUint256}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheuint256_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheUint256 = CompressedFheUint256;

const CompressedFheUint32Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfheuint32_free(ptr >>> 0));
/**
*/
class CompressedFheUint32 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheUint32.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheUint32Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheUint32Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfheuint32_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheUint32}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfheuint32_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheUint32}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint10_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint32_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheUint32}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheuint32_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint32_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheUint32}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheuint32_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheUint32 = CompressedFheUint32;

const CompressedFheUint4Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfheuint4_free(ptr >>> 0));
/**
*/
class CompressedFheUint4 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheUint4.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheUint4Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheUint4Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfheuint4_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheUint4}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfheuint4_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheUint4}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint10_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint4_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheUint4}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheuint4_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint4_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheUint4}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheuint4_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheUint4 = CompressedFheUint4;

const CompressedFheUint6Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfheuint6_free(ptr >>> 0));
/**
*/
class CompressedFheUint6 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheUint6.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheUint6Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheUint6Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfheuint6_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheUint6}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfheuint6_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheUint6}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint10_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint6_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheUint6}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheuint6_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint6_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheUint6}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheuint6_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheUint6 = CompressedFheUint6;

const CompressedFheUint64Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfheuint64_free(ptr >>> 0));
/**
*/
class CompressedFheUint64 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheUint64.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheUint64Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheUint64Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfheuint64_free(ptr);
    }
    /**
    * @param {bigint} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheUint64}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfheuint64_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheUint64}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint10_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint64_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheUint64}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheuint64_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint64_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheUint64}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheuint64_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheUint64 = CompressedFheUint64;

const CompressedFheUint8Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_compressedfheuint8_free(ptr >>> 0));
/**
*/
class CompressedFheUint8 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CompressedFheUint8.prototype);
        obj.__wbg_ptr = ptr;
        CompressedFheUint8Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CompressedFheUint8Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_compressedfheuint8_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {CompressedFheUint8}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.compressedfheuint8_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {FheUint8}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint10_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint8_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {CompressedFheUint8}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheuint8_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.compressedfheuint8_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {CompressedFheUint8}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.compressedfheuint8_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return CompressedFheUint8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.CompressedFheUint8 = CompressedFheUint8;

const FheBoolFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fhebool_free(ptr >>> 0));
/**
*/
class FheBool {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheBool.prototype);
        obj.__wbg_ptr = ptr;
        FheBoolFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheBoolFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fhebool_free(ptr);
    }
    /**
    * @param {boolean} value
    * @param {TfheClientKey} client_key
    * @returns {FheBool}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fhebool_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheBool.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {boolean} value
    * @param {TfhePublicKey} public_key
    * @returns {FheBool}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fhebool_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheBool.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {boolean} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheBool}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fhebool_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheBool.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {boolean} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheBool}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fhebool_encrypt_with_compact_public_key(retptr, value, compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheBool.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {boolean}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fhebool_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0 !== 0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fhebool_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheBool}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fhebool_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheBool.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fhebool_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheBool}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fhebool_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheBool.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheBool = FheBool;

const FheInt10Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fheint10_free(ptr >>> 0));
/**
*/
class FheInt10 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheInt10.prototype);
        obj.__wbg_ptr = ptr;
        FheInt10Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheInt10Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fheint10_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {FheInt10}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheint10_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfhePublicKey} public_key
    * @returns {FheInt10}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fheint10_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheInt10}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fheint10_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheInt10}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fheint10_encrypt_with_compact_public_key(retptr, value, compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {number}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheint10_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheint10_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheInt10}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheint10_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheint10_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheInt10}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheint10_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheInt10 = FheInt10;

const FheInt12Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fheint12_free(ptr >>> 0));
/**
*/
class FheInt12 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheInt12.prototype);
        obj.__wbg_ptr = ptr;
        FheInt12Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheInt12Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fheint12_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {FheInt12}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheint12_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfhePublicKey} public_key
    * @returns {FheInt12}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fheint12_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheInt12}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fheint12_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheInt12}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fheint12_encrypt_with_compact_public_key(retptr, value, compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {number}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheint10_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheint12_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheInt12}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheint12_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheint12_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheInt12}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheint12_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheInt12 = FheInt12;

const FheInt128Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fheint128_free(ptr >>> 0));
/**
*/
class FheInt128 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheInt128.prototype);
        obj.__wbg_ptr = ptr;
        FheInt128Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheInt128Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fheint128_free(ptr);
    }
    /**
    * @param {any} value
    * @param {TfheClientKey} client_key
    * @returns {FheInt128}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheint128_encrypt_with_client_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {any} value
    * @param {TfhePublicKey} public_key
    * @returns {FheInt128}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fheint128_encrypt_with_public_key(retptr, addHeapObject(value), public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {any} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheInt128}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fheint128_encrypt_with_compressed_public_key(retptr, addHeapObject(value), compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {any} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheInt128}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fheint128_encrypt_with_compact_public_key(retptr, addHeapObject(value), compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {any}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheint128_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheint128_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheInt128}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheint128_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheint128_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheInt128}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheint128_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheInt128 = FheInt128;

const FheInt14Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fheint14_free(ptr >>> 0));
/**
*/
class FheInt14 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheInt14.prototype);
        obj.__wbg_ptr = ptr;
        FheInt14Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheInt14Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fheint14_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {FheInt14}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheint14_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfhePublicKey} public_key
    * @returns {FheInt14}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fheint14_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheInt14}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fheint14_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheInt14}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fheint14_encrypt_with_compact_public_key(retptr, value, compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {number}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheint10_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheint14_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheInt14}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheint14_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheint14_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheInt14}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheint14_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheInt14 = FheInt14;

const FheInt16Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fheint16_free(ptr >>> 0));
/**
*/
class FheInt16 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheInt16.prototype);
        obj.__wbg_ptr = ptr;
        FheInt16Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheInt16Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fheint16_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {FheInt16}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheint16_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfhePublicKey} public_key
    * @returns {FheInt16}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fheint16_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheInt16}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fheint16_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheInt16}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fheint16_encrypt_with_compact_public_key(retptr, value, compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {number}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheint10_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheint16_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheInt16}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheint16_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheint16_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheInt16}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheint16_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheInt16 = FheInt16;

const FheInt160Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fheint160_free(ptr >>> 0));
/**
*/
class FheInt160 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheInt160.prototype);
        obj.__wbg_ptr = ptr;
        FheInt160Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheInt160Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fheint160_free(ptr);
    }
    /**
    * @param {any} value
    * @param {TfheClientKey} client_key
    * @returns {FheInt160}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheint160_encrypt_with_client_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {any} value
    * @param {TfhePublicKey} public_key
    * @returns {FheInt160}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fheint160_encrypt_with_public_key(retptr, addHeapObject(value), public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {any} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheInt160}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fheint160_encrypt_with_compressed_public_key(retptr, addHeapObject(value), compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {any} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheInt160}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fheint160_encrypt_with_compact_public_key(retptr, addHeapObject(value), compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {any}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheint160_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheint160_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheInt160}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheint160_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheint160_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheInt160}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheint160_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheInt160 = FheInt160;

const FheInt2Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fheint2_free(ptr >>> 0));
/**
*/
class FheInt2 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheInt2.prototype);
        obj.__wbg_ptr = ptr;
        FheInt2Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheInt2Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fheint2_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {FheInt2}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheint2_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfhePublicKey} public_key
    * @returns {FheInt2}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fheint2_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheInt2}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fheint2_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheInt2}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fheint2_encrypt_with_compact_public_key(retptr, value, compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {number}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheint2_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheint2_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheInt2}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheint2_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheint2_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheInt2}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheint2_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheInt2 = FheInt2;

const FheInt256Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fheint256_free(ptr >>> 0));
/**
*/
class FheInt256 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheInt256.prototype);
        obj.__wbg_ptr = ptr;
        FheInt256Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheInt256Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fheint256_free(ptr);
    }
    /**
    * @param {any} value
    * @param {TfheClientKey} client_key
    * @returns {FheInt256}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheint256_encrypt_with_client_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {any} value
    * @param {TfhePublicKey} public_key
    * @returns {FheInt256}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fheint256_encrypt_with_public_key(retptr, addHeapObject(value), public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {any} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheInt256}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fheint256_encrypt_with_compressed_public_key(retptr, addHeapObject(value), compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {any} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheInt256}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fheint256_encrypt_with_compact_public_key(retptr, addHeapObject(value), compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {any}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheint160_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheint256_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheInt256}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheint256_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheint256_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheInt256}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheint256_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheInt256 = FheInt256;

const FheInt32Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fheint32_free(ptr >>> 0));
/**
*/
class FheInt32 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheInt32.prototype);
        obj.__wbg_ptr = ptr;
        FheInt32Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheInt32Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fheint32_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {FheInt32}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheint32_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfhePublicKey} public_key
    * @returns {FheInt32}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fheint32_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheInt32}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fheint32_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheInt32}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fheint32_encrypt_with_compact_public_key(retptr, value, compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {number}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheint32_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheint32_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheInt32}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheint32_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheint32_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheInt32}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheint32_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheInt32 = FheInt32;

const FheInt4Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fheint4_free(ptr >>> 0));
/**
*/
class FheInt4 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheInt4.prototype);
        obj.__wbg_ptr = ptr;
        FheInt4Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheInt4Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fheint4_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {FheInt4}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheint4_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfhePublicKey} public_key
    * @returns {FheInt4}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fheint4_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheInt4}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fheint4_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheInt4}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fheint4_encrypt_with_compact_public_key(retptr, value, compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {number}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheint2_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheint4_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheInt4}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheint4_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheint4_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheInt4}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheint4_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheInt4 = FheInt4;

const FheInt6Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fheint6_free(ptr >>> 0));
/**
*/
class FheInt6 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheInt6.prototype);
        obj.__wbg_ptr = ptr;
        FheInt6Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheInt6Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fheint6_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {FheInt6}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheint6_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfhePublicKey} public_key
    * @returns {FheInt6}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fheint6_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheInt6}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fheint6_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheInt6}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fheint6_encrypt_with_compact_public_key(retptr, value, compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {number}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheint2_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheint6_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheInt6}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheint6_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheint6_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheInt6}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheint6_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheInt6 = FheInt6;

const FheInt64Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fheint64_free(ptr >>> 0));
/**
*/
class FheInt64 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheInt64.prototype);
        obj.__wbg_ptr = ptr;
        FheInt64Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheInt64Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fheint64_free(ptr);
    }
    /**
    * @param {bigint} value
    * @param {TfheClientKey} client_key
    * @returns {FheInt64}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheint64_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} value
    * @param {TfhePublicKey} public_key
    * @returns {FheInt64}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fheint64_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheInt64}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fheint64_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheInt64}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fheint64_encrypt_with_compact_public_key(retptr, value, compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {bigint}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheint64_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getBigInt64Memory0()[retptr / 8 + 0];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            return r0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheint64_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheInt64}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheint64_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheint64_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheInt64}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheint64_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheInt64 = FheInt64;

const FheInt8Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fheint8_free(ptr >>> 0));
/**
*/
class FheInt8 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheInt8.prototype);
        obj.__wbg_ptr = ptr;
        FheInt8Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheInt8Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fheint8_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {FheInt8}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheint8_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfhePublicKey} public_key
    * @returns {FheInt8}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fheint8_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheInt8}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fheint8_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheInt8}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fheint8_encrypt_with_compact_public_key(retptr, value, compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {number}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheint2_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheint8_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheInt8}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheint8_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheint8_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheInt8}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheint8_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheInt8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheInt8 = FheInt8;

const FheUint10Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fheuint10_free(ptr >>> 0));
/**
*/
class FheUint10 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheUint10.prototype);
        obj.__wbg_ptr = ptr;
        FheUint10Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheUint10Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fheuint10_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {FheUint10}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheuint10_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfhePublicKey} public_key
    * @returns {FheUint10}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fheuint10_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheUint10}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fheuint10_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheUint10}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fheuint10_encrypt_with_compact_public_key(retptr, value, compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {number}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheuint10_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheuint10_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheUint10}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheuint10_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheuint10_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheUint10}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheuint10_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint10.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheUint10 = FheUint10;

const FheUint12Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fheuint12_free(ptr >>> 0));
/**
*/
class FheUint12 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheUint12.prototype);
        obj.__wbg_ptr = ptr;
        FheUint12Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheUint12Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fheuint12_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {FheUint12}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheuint12_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfhePublicKey} public_key
    * @returns {FheUint12}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fheuint12_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheUint12}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fheuint12_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheUint12}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fheuint12_encrypt_with_compact_public_key(retptr, value, compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {number}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheuint10_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheuint12_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheUint12}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheuint12_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheuint12_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheUint12}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheuint12_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint12.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheUint12 = FheUint12;

const FheUint128Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fheuint128_free(ptr >>> 0));
/**
*/
class FheUint128 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheUint128.prototype);
        obj.__wbg_ptr = ptr;
        FheUint128Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheUint128Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fheuint128_free(ptr);
    }
    /**
    * @param {any} value
    * @param {TfheClientKey} client_key
    * @returns {FheUint128}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheuint128_encrypt_with_client_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {any} value
    * @param {TfhePublicKey} public_key
    * @returns {FheUint128}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fheuint128_encrypt_with_public_key(retptr, addHeapObject(value), public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {any} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheUint128}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fheuint128_encrypt_with_compressed_public_key(retptr, addHeapObject(value), compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {any} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheUint128}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fheuint128_encrypt_with_compact_public_key(retptr, addHeapObject(value), compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {any}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheuint128_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheuint128_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheUint128}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheuint128_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheuint128_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheUint128}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheuint128_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint128.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheUint128 = FheUint128;

const FheUint14Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fheuint14_free(ptr >>> 0));
/**
*/
class FheUint14 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheUint14.prototype);
        obj.__wbg_ptr = ptr;
        FheUint14Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheUint14Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fheuint14_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {FheUint14}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheuint14_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfhePublicKey} public_key
    * @returns {FheUint14}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fheuint14_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheUint14}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fheuint14_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheUint14}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fheuint14_encrypt_with_compact_public_key(retptr, value, compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {number}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheuint10_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheuint14_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheUint14}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheuint14_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheuint14_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheUint14}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheuint14_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint14.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheUint14 = FheUint14;

const FheUint16Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fheuint16_free(ptr >>> 0));
/**
*/
class FheUint16 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheUint16.prototype);
        obj.__wbg_ptr = ptr;
        FheUint16Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheUint16Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fheuint16_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {FheUint16}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheuint16_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfhePublicKey} public_key
    * @returns {FheUint16}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fheuint16_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheUint16}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fheuint16_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheUint16}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fheuint16_encrypt_with_compact_public_key(retptr, value, compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {number}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheuint10_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheuint16_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheUint16}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheuint16_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheuint16_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheUint16}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheuint16_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint16.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheUint16 = FheUint16;

const FheUint160Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fheuint160_free(ptr >>> 0));
/**
*/
class FheUint160 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheUint160.prototype);
        obj.__wbg_ptr = ptr;
        FheUint160Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheUint160Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fheuint160_free(ptr);
    }
    /**
    * @param {any} value
    * @param {TfheClientKey} client_key
    * @returns {FheUint160}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheuint160_encrypt_with_client_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {any} value
    * @param {TfhePublicKey} public_key
    * @returns {FheUint160}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fheuint160_encrypt_with_public_key(retptr, addHeapObject(value), public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {any} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheUint160}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fheuint160_encrypt_with_compressed_public_key(retptr, addHeapObject(value), compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {any} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheUint160}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fheuint160_encrypt_with_compact_public_key(retptr, addHeapObject(value), compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {any}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheuint160_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheuint160_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheUint160}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheuint160_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheuint160_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheUint160}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheuint160_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint160.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheUint160 = FheUint160;

const FheUint2Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fheuint2_free(ptr >>> 0));
/**
*/
class FheUint2 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheUint2.prototype);
        obj.__wbg_ptr = ptr;
        FheUint2Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheUint2Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fheuint2_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {FheUint2}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheuint2_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfhePublicKey} public_key
    * @returns {FheUint2}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fheuint2_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheUint2}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fheuint2_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheUint2}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fheuint2_encrypt_with_compact_public_key(retptr, value, compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {number}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheuint2_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheuint2_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheUint2}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheuint2_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheuint2_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheUint2}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheuint2_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint2.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheUint2 = FheUint2;

const FheUint256Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fheuint256_free(ptr >>> 0));
/**
*/
class FheUint256 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheUint256.prototype);
        obj.__wbg_ptr = ptr;
        FheUint256Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheUint256Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fheuint256_free(ptr);
    }
    /**
    * @param {any} value
    * @param {TfheClientKey} client_key
    * @returns {FheUint256}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheuint256_encrypt_with_client_key(retptr, addHeapObject(value), client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {any} value
    * @param {TfhePublicKey} public_key
    * @returns {FheUint256}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fheuint256_encrypt_with_public_key(retptr, addHeapObject(value), public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {any} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheUint256}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fheuint256_encrypt_with_compressed_public_key(retptr, addHeapObject(value), compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {any} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheUint256}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fheuint256_encrypt_with_compact_public_key(retptr, addHeapObject(value), compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {any}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheuint160_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheuint256_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheUint256}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheuint256_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheuint256_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheUint256}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheuint256_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint256.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheUint256 = FheUint256;

const FheUint32Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fheuint32_free(ptr >>> 0));
/**
*/
class FheUint32 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheUint32.prototype);
        obj.__wbg_ptr = ptr;
        FheUint32Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheUint32Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fheuint32_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {FheUint32}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheuint32_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfhePublicKey} public_key
    * @returns {FheUint32}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fheuint32_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheUint32}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fheuint32_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheUint32}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fheuint32_encrypt_with_compact_public_key(retptr, value, compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {number}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheuint32_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0 >>> 0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheuint32_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheUint32}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheuint32_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheuint32_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheUint32}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheuint32_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint32.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheUint32 = FheUint32;

const FheUint4Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fheuint4_free(ptr >>> 0));
/**
*/
class FheUint4 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheUint4.prototype);
        obj.__wbg_ptr = ptr;
        FheUint4Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheUint4Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fheuint4_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {FheUint4}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheuint4_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfhePublicKey} public_key
    * @returns {FheUint4}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fheuint4_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheUint4}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fheuint4_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheUint4}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fheuint4_encrypt_with_compact_public_key(retptr, value, compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {number}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheuint2_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheuint4_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheUint4}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheuint4_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheuint4_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheUint4}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheuint4_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint4.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheUint4 = FheUint4;

const FheUint6Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fheuint6_free(ptr >>> 0));
/**
*/
class FheUint6 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheUint6.prototype);
        obj.__wbg_ptr = ptr;
        FheUint6Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheUint6Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fheuint6_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {FheUint6}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheuint6_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfhePublicKey} public_key
    * @returns {FheUint6}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fheuint6_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheUint6}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fheuint6_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheUint6}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fheuint6_encrypt_with_compact_public_key(retptr, value, compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {number}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheuint2_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheuint6_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheUint6}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheuint6_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheuint6_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheUint6}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheuint6_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint6.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheUint6 = FheUint6;

const FheUint64Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fheuint64_free(ptr >>> 0));
/**
*/
class FheUint64 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheUint64.prototype);
        obj.__wbg_ptr = ptr;
        FheUint64Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheUint64Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fheuint64_free(ptr);
    }
    /**
    * @param {bigint} value
    * @param {TfheClientKey} client_key
    * @returns {FheUint64}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheuint64_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} value
    * @param {TfhePublicKey} public_key
    * @returns {FheUint64}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fheuint64_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheUint64}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fheuint64_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheUint64}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fheuint64_encrypt_with_compact_public_key(retptr, value, compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {bigint}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheuint64_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getBigInt64Memory0()[retptr / 8 + 0];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            return BigInt.asUintN(64, r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheuint64_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheUint64}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheuint64_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheuint64_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheUint64}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheuint64_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint64.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheUint64 = FheUint64;

const FheUint8Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fheuint8_free(ptr >>> 0));
/**
*/
class FheUint8 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FheUint8.prototype);
        obj.__wbg_ptr = ptr;
        FheUint8Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FheUint8Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fheuint8_free(ptr);
    }
    /**
    * @param {number} value
    * @param {TfheClientKey} client_key
    * @returns {FheUint8}
    */
    static encrypt_with_client_key(value, client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheuint8_encrypt_with_client_key(retptr, value, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfhePublicKey} public_key
    * @returns {FheUint8}
    */
    static encrypt_with_public_key(value, public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, TfhePublicKey);
            wasm.fheuint8_encrypt_with_public_key(retptr, value, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompressedPublicKey} compressed_public_key
    * @returns {FheUint8}
    */
    static encrypt_with_compressed_public_key(value, compressed_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compressed_public_key, TfheCompressedPublicKey);
            wasm.fheuint8_encrypt_with_compressed_public_key(retptr, value, compressed_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} value
    * @param {TfheCompactPublicKey} compact_public_key
    * @returns {FheUint8}
    */
    static encrypt_with_compact_public_key(value, compact_public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(compact_public_key, TfheCompactPublicKey);
            wasm.fheuint8_encrypt_with_compact_public_key(retptr, value, compact_public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {number}
    */
    decrypt(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.fheuint2_decrypt(retptr, this.__wbg_ptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheuint8_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {FheUint8}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheuint8_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {bigint} serialized_size_limit
    * @returns {Uint8Array}
    */
    safe_serialize(serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.fheuint8_safe_serialize(retptr, this.__wbg_ptr, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @param {bigint} serialized_size_limit
    * @returns {FheUint8}
    */
    static safe_deserialize(buffer, serialized_size_limit) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.fheuint8_safe_deserialize(retptr, ptr0, len0, serialized_size_limit);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return FheUint8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.FheUint8 = FheUint8;

const ShortintFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_shortint_free(ptr >>> 0));
/**
*/
class Shortint {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ShortintFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_shortint_free(ptr);
    }
    /**
    * @param {number} message_bits
    * @param {number} carry_bits
    * @returns {ShortintParameters}
    */
    static get_parameters(message_bits, carry_bits) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.shortint_get_parameters(retptr, message_bits, carry_bits);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ShortintParameters.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} message_bits
    * @param {number} carry_bits
    * @returns {ShortintParameters}
    */
    static get_parameters_small(message_bits, carry_bits) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.shortint_get_parameters_small(retptr, message_bits, carry_bits);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ShortintParameters.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} lwe_dimension
    * @param {number} glwe_dimension
    * @param {number} polynomial_size
    * @param {number} lwe_modular_std_dev
    * @param {number} glwe_modular_std_dev
    * @param {number} pbs_base_log
    * @param {number} pbs_level
    * @param {number} ks_base_log
    * @param {number} ks_level
    * @param {number} message_modulus
    * @param {number} carry_modulus
    * @param {number} modulus_power_of_2_exponent
    * @param {ShortintEncryptionKeyChoice} encryption_key_choice
    * @returns {ShortintParameters}
    */
    static new_parameters(lwe_dimension, glwe_dimension, polynomial_size, lwe_modular_std_dev, glwe_modular_std_dev, pbs_base_log, pbs_level, ks_base_log, ks_level, message_modulus, carry_modulus, modulus_power_of_2_exponent, encryption_key_choice) {
        const ret = wasm.shortint_new_parameters(lwe_dimension, glwe_dimension, polynomial_size, lwe_modular_std_dev, glwe_modular_std_dev, pbs_base_log, pbs_level, ks_base_log, ks_level, message_modulus, carry_modulus, modulus_power_of_2_exponent, encryption_key_choice);
        return ShortintParameters.__wrap(ret);
    }
    /**
    * @param {bigint} seed_high_bytes
    * @param {bigint} seed_low_bytes
    * @param {ShortintParameters} parameters
    * @returns {ShortintClientKey}
    */
    static new_client_key_from_seed_and_parameters(seed_high_bytes, seed_low_bytes, parameters) {
        _assertClass(parameters, ShortintParameters);
        const ret = wasm.shortint_new_client_key_from_seed_and_parameters(seed_high_bytes, seed_low_bytes, parameters.__wbg_ptr);
        return ShortintClientKey.__wrap(ret);
    }
    /**
    * @param {ShortintParameters} parameters
    * @returns {ShortintClientKey}
    */
    static new_client_key(parameters) {
        _assertClass(parameters, ShortintParameters);
        const ret = wasm.shortint_new_client_key(parameters.__wbg_ptr);
        return ShortintClientKey.__wrap(ret);
    }
    /**
    * @param {ShortintClientKey} client_key
    * @returns {ShortintPublicKey}
    */
    static new_public_key(client_key) {
        _assertClass(client_key, ShortintClientKey);
        const ret = wasm.shortint_new_public_key(client_key.__wbg_ptr);
        return ShortintPublicKey.__wrap(ret);
    }
    /**
    * @param {ShortintClientKey} client_key
    * @returns {ShortintCompressedPublicKey}
    */
    static new_compressed_public_key(client_key) {
        _assertClass(client_key, ShortintClientKey);
        const ret = wasm.shortint_new_compressed_public_key(client_key.__wbg_ptr);
        return ShortintCompressedPublicKey.__wrap(ret);
    }
    /**
    * @param {ShortintClientKey} client_key
    * @returns {ShortintCompressedServerKey}
    */
    static new_compressed_server_key(client_key) {
        _assertClass(client_key, ShortintClientKey);
        const ret = wasm.shortint_new_compressed_server_key(client_key.__wbg_ptr);
        return ShortintCompressedServerKey.__wrap(ret);
    }
    /**
    * @param {ShortintClientKey} client_key
    * @param {bigint} message
    * @returns {ShortintCiphertext}
    */
    static encrypt(client_key, message) {
        _assertClass(client_key, ShortintClientKey);
        const ret = wasm.shortint_encrypt(client_key.__wbg_ptr, message);
        return ShortintCiphertext.__wrap(ret);
    }
    /**
    * @param {ShortintClientKey} client_key
    * @param {bigint} message
    * @returns {ShortintCompressedCiphertext}
    */
    static encrypt_compressed(client_key, message) {
        _assertClass(client_key, ShortintClientKey);
        const ret = wasm.shortint_encrypt_compressed(client_key.__wbg_ptr, message);
        return ShortintCompressedCiphertext.__wrap(ret);
    }
    /**
    * @param {ShortintCompressedCiphertext} compressed_ciphertext
    * @returns {ShortintCiphertext}
    */
    static decompress_ciphertext(compressed_ciphertext) {
        _assertClass(compressed_ciphertext, ShortintCompressedCiphertext);
        const ret = wasm.shortint_decompress_ciphertext(compressed_ciphertext.__wbg_ptr);
        return ShortintCiphertext.__wrap(ret);
    }
    /**
    * @param {ShortintPublicKey} public_key
    * @param {bigint} message
    * @returns {ShortintCiphertext}
    */
    static encrypt_with_public_key(public_key, message) {
        _assertClass(public_key, ShortintPublicKey);
        const ret = wasm.shortint_encrypt_with_public_key(public_key.__wbg_ptr, message);
        return ShortintCiphertext.__wrap(ret);
    }
    /**
    * @param {ShortintCompressedPublicKey} public_key
    * @param {bigint} message
    * @returns {ShortintCiphertext}
    */
    static encrypt_with_compressed_public_key(public_key, message) {
        _assertClass(public_key, ShortintCompressedPublicKey);
        const ret = wasm.shortint_encrypt_with_compressed_public_key(public_key.__wbg_ptr, message);
        return ShortintCiphertext.__wrap(ret);
    }
    /**
    * @param {ShortintClientKey} client_key
    * @param {ShortintCiphertext} ct
    * @returns {bigint}
    */
    static decrypt(client_key, ct) {
        _assertClass(client_key, ShortintClientKey);
        _assertClass(ct, ShortintCiphertext);
        const ret = wasm.shortint_decrypt(client_key.__wbg_ptr, ct.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
    * @param {ShortintCiphertext} ciphertext
    * @returns {Uint8Array}
    */
    static serialize_ciphertext(ciphertext) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(ciphertext, ShortintCiphertext);
            wasm.shortint_serialize_ciphertext(retptr, ciphertext.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {ShortintCiphertext}
    */
    static deserialize_ciphertext(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.shortint_deserialize_ciphertext(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ShortintCiphertext.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {ShortintCompressedCiphertext} ciphertext
    * @returns {Uint8Array}
    */
    static serialize_compressed_ciphertext(ciphertext) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(ciphertext, ShortintCompressedCiphertext);
            wasm.shortint_serialize_compressed_ciphertext(retptr, ciphertext.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {ShortintCompressedCiphertext}
    */
    static deserialize_compressed_ciphertext(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.shortint_deserialize_compressed_ciphertext(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ShortintCompressedCiphertext.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {ShortintClientKey} client_key
    * @returns {Uint8Array}
    */
    static serialize_client_key(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, ShortintClientKey);
            wasm.shortint_serialize_client_key(retptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {ShortintClientKey}
    */
    static deserialize_client_key(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.shortint_deserialize_client_key(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ShortintClientKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {ShortintPublicKey} public_key
    * @returns {Uint8Array}
    */
    static serialize_public_key(public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, ShortintPublicKey);
            wasm.shortint_serialize_public_key(retptr, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {ShortintPublicKey}
    */
    static deserialize_public_key(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.shortint_deserialize_public_key(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ShortintPublicKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {ShortintCompressedPublicKey} public_key
    * @returns {Uint8Array}
    */
    static serialize_compressed_public_key(public_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(public_key, ShortintCompressedPublicKey);
            wasm.shortint_serialize_compressed_public_key(retptr, public_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {ShortintCompressedPublicKey}
    */
    static deserialize_compressed_public_key(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.shortint_deserialize_compressed_public_key(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ShortintCompressedPublicKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {ShortintCompressedServerKey} server_key
    * @returns {Uint8Array}
    */
    static serialize_compressed_server_key(server_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(server_key, ShortintCompressedServerKey);
            wasm.shortint_serialize_compressed_server_key(retptr, server_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {ShortintCompressedServerKey}
    */
    static deserialize_compressed_server_key(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.shortint_deserialize_compressed_server_key(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ShortintCompressedServerKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.Shortint = Shortint;

const ShortintCiphertextFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_shortintciphertext_free(ptr >>> 0));
/**
*/
class ShortintCiphertext {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ShortintCiphertext.prototype);
        obj.__wbg_ptr = ptr;
        ShortintCiphertextFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ShortintCiphertextFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_shortintciphertext_free(ptr);
    }
}
module.exports.ShortintCiphertext = ShortintCiphertext;

const ShortintClientKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_shortintclientkey_free(ptr >>> 0));
/**
*/
class ShortintClientKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ShortintClientKey.prototype);
        obj.__wbg_ptr = ptr;
        ShortintClientKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ShortintClientKeyFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_shortintclientkey_free(ptr);
    }
}
module.exports.ShortintClientKey = ShortintClientKey;

const ShortintCompressedCiphertextFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_shortintcompressedciphertext_free(ptr >>> 0));
/**
*/
class ShortintCompressedCiphertext {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ShortintCompressedCiphertext.prototype);
        obj.__wbg_ptr = ptr;
        ShortintCompressedCiphertextFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ShortintCompressedCiphertextFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_shortintcompressedciphertext_free(ptr);
    }
}
module.exports.ShortintCompressedCiphertext = ShortintCompressedCiphertext;

const ShortintCompressedPublicKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_shortintcompressedpublickey_free(ptr >>> 0));
/**
*/
class ShortintCompressedPublicKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ShortintCompressedPublicKey.prototype);
        obj.__wbg_ptr = ptr;
        ShortintCompressedPublicKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ShortintCompressedPublicKeyFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_shortintcompressedpublickey_free(ptr);
    }
}
module.exports.ShortintCompressedPublicKey = ShortintCompressedPublicKey;

const ShortintCompressedServerKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_shortintcompressedserverkey_free(ptr >>> 0));
/**
*/
class ShortintCompressedServerKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ShortintCompressedServerKey.prototype);
        obj.__wbg_ptr = ptr;
        ShortintCompressedServerKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ShortintCompressedServerKeyFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_shortintcompressedserverkey_free(ptr);
    }
}
module.exports.ShortintCompressedServerKey = ShortintCompressedServerKey;

const ShortintParametersFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_shortintparameters_free(ptr >>> 0));
/**
*/
class ShortintParameters {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ShortintParameters.prototype);
        obj.__wbg_ptr = ptr;
        ShortintParametersFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ShortintParametersFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_shortintparameters_free(ptr);
    }
    /**
    * @param {ShortintParametersName} name
    */
    constructor(name) {
        const ret = wasm.shortintparameters_new(name);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
}
module.exports.ShortintParameters = ShortintParameters;

const ShortintPublicKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_shortintpublickey_free(ptr >>> 0));
/**
*/
class ShortintPublicKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ShortintPublicKey.prototype);
        obj.__wbg_ptr = ptr;
        ShortintPublicKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ShortintPublicKeyFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_shortintpublickey_free(ptr);
    }
}
module.exports.ShortintPublicKey = ShortintPublicKey;

const TfheClientKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tfheclientkey_free(ptr >>> 0));
/**
*/
class TfheClientKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TfheClientKey.prototype);
        obj.__wbg_ptr = ptr;
        TfheClientKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TfheClientKeyFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tfheclientkey_free(ptr);
    }
    /**
    * @param {TfheConfig} config
    * @returns {TfheClientKey}
    */
    static generate(config) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(config, TfheConfig);
            wasm.tfheclientkey_generate(retptr, config.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TfheClientKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {TfheConfig} config
    * @param {any} seed
    * @returns {TfheClientKey}
    */
    static generate_with_seed(config, seed) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(config, TfheConfig);
            wasm.tfheclientkey_generate_with_seed(retptr, config.__wbg_ptr, addHeapObject(seed));
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TfheClientKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.tfheclientkey_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {TfheClientKey}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.tfheclientkey_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TfheClientKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.TfheClientKey = TfheClientKey;

const TfheCompactPublicKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tfhecompactpublickey_free(ptr >>> 0));
/**
*/
class TfheCompactPublicKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TfheCompactPublicKey.prototype);
        obj.__wbg_ptr = ptr;
        TfheCompactPublicKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TfheCompactPublicKeyFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tfhecompactpublickey_free(ptr);
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {TfheCompactPublicKey}
    */
    static new(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.tfhecompactpublickey_new(retptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TfheCompactPublicKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.tfhecompactpublickey_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {TfheCompactPublicKey}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.tfhecompactpublickey_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TfheCompactPublicKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.TfheCompactPublicKey = TfheCompactPublicKey;

const TfheCompressedCompactPublicKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tfhecompressedcompactpublickey_free(ptr >>> 0));
/**
*/
class TfheCompressedCompactPublicKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TfheCompressedCompactPublicKey.prototype);
        obj.__wbg_ptr = ptr;
        TfheCompressedCompactPublicKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TfheCompressedCompactPublicKeyFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tfhecompressedcompactpublickey_free(ptr);
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {TfheCompressedCompactPublicKey}
    */
    static new(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.tfhecompressedcompactpublickey_new(retptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TfheCompressedCompactPublicKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.tfhecompressedcompactpublickey_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {TfheCompressedCompactPublicKey}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.tfhecompressedcompactpublickey_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TfheCompressedCompactPublicKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {TfheCompactPublicKey}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.tfhecompressedcompactpublickey_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TfheCompactPublicKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.TfheCompressedCompactPublicKey = TfheCompressedCompactPublicKey;

const TfheCompressedPublicKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tfhecompressedpublickey_free(ptr >>> 0));
/**
*/
class TfheCompressedPublicKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TfheCompressedPublicKey.prototype);
        obj.__wbg_ptr = ptr;
        TfheCompressedPublicKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TfheCompressedPublicKeyFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tfhecompressedpublickey_free(ptr);
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {TfheCompressedPublicKey}
    */
    static new(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.tfhecompressedpublickey_new(retptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TfheCompressedPublicKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {TfhePublicKey}
    */
    decompress() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.tfhecompressedpublickey_decompress(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TfhePublicKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.tfhecompressedpublickey_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {TfheCompressedPublicKey}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.tfhecompressedpublickey_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TfheCompressedPublicKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.TfheCompressedPublicKey = TfheCompressedPublicKey;

const TfheCompressedServerKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tfhecompressedserverkey_free(ptr >>> 0));
/**
*/
class TfheCompressedServerKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TfheCompressedServerKey.prototype);
        obj.__wbg_ptr = ptr;
        TfheCompressedServerKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TfheCompressedServerKeyFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tfhecompressedserverkey_free(ptr);
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {TfheCompressedServerKey}
    */
    static new(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.tfhecompressedserverkey_new(retptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TfheCompressedServerKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.tfhecompressedserverkey_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {TfheCompressedServerKey}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.tfhecompressedserverkey_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TfheCompressedServerKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.TfheCompressedServerKey = TfheCompressedServerKey;

const TfheConfigFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tfheconfig_free(ptr >>> 0));
/**
*/
class TfheConfig {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TfheConfig.prototype);
        obj.__wbg_ptr = ptr;
        TfheConfigFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TfheConfigFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tfheconfig_free(ptr);
    }
}
module.exports.TfheConfig = TfheConfig;

const TfheConfigBuilderFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tfheconfigbuilder_free(ptr >>> 0));
/**
*/
class TfheConfigBuilder {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TfheConfigBuilder.prototype);
        obj.__wbg_ptr = ptr;
        TfheConfigBuilderFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TfheConfigBuilderFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tfheconfigbuilder_free(ptr);
    }
    /**
    * @returns {TfheConfigBuilder}
    */
    static default() {
        const ret = wasm.tfheconfigbuilder_default();
        return TfheConfigBuilder.__wrap(ret);
    }
    /**
    * @returns {TfheConfigBuilder}
    */
    static default_with_small_encryption() {
        const ret = wasm.tfheconfigbuilder_default_with_small_encryption();
        return TfheConfigBuilder.__wrap(ret);
    }
    /**
    * @returns {TfheConfigBuilder}
    */
    static default_with_big_encryption() {
        const ret = wasm.tfheconfigbuilder_default();
        return TfheConfigBuilder.__wrap(ret);
    }
    /**
    * @param {ShortintParameters} block_parameters
    * @returns {TfheConfigBuilder}
    */
    use_custom_parameters(block_parameters) {
        const ptr = this.__destroy_into_raw();
        _assertClass(block_parameters, ShortintParameters);
        const ret = wasm.tfheconfigbuilder_use_custom_parameters(ptr, block_parameters.__wbg_ptr);
        return TfheConfigBuilder.__wrap(ret);
    }
    /**
    * @returns {TfheConfig}
    */
    build() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.tfheconfigbuilder_build(ptr);
        return TfheConfig.__wrap(ret);
    }
}
module.exports.TfheConfigBuilder = TfheConfigBuilder;

const TfhePublicKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tfhepublickey_free(ptr >>> 0));
/**
*/
class TfhePublicKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TfhePublicKey.prototype);
        obj.__wbg_ptr = ptr;
        TfhePublicKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TfhePublicKeyFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tfhepublickey_free(ptr);
    }
    /**
    * @param {TfheClientKey} client_key
    * @returns {TfhePublicKey}
    */
    static new(client_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(client_key, TfheClientKey);
            wasm.tfhepublickey_new(retptr, client_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TfhePublicKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Uint8Array}
    */
    serialize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.tfhepublickey_serialize(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint8Array} buffer
    * @returns {TfhePublicKey}
    */
    static deserialize(buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.tfhepublickey_deserialize(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return TfhePublicKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
module.exports.TfhePublicKey = TfhePublicKey;

const tfheFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tfhe_free(ptr >>> 0));
/**
*/
class tfhe {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        tfheFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tfhe_free(ptr);
    }
}
module.exports.tfhe = tfhe;

module.exports.__wbindgen_bigint_from_u64 = function(arg0) {
    const ret = BigInt.asUintN(64, arg0);
    return addHeapObject(ret);
};

module.exports.__wbindgen_shr = function(arg0, arg1) {
    const ret = getObject(arg0) >> getObject(arg1);
    return addHeapObject(ret);
};

module.exports.__wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
};

module.exports.__wbindgen_bigint_from_i64 = function(arg0) {
    const ret = arg0;
    return addHeapObject(ret);
};

module.exports.__wbindgen_jsval_eq = function(arg0, arg1) {
    const ret = getObject(arg0) === getObject(arg1);
    return ret;
};

module.exports.__wbindgen_error_new = function(arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

module.exports.__wbindgen_bigint_from_u128 = function(arg0, arg1) {
    const ret = BigInt.asUintN(64, arg0) << BigInt(64) | BigInt.asUintN(64, arg1);
    return addHeapObject(ret);
};

module.exports.__wbindgen_bigint_from_i128 = function(arg0, arg1) {
    const ret = arg0 << BigInt(64) | BigInt.asUintN(64, arg1);
    return addHeapObject(ret);
};

module.exports.__wbg_fheuint6_new = function(arg0) {
    const ret = FheUint6.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_fheint16_new = function(arg0) {
    const ret = FheInt16.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_fheint64_new = function(arg0) {
    const ret = FheInt64.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbindgen_number_new = function(arg0) {
    const ret = arg0;
    return addHeapObject(ret);
};

module.exports.__wbg_fheuint8_new = function(arg0) {
    const ret = FheUint8.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_fheuint10_new = function(arg0) {
    const ret = FheUint10.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_fheuint32_new = function(arg0) {
    const ret = FheUint32.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_fheuint160_new = function(arg0) {
    const ret = FheUint160.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_fheuint2_new = function(arg0) {
    const ret = FheUint2.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_fheint12_new = function(arg0) {
    const ret = FheInt12.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_fheint8_new = function(arg0) {
    const ret = FheInt8.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_fheuint4_new = function(arg0) {
    const ret = FheUint4.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_fheint128_new = function(arg0) {
    const ret = FheInt128.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_fheint32_new = function(arg0) {
    const ret = FheInt32.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_fheuint256_new = function(arg0) {
    const ret = FheUint256.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_fheint2_new = function(arg0) {
    const ret = FheInt2.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_fheint14_new = function(arg0) {
    const ret = FheInt14.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_fheint256_new = function(arg0) {
    const ret = FheInt256.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_fheint10_new = function(arg0) {
    const ret = FheInt10.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_fheint4_new = function(arg0) {
    const ret = FheInt4.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_fheuint14_new = function(arg0) {
    const ret = FheUint14.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_fheint6_new = function(arg0) {
    const ret = FheInt6.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_fheint160_new = function(arg0) {
    const ret = FheInt160.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_fheuint64_new = function(arg0) {
    const ret = FheUint64.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_fheuint12_new = function(arg0) {
    const ret = FheUint12.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_fheuint128_new = function(arg0) {
    const ret = FheUint128.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_fheuint16_new = function(arg0) {
    const ret = FheUint16.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbindgen_boolean_get = function(arg0) {
    const v = getObject(arg0);
    const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
    return ret;
};

module.exports.__wbg_fhebool_new = function(arg0) {
    const ret = FheBool.__wrap(arg0);
    return addHeapObject(ret);
};

module.exports.__wbindgen_bigint_from_str = function(arg0, arg1) {
    const ret = BigInt(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

module.exports.__wbindgen_bit_and = function(arg0, arg1) {
    const ret = getObject(arg0) & getObject(arg1);
    return addHeapObject(ret);
};

module.exports.__wbindgen_lt = function(arg0, arg1) {
    const ret = getObject(arg0) < getObject(arg1);
    return ret;
};

module.exports.__wbindgen_neg = function(arg0) {
    const ret = -getObject(arg0);
    return addHeapObject(ret);
};

module.exports.__wbindgen_shl = function(arg0, arg1) {
    const ret = getObject(arg0) << getObject(arg1);
    return addHeapObject(ret);
};

module.exports.__wbindgen_add = function(arg0, arg1) {
    const ret = getObject(arg0) + getObject(arg1);
    return addHeapObject(ret);
};

module.exports.__wbindgen_bit_or = function(arg0, arg1) {
    const ret = getObject(arg0) | getObject(arg1);
    return addHeapObject(ret);
};

module.exports.__wbg_new_abda76e883ba8a5f = function() {
    const ret = new Error();
    return addHeapObject(ret);
};

module.exports.__wbg_stack_658279fe44541cf6 = function(arg0, arg1) {
    const ret = getObject(arg1).stack;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

module.exports.__wbg_error_f851667af71bcfc6 = function(arg0, arg1) {
    let deferred0_0;
    let deferred0_1;
    try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.error(getStringFromWasm0(arg0, arg1));
    } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
    }
};

module.exports.__wbg_crypto_566d7465cdbb6b7a = function(arg0) {
    const ret = getObject(arg0).crypto;
    return addHeapObject(ret);
};

module.exports.__wbindgen_is_object = function(arg0) {
    const val = getObject(arg0);
    const ret = typeof(val) === 'object' && val !== null;
    return ret;
};

module.exports.__wbg_process_dc09a8c7d59982f6 = function(arg0) {
    const ret = getObject(arg0).process;
    return addHeapObject(ret);
};

module.exports.__wbg_versions_d98c6400c6ca2bd8 = function(arg0) {
    const ret = getObject(arg0).versions;
    return addHeapObject(ret);
};

module.exports.__wbg_node_caaf83d002149bd5 = function(arg0) {
    const ret = getObject(arg0).node;
    return addHeapObject(ret);
};

module.exports.__wbindgen_is_string = function(arg0) {
    const ret = typeof(getObject(arg0)) === 'string';
    return ret;
};

module.exports.__wbg_msCrypto_0b84745e9245cdf6 = function(arg0) {
    const ret = getObject(arg0).msCrypto;
    return addHeapObject(ret);
};

module.exports.__wbg_require_94a9da52636aacbf = function() { return handleError(function () {
    const ret = module.require;
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbindgen_is_function = function(arg0) {
    const ret = typeof(getObject(arg0)) === 'function';
    return ret;
};

module.exports.__wbindgen_string_new = function(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

module.exports.__wbg_randomFillSync_290977693942bf03 = function() { return handleError(function (arg0, arg1) {
    getObject(arg0).randomFillSync(takeObject(arg1));
}, arguments) };

module.exports.__wbg_getRandomValues_260cc23a41afad9a = function() { return handleError(function (arg0, arg1) {
    getObject(arg0).getRandomValues(getObject(arg1));
}, arguments) };

module.exports.__wbg_newnoargs_e258087cd0daa0ea = function(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

module.exports.__wbg_call_27c0f87801dedf93 = function() { return handleError(function (arg0, arg1) {
    const ret = getObject(arg0).call(getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbindgen_object_clone_ref = function(arg0) {
    const ret = getObject(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_self_ce0dbfc45cf2f5be = function() { return handleError(function () {
    const ret = self.self;
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_window_c6fb939a7f436783 = function() { return handleError(function () {
    const ret = window.window;
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_globalThis_d1e6af4856ba331b = function() { return handleError(function () {
    const ret = globalThis.globalThis;
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_global_207b558942527489 = function() { return handleError(function () {
    const ret = global.global;
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbindgen_is_undefined = function(arg0) {
    const ret = getObject(arg0) === undefined;
    return ret;
};

module.exports.__wbg_call_b3ca7c6051f9bec1 = function() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
}, arguments) };

module.exports.__wbg_buffer_12d079cc21e14bdb = function(arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
};

module.exports.__wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb = function(arg0, arg1, arg2) {
    const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

module.exports.__wbg_new_63b92bc8671ed464 = function(arg0) {
    const ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
};

module.exports.__wbg_set_a47bac70306a19a7 = function(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
};

module.exports.__wbg_newwithlength_e9b4878cebadb3d3 = function(arg0) {
    const ret = new Uint8Array(arg0 >>> 0);
    return addHeapObject(ret);
};

module.exports.__wbg_subarray_a1f73cd4b5b42fe1 = function(arg0, arg1, arg2) {
    const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

module.exports.__wbindgen_bigint_get_as_i64 = function(arg0, arg1) {
    const v = getObject(arg1);
    const ret = typeof(v) === 'bigint' ? v : undefined;
    getBigInt64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? BigInt(0) : ret;
    getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
};

module.exports.__wbindgen_debug_string = function(arg0, arg1) {
    const ret = debugString(getObject(arg1));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

module.exports.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

module.exports.__wbindgen_memory = function() {
    const ret = wasm.memory;
    return addHeapObject(ret);
};

const path = require('path').join(__dirname, 'tfhe_bg.wasm');
const bytes = require('fs').readFileSync(path);

const wasmModule = new WebAssembly.Module(bytes);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
wasm = wasmInstance.exports;
module.exports.__wasm = wasm;

