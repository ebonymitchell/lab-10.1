import { useState } from "react";

// Manage the counter's current value using React state.
export default function AdvancedCounter() {
    const [count, setCount] = useState<number>(0);

    // Functional updates use the latest state value.
    const increment = () => {
        setCount((previous) => previous + 1);
    };

    const decrement = () => {
        setCount((previous) => previous - 1);
    };

    return (
        <section>
            <h1>Advanced Counter</h1>

            <h2>Current Count: {count}</h2>

            <button type="button" onClick={decrement}>
                Decrement
            </button>

            <button type="button" onClick={increment}>
                Increment
            </button>
        </section>
    );
}
