import { useCallback, useState } from 'react';
 
type UseToggleReturn = [boolean, () => void, (value: boolean) => void];
 
export const useToggle = (initialValue = false): UseToggleReturn => {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue((v) => !v), []);
  const set    = useCallback((v: boolean) => setValue(v), []);
  return [value, toggle, set];
};