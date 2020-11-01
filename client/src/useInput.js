import { useState } from "react";

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: (event) => {
        if (event.target.value.length <= 300) {
          setValue(event.target.value)
        }
      }
    }
  }
}

