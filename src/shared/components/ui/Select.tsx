import React from "react";

export const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select {...props} className={`px-3 py-2 border rounded-md bg-transparent ${props.className || ""}`} />
);
