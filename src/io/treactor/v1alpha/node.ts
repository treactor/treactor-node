/* eslint-disable */
import { Atom } from '../../../io/treactor/v1alpha/atom';
import { Writer, Reader } from 'protobufjs/minimal';


export interface TReactorRequest {
  path: string;
  headers: { [key: string]: string };
}

export interface TReactorRequest_HeadersEntry {
  key: string;
  value: string;
}

export interface TReactorResponse {
  statusCode: number;
  statusMessage: string;
  headers: { [key: string]: string };
}

export interface TReactorResponse_HeadersEntry {
  key: string;
  value: string;
}

export interface Bond {
  response: TReactorResponse | undefined;
  node: Node | undefined;
}

export interface Node {
  name: string;
  version: string;
  framework: string;
  request: TReactorRequest | undefined;
  bonds: Bond[];
  atom: Atom | undefined;
}

const baseTReactorRequest: object = {
  path: "",
};

const baseTReactorRequest_HeadersEntry: object = {
  key: "",
  value: "",
};

const baseTReactorResponse: object = {
  statusCode: 0,
  statusMessage: "",
};

const baseTReactorResponse_HeadersEntry: object = {
  key: "",
  value: "",
};

const baseBond: object = {
};

const baseNode: object = {
  name: "",
  version: "",
  framework: "",
};

export const protobufPackage = ''

export const TReactorRequest = {
  encode(message: TReactorRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.path);
    Object.entries(message.headers).forEach(([key, value]) => {
      TReactorRequest_HeadersEntry.encode({ key: key as any, value }, writer.uint32(34).fork()).ldelim();
    })
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): TReactorRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTReactorRequest } as TReactorRequest;
    message.headers = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.path = reader.string();
          break;
        case 4:
          const entry4 = TReactorRequest_HeadersEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.headers[entry4.key] = entry4.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): TReactorRequest {
    const message = { ...baseTReactorRequest } as TReactorRequest;
    message.headers = {};
    if (object.path !== undefined && object.path !== null) {
      message.path = String(object.path);
    } else {
      message.path = "";
    }
    if (object.headers !== undefined && object.headers !== null) {
      Object.entries(object.headers).forEach(([key, value]) => {
        message.headers[key] = String(value);
      })
    }
    return message;
  },
  fromPartial(object: DeepPartial<TReactorRequest>): TReactorRequest {
    const message = { ...baseTReactorRequest } as TReactorRequest;
    message.headers = {};
    if (object.path !== undefined && object.path !== null) {
      message.path = object.path;
    } else {
      message.path = "";
    }
    if (object.headers !== undefined && object.headers !== null) {
      Object.entries(object.headers).forEach(([key, value]) => {
        if (value !== undefined) {
          message.headers[key] = String(value);
        }
      })
    }
    return message;
  },
  toJSON(message: TReactorRequest): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = message.path);
    obj.headers = {};
    if (message.headers) {
      Object.entries(message.headers).forEach(([k, v]) => {
        obj.headers[k] = v;
      })
    }
    return obj;
  },
};

export const TReactorRequest_HeadersEntry = {
  encode(message: TReactorRequest_HeadersEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.key);
    writer.uint32(18).string(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): TReactorRequest_HeadersEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTReactorRequest_HeadersEntry } as TReactorRequest_HeadersEntry;
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
  fromJSON(object: any): TReactorRequest_HeadersEntry {
    const message = { ...baseTReactorRequest_HeadersEntry } as TReactorRequest_HeadersEntry;
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
  fromPartial(object: DeepPartial<TReactorRequest_HeadersEntry>): TReactorRequest_HeadersEntry {
    const message = { ...baseTReactorRequest_HeadersEntry } as TReactorRequest_HeadersEntry;
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
  toJSON(message: TReactorRequest_HeadersEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },
};

export const TReactorResponse = {
  encode(message: TReactorResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.statusCode);
    writer.uint32(18).string(message.statusMessage);
    Object.entries(message.headers).forEach(([key, value]) => {
      TReactorResponse_HeadersEntry.encode({ key: key as any, value }, writer.uint32(34).fork()).ldelim();
    })
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): TReactorResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTReactorResponse } as TReactorResponse;
    message.headers = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.statusCode = reader.int32();
          break;
        case 2:
          message.statusMessage = reader.string();
          break;
        case 4:
          const entry4 = TReactorResponse_HeadersEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.headers[entry4.key] = entry4.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): TReactorResponse {
    const message = { ...baseTReactorResponse } as TReactorResponse;
    message.headers = {};
    if (object.statusCode !== undefined && object.statusCode !== null) {
      message.statusCode = Number(object.statusCode);
    } else {
      message.statusCode = 0;
    }
    if (object.statusMessage !== undefined && object.statusMessage !== null) {
      message.statusMessage = String(object.statusMessage);
    } else {
      message.statusMessage = "";
    }
    if (object.headers !== undefined && object.headers !== null) {
      Object.entries(object.headers).forEach(([key, value]) => {
        message.headers[key] = String(value);
      })
    }
    return message;
  },
  fromPartial(object: DeepPartial<TReactorResponse>): TReactorResponse {
    const message = { ...baseTReactorResponse } as TReactorResponse;
    message.headers = {};
    if (object.statusCode !== undefined && object.statusCode !== null) {
      message.statusCode = object.statusCode;
    } else {
      message.statusCode = 0;
    }
    if (object.statusMessage !== undefined && object.statusMessage !== null) {
      message.statusMessage = object.statusMessage;
    } else {
      message.statusMessage = "";
    }
    if (object.headers !== undefined && object.headers !== null) {
      Object.entries(object.headers).forEach(([key, value]) => {
        if (value !== undefined) {
          message.headers[key] = String(value);
        }
      })
    }
    return message;
  },
  toJSON(message: TReactorResponse): unknown {
    const obj: any = {};
    message.statusCode !== undefined && (obj.statusCode = message.statusCode);
    message.statusMessage !== undefined && (obj.statusMessage = message.statusMessage);
    obj.headers = {};
    if (message.headers) {
      Object.entries(message.headers).forEach(([k, v]) => {
        obj.headers[k] = v;
      })
    }
    return obj;
  },
};

