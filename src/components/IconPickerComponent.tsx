import { useEffect, useState } from "react";
import { Icon, iconNames } from "./Icon";

interface IconPickerComponentProps {
    rowsInOnePage: number;
    columnsInOnePage: number;
    iconHeight: string;
    iconWidth: string;
    pickerHeight: string;
    pickerWidth: string;
    setOpen : (value: boolean) => void;
    setCurrentIcon: (value: string) => void;
}

const IconPickerComponent = ({
    rowsInOnePage,
    columnsInOnePage,
    iconHeight,
    iconWidth,
    pickerHeight = "500px",
    pickerWidth = "500px",
    setOpen,
    setCurrentIcon
}: IconPickerComponentProps) => {
    const [page, setPage] = useState(1);
    const [mounted, setMounted] = useState(false);
    useEffect(()=>{
        setMounted(true)
    },[])
    const heightOfIcon = parseInt(iconHeight.match(/\d+/)?.[0] || '0', 10);

    function extractNumber(str: string): number {
        return parseInt(str.match(/\d+/)?.[0] || '0', 10);
    }
    const heightOfPicker = extractNumber(pickerHeight);

    function findMaxRows(
        low: number,
        high: number,
        heightOfIcon: number
    ): number {

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const accumulatedHeight = mid * heightOfIcon + (mid + 1) * 16;

            if (accumulatedHeight <= heightOfPicker) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return high;
    }

    console.log(rowsInOnePage)

    const low = 1;
    const high = 287;

    const possibleRows = findMaxRows(low, high, heightOfIcon);
    const possibleIcons = possibleRows * columnsInOnePage;
    const totalPage = Math.ceil(287 / possibleIcons);

    const [selectedIcon, setSelectedIcon] = useState<string | null>(null)

    if(!mounted) return null;

    return (
        <>
            <div className="flex items-center justify-center space-x-3">
                <button disabled={page === 1} onClick={() => setPage(page - 1)} className="disabled:opacity-60 p-2 bourder-none bg-violet-600 text-white rounded-lg px-4">Prev</button>
                <span className="text-xl">{page}</span>
                <button disabled={page === totalPage} onClick={() => setPage(page + 1)} className="disabled:opacity-60 p-2 bourder-none bg-violet-600 text-white rounded-lg px-4">Next</button>
            </div>
            <div
                style={{gridTemplateRows: `repeat(${rowsInOnePage}, 1fr)`, gridTemplateColumns: `repeat(${columnsInOnePage}, 1fr)`, maxHeight: pickerHeight, maxWidth: pickerWidth}}
                className={`shadow-lg mx-auto p-4 gap-4 grid`}
            >
                {iconNames.slice(possibleIcons * (page - 1), possibleIcons * (page - 1) + possibleIcons).map((iconName, index) => (
                    <Icon key={index} name={iconName} iconHeight={iconHeight} iconWidth={iconWidth} setSelectedIcon = {setSelectedIcon} />
                ))}
            </div>
            <div style={{maxWidth: pickerWidth}} className={`mt-4 w-[70%] mx-auto flex items-center justify-end gap-4`}>
            <button onClick={() => setOpen(false)} className="p-2 bourder-none bg-red-500 text-white rounded-lg px-4">Cancel</button>
            <button disabled={selectedIcon === null} onClick={() => {
                setCurrentIcon(selectedIcon!)
                setOpen(false)
            }} className="disabled:opacity-60 p-2 bourder-none bg-violet-600 text-white rounded-lg px-4">Done</button>
            </div>
        </>
    );
};

export default IconPickerComponent;