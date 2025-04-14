import { useState } from 'react';
import { Mode } from '../lib/modular-arithmetic/Types';

export function useCalculatorMode(defaultMode: Mode = 'CRT') {
    const [mode, setMode] = useState<Mode>(defaultMode);
    const changeMode = (newMode: Mode) => {
        setMode(newMode);
    };

    return { mode, changeMode };
}