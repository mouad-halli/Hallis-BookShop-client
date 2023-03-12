import { useEffect, useRef, useState } from "react";

interface PropsType {
    initialMin: number
    initialMax: number
    min: number
    max: number
    priceCap: number
    step: number
    handleDisplayIfInPriceRange: (minPrice: number, maxPrice: number) => void
}

export const PriceRangeSlider = (props: PropsType) => {

    const { initialMin, initialMax, min, max, priceCap, step, handleDisplayIfInPriceRange } = props

    const [minValue, setMinValue] = useState(initialMin);
    const [maxValue, setMaxValue] = useState(initialMax);

    const progressRef = useRef<HTMLDivElement>(null);

    const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMinValue = e.target.valueAsNumber

        if (newMinValue >= min && newMinValue <= (maxValue - priceCap))
            setMinValue(newMinValue)
    }
  
    const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMaxValue = e.target.valueAsNumber

        if (newMaxValue <= max && newMaxValue >= (minValue + priceCap))
            setMaxValue(newMaxValue)
    }

    useEffect(() => {
        const progresBarStyle = progressRef.current?.style
        if (!progresBarStyle)
            return
        progresBarStyle.left = (minValue / max) * 100 + "%"
        progresBarStyle.right = 100 - ((maxValue / max) * 100) + "%"

        handleDisplayIfInPriceRange(minValue, maxValue)
        
    }, [minValue, maxValue])

    return (
        <div className='w-full space-y-4'>
            <div className=" w-full flex justify-between gap-x-2">
                <div className="flex gap-x-2">
                    <h1 className="">Min</h1>
                    <span className=" font-bold text-blue-500">${minValue}</span>
                </div>
                <div className="flex gap-x-2">
                    <h1 className="">Max</h1>
                    <span className=" font-bold text-blue-500">${maxValue}</span>
                </div>
            </div>
            <div className='flex relative'>
                    <div className=" h-2 absolute bg-blue-300 rounded "
                      ref={progressRef}
                    ></div>
                <input type="range" 
                    min={min}
                    step={step}
                    max={max}
                    value={minValue}
                    onChange={handleMin} className="w-full absolute h-2 bg-transparent  pointer-events-none bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <input type="range" 
                    min={min}
                    step={step}
                    max={max}
                    value={maxValue}
                    onChange={handleMax} className="w-full absolute h-2 bg-transparent pointer-events-none bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
            </div>
        </div>
    )
}