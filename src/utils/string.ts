import { kebabCasify } from "./string-manipulation";

declare global {
  interface String {
    toUtf8Buffer(): Uint8Array;
    toKebabCase(): string;
  }
}

String.prototype.toUtf8Buffer = function (): Uint8Array {
  return Buffer.from(String(this), "utf8");
};


String.prototype.toKebabCase = function (): string {
  return kebabCasify(String(this));
};

export {};