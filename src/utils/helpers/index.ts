export const JSONParser = <T>(data: T): T => JSON.parse(JSON.stringify(data));
