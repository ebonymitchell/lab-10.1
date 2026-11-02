import { useState } from "react";

// Manage the counter, step value, and count history.
export default function AdvancedCounter() {
    // Initialize the counter at zero.
    const [count, setCount] = useState<number>(0);

    // Store every count value, starting with zero.
    const [history, setHistory] = useState<number[]>([0]);

    // Control how much the count changes with each action.
    const [step, setStep] = useState<number>(1);

    // Update the count and record the new value in history.
    const updateCount = (amount: number) => {
        const nextCount = count + amount;

        setCount(nextCount);
        setHistory((previous) => [...previous, nextCount]);
    };

    // Increase the count by the selected step.
    const increment = () => {
        updateCount(step);
    };

    // Decrease the count by the selected step.
    const decrement = () => {
        updateCount(-step);
    };

    return (
        <section>
            <h1>Advanced Counter</h1>

            {/* Display the current count. */}
            <h2>Current Count: {count}</h2>

            {/* Allow the user to select a positive step value. */}
            <div>
                <label htmlFor="step">Step Value: </label>

                <input
                    id="step"
                    type="number"
                    min="1"
                    step="1"
                    value={step}
                    onChange={(event) => {
                        const value = Number(event.target.value);

                        // Accept only positive whole numbers.
                        if (Number.isInteger(value) && value >= 1) {
                            setStep(value);
                        }
                    }}
                />
            </div>

            {/* Counter controls use the selected step. */}
            <div>
                <button type="button" onClick={decrement}>
                    Decrement
                </button>

                <button type="button" onClick={increment}>
                    Increment
                </button>
            </div>

            {/* Display the complete count history. */}
            <div>
                <h3>Count History</h3>

                <p>{history.join(", ")}</p>
            </div>
        </section>
    );
}
