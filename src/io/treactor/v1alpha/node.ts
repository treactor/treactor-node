/* eslint-disable */
import { Atom } from '../../../io/treactor/v1alpha/atom';
import { Writer, Reader } from 'protobufjs/minimal';


export interface Node {
  name: string;
  framework: string;
  headers: { [key: string]: string };
  bonds: Node[];
  atom: Atom | undefined;
}

export interface Node_HeadersEntry {
  key: string;
  value: string;
}

const baseNode: object = {
  name: "",
  framework: "",
};

const baseNode_HeadersEntry: object = {
  key: "",
  value: "",
};

export const protobufPackage = ''

export const Node = {
  encode(message: Node, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    writer.uint32(18).string(message.framework);
    Object.entries(message.headers).forEach(([key, value]) => {
      Node_HeadersEntry.encode({ key: key as any, value }, writer.uint32(26).fork()).ldelim();
    })
    for (const v of message.bonds) {
      Node.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.atom !== undefined && message.atom !== undefined) {
      Atom.encode(message.atom, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Node {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNode } as Node;
    message.headers = {};
    message.bonds = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.framework = reader.string();
          break;
        case 3:
          const entry3 = Node_HeadersEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.headers[entry3.key] = entry3.value;
          }
          break;
        case 4:
          message.bonds.push(Node.decode(reader, reader.uint32()));
          break;
        case 5:
          message.atom = Atom.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Node {
    const message = { ...baseNode } as Node;
    message.headers = {};
    message.bonds = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.framework !== undefined && object.framework !== null) {
      message.framework = String(object.framework);
    } else {
      message.framework = "";
    }
    if (object.headers !== undefined && object.headers !== null) {
      Object.entries(object.headers).forEach(([key, value]) => {
        message.headers[key] = String(value);
      })
    }
    if (object.bonds !== undefined && object.bonds !== null) {
      for (const e of object.bonds) {
        message.bonds.push(Node.fromJSON(e));
      }
    }
    if (object.atom !== undefined && object.atom !== null) {
      message.atom = Atom.fromJSON(object.atom);
    } else {
      message.atom = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Node>): Node {
    const message = { ...baseNode } as Node;
    message.headers = {};
    message.bonds = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.framework !== undefined && object.framework !== null) {
      message.framework = object.framework;
    } else {
      message.framework = "";
    }
    if (object.headers !== undefined && object.headers !== null) {
      Object.entries(object.headers).forEach(([key, value]) => {
        if (value !== undefined) {
          message.headers[key] = String(value);
        }
      })
    }
    if (object.bonds !== undefined && object.bonds !== null) {
      for (const e of object.bonds) {
        message.bonds.push(Node.fromPartial(e));
      }
    }
    if (object.atom !== undefined && object.atom !== null) {
      message.atom = Atom.fromPartial(object.atom);
    } else {
      message.atom = undefined;
    }
    return message;
  },
  toJSON(message: Node): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.framework !== undefined && (obj.framework = message.framework);
    obj.headers = {};
    if (message.headers) {
      Object.entries(message.headers).forEach(([k, v]) => {
        obj.headers[k] = v;
      })
    }
    if (message.bonds) {
      obj.bonds = message.bonds.map(e => e ? Node.toJSON(e) : undefined);
    } else {
      obj.bonds = [];
    }
    message.atom !== undefined && (obj.atom = message.atom ? Atom.toJSON(message.atom) : undefined);
    return obj;
  },
};

export const Node_HeadersEntry = {
  encode(message: Node_HeadersEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.key);
    writer.uint32(18).string(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Node_HeadersEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNode_HeadersEntry } as Node_HeadersEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Node_HeadersEntry {
    const message = { ...baseNode_HeadersEntry } as Node_HeadersEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<Node_HeadersEntry>): Node_HeadersEntry {
    const message = { ...baseNode_HeadersEntry } as Node_HeadersEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
    }
    return message;
  },
  toJSON(message: Node_HeadersEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;