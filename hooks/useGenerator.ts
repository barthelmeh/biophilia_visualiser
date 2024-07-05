import React from 'react';

// Generator function to create a generator for a given array
function* getData(data: Array<HRV>): Generator<HRV, void> {
    let idx = 0;
    while(1) {
        if(idx == data.length) {
            idx = 0;
            continue;
        }
        yield data[idx++];
    }
}

// Optional timeout supplied in ms (can be used to speed up the playback speed)
const useGenerator = (data: Array<HRV>, timeout?: number): HRV | null => {

    const [currentHRV, setCurrentHRV] = React.useState<HRV|null>(null);
    const generator = React.useRef<Generator<HRV|null> | null>(null);

    React.useEffect(() => {
        generator.current = getData(data);

        const intervalId = setInterval(() => {
            const nextValue = generator.current!.next().value;
            setCurrentHRV(nextValue);
        }, timeout ?? 1000)

        // Clean up function (called when component unmounts or data changes)
        return () => clearInterval(intervalId);
    }, [data]);

    return currentHRV;
}

export default useGenerator;