export const TReactorResponse_HeadersEntry = {
  encode(message: TReactorResponse_HeadersEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.key);
    writer.uint32(18).string(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): TReactorResponse_HeadersEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTReactorResponse_HeadersEntry } as TReactorResponse_HeadersEntry;
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
  fromJSON(object: any): TReactorResponse_HeadersEntry {
    const message = { ...baseTReactorResponse_HeadersEntry } as TReactorResponse_HeadersEntry;
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
  fromPartial(object: DeepPartial<TReactorResponse_HeadersEntry>): TReactorResponse_HeadersEntry {
    const message = { ...baseTReactorResponse_HeadersEntry } as TReactorResponse_HeadersEntry;
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
  toJSON(message: TReactorResponse_HeadersEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },
};

export const Bond = {
  encode(message: Bond, writer: Writer = Writer.create()): Writer {
    if (message.response !== undefined && message.response !== undefined) {
      TReactorResponse.encode(message.response, writer.uint32(10).fork()).ldelim();
    }
    if (message.node !== undefined && message.node !== undefined) {
      Node.encode(message.node, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Bond {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBond } as Bond;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.response = TReactorResponse.decode(reader, reader.uint32());
          break;
        case 2:
          message.node = Node.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Bond {
    const message = { ...baseBond } as Bond;
    if (object.response !== undefined && object.response !== null) {
      message.response = TReactorResponse.fromJSON(object.response);
    } else {
      message.response = undefined;
    }
    if (object.node !== undefined && object.node !== null) {
      message.node = Node.fromJSON(object.node);
    } else {
      message.node = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Bond>): Bond {
    const message = { ...baseBond } as Bond;
    if (object.response !== undefined && object.response !== null) {
      message.response = TReactorResponse.fromPartial(object.response);
    } else {
      message.response = undefined;
    }
    if (object.node !== undefined && object.node !== null) {
      message.node = Node.fromPartial(object.node);
    } else {
      message.node = undefined;
    }
    return message;
  },
  toJSON(message: Bond): unknown {
    const obj: any = {};
    message.response !== undefined && (obj.response = message.response ? TReactorResponse.toJSON(message.response) : undefined);
    message.node !== undefined && (obj.node = message.node ? Node.toJSON(message.node) : undefined);
    return obj;
  },
};

export const Node = {
  encode(message: Node, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    writer.uint32(18).string(message.version);
    writer.uint32(26).string(message.framework);
    if (message.request !== undefined && message.request !== undefined) {
      TReactorRequest.encode(message.request, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.bonds) {
      Bond.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.atom !== undefined && message.atom !== undefined) {
      Atom.encode(message.atom, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Node {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNode } as Node;
    message.bonds = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.version = reader.string();
          break;
        case 3:
          message.framework = reader.string();
          break;
        case 4:
          message.request = TReactorRequest.decode(reader, reader.uint32());
          break;
        case 5:
          message.bonds.push(Bond.decode(reader, reader.uint32()));
          break;
        case 6:
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
    message.bonds = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.version !== undefined && object.version !== null) {
      message.version = String(object.version);
    } else {
      message.version = "";
    }
    if (object.framework !== undefined && object.framework !== null) {
      message.framework = String(object.framework);
    } else {
      message.framework = "";
    }
    if (object.request !== undefined && object.request !== null) {
      message.request = TReactorRequest.fromJSON(object.request);
    } else {
      message.request = undefined;
    }
    if (object.bonds !== undefined && object.bonds !== null) {
      for (const e of object.bonds) {
        message.bonds.push(Bond.fromJSON(e));
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
    message.bonds = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.version !== undefined && object.version !== null) {
      message.version = object.version;
    } else {
      message.version = "";
    }
    if (object.framework !== undefined && object.framework !== null) {
      message.framework = object.framework;
    } else {
      message.framework = "";
    }
    if (object.request !== undefined && object.request !== null) {
      message.request = TReactorRequest.fromPartial(object.request);
    } else {
      message.request = undefined;
    }
    if (object.bonds !== undefined && object.bonds !== null) {
      for (const e of object.bonds) {
        message.bonds.push(Bond.fromPartial(e));
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
    message.version !== undefined && (obj.version = message.version);
    message.framework !== undefined && (obj.framework = message.framework);
    message.request !== undefined && (obj.request = message.request ? TReactorRequest.toJSON(message.request) : undefined);
    if (message.bonds) {
      obj.bonds = message.bonds.map(e => e ? Bond.toJSON(e) : undefined);
    } else {
      obj.bonds = [];
    }
    message.atom !== undefined && (obj.atom = message.atom ? Atom.toJSON(message.atom) : undefined);
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