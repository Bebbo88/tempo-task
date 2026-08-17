import { useDebounce as useDebounceHook } from "use-debounce";

export const useDebounce = <T>(value: T, delay: number = 300): T => useDebounceHook(value, delay)[0];
