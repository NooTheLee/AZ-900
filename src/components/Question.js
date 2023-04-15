import React, { useMemo, useState } from "react";
import nextId from "react-id-generator";

const Question = ({ data, id, handleCheck, azVi = false, vietsub }) => {
    const [kq, setKq] = useState("");
    const [result, setResult] = useState("");

    const handleKQ = () => {
        if (!data.answer[0]) {
            return;
        }
        let temp = "";

        if (data.trueAnswer === kq) {
            temp = "Correct";
        } else {
            temp = data.trueAnswer;
        }
        setResult(temp);
        handleCheck(temp === "Correct" ? 1 : 0);
    };

    const [explain, explainVi] = useMemo(() => {
        return data.explain.split('=====>');
    }, [data.explain]);

    if (!vietsub && azVi) {
        return <></>;
    }

    return (
        <div className='col-span-1 mb-4 md:mb-14'>
            <div className='flex items-start gap-x-2 mb-3 translate-x-[-40px] '>
                {!azVi && (
                    <div className='text-xl font-extrabold w-10 h-10 flex items-center justify-center border-[2px] rounded-xl shrink-0 '>
                        {id + 1}.
                    </div>
                )}
                <div className='text-lg md:text-2xl mt-[3px]'> {data.question} </div>
            </div>
            <div className='items-center justify-between w-full '>
                <form className='flex flex-col items-start w-full gap-x-1'>
                    {data.answer?.map((v, id) => {
                        if (!v) {
                            return <></>;
                        }
                        return (
                            <Answer
                                key={id + "answer"}
                                text={v}
                                setKq={setKq}
                                azVi={azVi}
                                id_={id}
                            />
                        );
                    })}
                </form>
            </div>
            {result && (
                <>
                    <div className='flex items-center mt-3 gap-x-1'>
                        <div
                            className={`text-xl font-semibold ${
                                result === "Correct" ? "text-green-500" : "text-red-500"
                            } `}
                        >
                            Answer: {result}
                        </div>
                    </div>
                    <div className=''>{explain}</div>
                    {vietsub && <div className='text-green-500 '>{explainVi}</div>}
                </>
            )}
            <div className={`flex items-center mt-3 gap-x-4 ${azVi ? "opacity-0" : ""}`}>
                <button
                    className='border-[1px] bg-green-500 px-4 py-2 text-white rounded-lg text-xl font-bold '
                    onClick={handleKQ}
                    disabled={result}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

const Answer = ({ text, setKq, id_, azVi = false }) => {
    const id = nextId();
    const convert = (x) => {
        switch (x) {
            case 0: return "A";
            case 1: return "B";
            case 2: return "C";
            case 3: return "D";
            default: return -1;
        }
    };
    const handleClick = () => {
        setKq(convert(id_));
    };

    return (
        <div className='flex items-center w-full my-1 gap-x-4 '>
            {!azVi && (
                <input
                    id={id}
                    type='radio'
                    defaultValue
                    name='default-radio'
                    className='mt-0.5 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 shrink-0 '
                    onChange={handleClick}
                />
            )}

            <label htmlFor={id} className='w-full font-medium cursor-pointer'>
                {text}
            </label>
        </div>
    );
};

export default Question;
