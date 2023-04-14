import React, { useState } from "react";
import nextId from "react-id-generator";

const Question = ({ data, id, handleCheck }) => {
    const [kq, setKq] = useState("");
    const [result, setResult] = useState("");

    const handleKQ = () => {
        if (!data.answer[0]) {
            return;
        }
        let temp = "";
        if (kq) {
            if (kq[0] === data.trueAnswer) {
                temp = "Correct";
            } else {
                temp = data.trueAnswer;
            }
        }
        setResult(temp);
        handleCheck(temp === "Correct" ? 1 : 0);
    };

    return (
        <div className='mb-14'>
            <div className='flex items-start gap-x-2 mb-3 w-[120%] translate-x-[-40px] '>
                <div className='text-xl font-extrabold w-10 h-10 flex items-center justify-center border-[2px] rounded-xl shrink-0 '>
                    {id + 1}.
                </div>
                <div className='text-2xl mt-[3px]'> {data.question} </div>
            </div>
            <div className='items-center justify-between w-full '>
                <form className='flex flex-col items-start w-full gap-x-1'>
                    {data.answer?.map((v, id) => {
                        if (!v) {
                            return <></>;
                        }
                        return <Answer key={id + "answer"} text={v} setKq={setKq} />;
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
                    <div className=''>{data.explain}</div>
                </>
            )}

            <div className='flex items-center mt-3 gap-x-4'>
                <button
                    className='border-[1px] bg-green-500 px-4 py-2 text-white rounded-lg text-xl font-bold '
                    onClick={handleKQ}
                    disabled={result || !kq}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

const Answer = ({ text, setKq }) => {
    const id = nextId();
    const handleClick = (e) => {
        setKq(text);
    };

    return (
        <div className='flex items-center w-full my-1 gap-x-4 '>
            <input
                id={id}
                type='radio'
                defaultValue
                name='default-radio'
                className='mt-0.5 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 shrink-0 '
                onChange={handleClick}
            />
            <label htmlFor={id} className='w-full font-medium cursor-pointer'>
                {text}
            </label>
        </div>
    );
};

export default Question;
