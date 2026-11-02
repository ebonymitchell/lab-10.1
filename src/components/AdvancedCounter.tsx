import { useEffect, useState } from "react";

// Key used to save the count in browser storage.
const STORAGE_KEY = "advanced-counter-count";

export default function AdvancedCounter() {
    // Restore the saved count or start at zero.
    const [count, setCount] = useState<number>(() => {
        try {
            const savedCount = localStorage.getItem(STORAGE_KEY);

            if (savedCount !== null) {
                const parsedCount = Number(savedCount);

                if (Number.isFinite(parsedCount)) {
                    return parsedCount;
                }
            }
        } catch (error) {
            console.error("Unable to load saved count:", error);
        }

        return 0;
    });

    // Begin history with the current count.
    const [history, setHistory] = useState<number[]>([
        count,
    ]);

    // Control how much the counter changes.
    const [step, setStep] = useState<number>(1);

    // Save the count after a short delay.
    useEffect(() => {
        const timer = window.setTimeout(() => {
            try {
                localStorage.setItem(STORAGE_KEY, String(count));
            } catch (error) {
                console.error("Unable to save count:", error);
            }
        }, 300);

        // Cancel an outdated save when count changes or component unmounts.
        return () => {
            window.clearTimeout(timer);
        };
    }, [count]);

    // Update the count and record its new value.
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

            {/* Select a positive whole-number step value. */}
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

                        if (Number.isInteger(value) && value >= 1) {
                            setStep(value);
                        }
                    }}
                />
            </div>

            {/* Counter controls */}
            <div>
                <button type="button" onClick={decrement}>
                    Decrement
                </button>

                <button type="button" onClick={increment}>
                    Increment
                </button>
            </div>

            {/* Display the count history for this session. */}
            <div>
                <h3>Count History</h3>

                <p>{history.join(", ")}</p>
            </div>
        </section>
    );
}
