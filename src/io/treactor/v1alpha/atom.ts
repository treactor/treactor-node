/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface Atom {
  number: number;
  symbol: string;
  name: string;
  period?: number | undefined;
  group?: number | undefined;
}

const baseAtom: object = {
  number: 0,
  symbol: "",
  name: "",
};

export const protobufPackage = ''

export const Atom = {
  encode(message: Atom, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.number);
    writer.uint32(18).string(message.symbol);
    writer.uint32(26).string(message.name);
    if (message.period !== undefined) {
      writer.uint32(32).int32(message.period);
    }
    if (message.group !== undefined) {
      writer.uint32(40).int32(message.group);
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Atom {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAtom } as Atom;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.number = reader.int32();
          break;
        case 2:
          message.symbol = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.period = reader.int32();
          break;
        case 5:
          message.group = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Atom {
    const message = { ...baseAtom } as Atom;
    if (object.number !== undefined && object.number !== null) {
      message.number = Number(object.number);
    } else {
      message.number = 0;
    }
    if (object.symbol !== undefined && object.symbol !== null) {
      message.symbol = String(object.symbol);
    } else {
      message.symbol = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.period !== undefined && object.period !== null) {
      message.period = Number(object.period);
    } else {
      message.period = undefined;
    }
    if (object.group !== undefined && object.group !== null) {
      message.group = Number(object.group);
    } else {
      message.group = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Atom>): Atom {
    const message = { ...baseAtom } as Atom;
    if (object.number !== undefined && object.number !== null) {
      message.number = object.number;
    } else {
      message.number = 0;
    }
    if (object.symbol !== undefined && object.symbol !== null) {
      message.symbol = object.symbol;
    } else {
      message.symbol = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.period !== undefined && object.period !== null) {
      message.period = object.period;
    } else {
      message.period = undefined;
    }
    if (object.group !== undefined && object.group !== null) {
      message.group = object.group;
    } else {
      message.group = undefined;
    }
    return message;
  },
  toJSON(message: Atom): unknown {
    const obj: any = {};
    message.number !== undefined && (obj.number = message.number);
    message.symbol !== undefined && (obj.symbol = message.symbol);
    message.name !== undefined && (obj.name = message.name);
    message.period !== undefined && (obj.period = message.period);
    message.group !== undefined && (obj.group = message.group);
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