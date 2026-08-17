import { clsx, type ClassValue } from "clsx";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
export { classNames };
