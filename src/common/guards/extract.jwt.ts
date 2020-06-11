export class ExtractJwt {
    private static parseAuthHeader(headerValue: string) {
        if (typeof headerValue !== 'string') {
            return null;
        }
        const matches = headerValue.match(/(\S+)\s+(\S+)/);
        return matches && { scheme: matches[1], value: matches[2] };
    }

    public static fromAuthHeader(headerKey = 'authorization', scheme = 'bearer') {
        return (req: any) => {
            if (req.headers[headerKey]) {
                const values = ExtractJwt.parseAuthHeader(req.headers[headerKey]);
                if (values && scheme === values.scheme.toLowerCase()) {
                    return values.value;
                }
            }
            if (req.query[headerKey]) {
                return req.query[headerKey];
            }
            return null;
        };
    }
}
