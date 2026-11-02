import { useEffect, useState } from "react";

// Storage key used to persist the counter.
const STORAGE_KEY = "advanced-counter-count";

// Keep the count and history together so updates stay synchronized.
type CounterState = {
    count: number;
    history: number[];
};

export default function AdvancedCounter() {
    // Restore the saved count when the component first loads.
    const [counter, setCounter] = useState<CounterState>(() => {
        let initialCount = 0;

        try {
            const savedCount = localStorage.getItem(STORAGE_KEY);

            if (savedCount !== null) {
                const parsedCount = Number(savedCount);

                if (Number.isFinite(parsedCount)) {
                    initialCount = parsedCount;
                }
            }
        } catch (error) {
            console.error("Unable to load saved count:", error);
        }

        return {
            count: initialCount,
            history: [initialCount],
        };
    });

    // Control how much each action changes the count.
    const [step, setStep] = useState<number>(1);

    // Automatically save the count after a short delay.
    useEffect(() => {
        const timer = window.setTimeout(() => {
            try {
                localStorage.setItem(
                    STORAGE_KEY,
                    String(counter.count)
                );
            } catch (error) {
                console.error("Unable to save count:", error);
            }
        }, 300);

        // Cancel outdated saves and clean up on unmount.
        return () => {
            window.clearTimeout(timer);
        };
    }, [counter.count]);

    // Update the count and history using the latest state.
    const updateCount = (amount: number) => {
        setCounter((previous) => {
            const nextCount = previous.count + amount;

            return {
                count: nextCount,
                history: [...previous.history, nextCount],
            };
        });
    };

    // Register keyboard shortcuts and clean up the listener.
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const target = event.target;

            // Ignore arrow keys while editing a form control.
            if (
                target instanceof HTMLElement &&
                (target.matches("input, textarea, select") ||
                    target.isContentEditable)
            ) {
                return;
            }

            if (event.key === "ArrowUp") {
                event.preventDefault();
                updateCount(step);
            }

            if (event.key === "ArrowDown") {
                event.preventDefault();
                updateCount(-step);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [step]);

    // Reset the count to zero and clear all previous history.
    const resetCounter = () => {
        setCounter({
            count: 0,
            history: [],
        });
    };

    return (
        <section>
            <h1>Advanced Counter</h1>

            {/* Display the current count. */}
            <h2>Current Count: {counter.count}</h2>

            {/* Allow users to customize the step value. */}
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
                <button
                    type="button"
                    onClick={() => updateCount(-step)}
                >
                    Decrement
                </button>

                <button
                    type="button"
                    onClick={() => updateCount(step)}
                >
                    Increment
                </button>

                <button type="button" onClick={resetCounter}>
                    Reset
                </button>
            </div>

            {/* Display the history or an empty-state message. */}
            <div>
                <h3>Count History</h3>

                <p>
                    {counter.history.length > 0
                        ? counter.history.join(", ")
                        : "No history yet."}
                </p>
            </div>
        </section>
    );
}
