import { useState } from "react";

// Manage the current count and track its history.
export default function AdvancedCounter() {
    // Initialize the counter at zero.
    const [count, setCount] = useState<number>(0);

    // Record the initial count and every subsequent count.
    const [history, setHistory] = useState<number[]>([0]);

    // Update the count and record the new value.
    const updateCount = (amount: number) => {
        const nextCount = count + amount;

        setCount(nextCount);
        setHistory((previous) => [...previous, nextCount]);
    };

    // Increase the count by one.
    const increment = () => {
        updateCount(1);
    };

    // Decrease the count by one.
    const decrement = () => {
        updateCount(-1);
    };

    return (
        <section>
            <h1>Advanced Counter</h1>

            {/* Display the current count. */}
            <h2>Current Count: {count}</h2>

            {/* Counter controls */}
            <button type="button" onClick={decrement}>
                Decrement
            </button>

            <button type="button" onClick={increment}>
                Increment
            </button>

            {/* Display all recorded count values. */}
            <div>
                <h3>Count History</h3>

                <p>
                    {history.join(", ")}
                </p>
            </div>
        </section>
    );
}
