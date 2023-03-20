import { useState } from "react";

export const useInput = () => {
  const [value, setValue] = useState("");

  function onChange(e) {
    setValue(e.target.value);
  }

  const reset = () => {
    setValue("");
  };

  return { value: value, onChange: onChange, reset: reset };
};
