import React from 'react';

// Generator function to create a generator for a given array
function* getData(data: Array<Data>): Generator<Data, void> {
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
const useGenerator = (data: Array<Data>, timeout?: number): Data | null => {

    const [currentData, setCurrentData] = React.useState<Data|null>(null);
    const generator = React.useRef<Generator<Data|null> | null>(null);

    React.useEffect(() => {
        generator.current = getData(data);

        const intervalId = setInterval(() => {
            const nextValue = generator.current!.next().value;
            setCurrentData(nextValue);
        }, timeout ?? 1000)

        // Clean up function (called when component unmounts or data changes)
        return () => clearInterval(intervalId);
    }, [data]);

    return currentData;
}

export default useGenerator;