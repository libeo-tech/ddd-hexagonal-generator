export function kebabCasify(string: string) {
	return string.replace(/\B(?:([A-Z])(?=[a-z]))|(?:(?<=[a-z0-9])([A-Z]))/g, '-$1$2').toLowerCase();
}

export function stringToUintArray(string: string): Uint8Array {
	return Buffer.from(string, "utf8");
}

export function camelCasify(string: string) {
	return string.charAt(0).toLocaleLowerCase() + string.slice(1);
}

