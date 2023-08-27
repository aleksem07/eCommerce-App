export default class ObjectGuardUtil {
  static hasProp<T>(data: unknown, prop: string): data is Record<string, T> {
    return !!data && typeof data === "object" && prop in data;
  }
}
