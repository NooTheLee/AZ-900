import { useEffect, useState, useMemo } from "react";
import Question from "./components/Question";
import {az} from './files';
import axios from "axios";

function App() {
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);

    const [name, setName] = useState("az");
    const [topic, setTopic] = useState([]);

    const createData = (q, a, b, c, d, e, n, _e) => {
        return {
            question: q,
            answer: [a, b, c, d, e],
            trueAnswer: n,
            explain: _e,
        };
    };

    const handleData = (data) => {
        const aaa = data.split("Question ");
        console.log('aaa', aaa);
        let bbb = [];
        aaa.forEach((element) => {
            if (!element) {
                return;
            }
            let a, b, c, d, e, n;
            const temp = element.split('\r\n');
            let question = "";
            let explain = "";
            let check = false;
            for(const j of temp) {
                if (j.includes('A.')) {
                    check = true;
                    a = j;
                    continue;
                }
                if (!check) {
                    question += j.replace("Topic 1", "") + " ";
                } 
                if (j.includes('B.')) {
                    b = j;
                    continue;
                } else
                if (j.includes('C.')) {
                    c = j;
                    continue;
                } else
                if (j.includes('D.')) {
                    d = j;
                    continue;
                } else
                if (j.includes('E.')) {
                    e = j;
                    continue;
                } else 
                if (j.includes('Correct Answer:')) {
                    n = j.replace("Correct Answer: ", "");
                    continue;
                }
                if (check) {
                    explain += j;
                }
            }
            bbb.push(createData(question, a, b, c, d, e, n, explain));
        });
        bbb = bbb.sort(() => Math.random() - 0.5).filter(v => v.answer[0]);
        console.log('bbb', bbb);
        setTopic(bbb);
    };

    const getFileName = useMemo(() => ({
        az: az,
    }), [])

    const readData = async (txt) => {
        try {
            const { data } = await axios.get(getFileName[txt]);
            handleData(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setCorrect(0);
        setIncorrect(0);
        readData(name);
    }, [name]);

    const handleScore = (x) => {
        if (x) {
            setCorrect((i) => i + 1);
            return;
        }
        setIncorrect((i) => i + 1);
    };

    const handleSelect = (e) => {
        setName(e.target.value);
    };

    const topicName = () => {
        switch (name) {
            case "txt1":
                return "Đề 1";
            case "txt2":
                return "Đề 2";
            case "txt3":
                return "Đề 3";
            case "txt4":
                return "Đề 4";
            default:
                return "AZ-900";
        }
    };

    return (
        <div className='h-screen w-screen px-[25%] overflow-x-hidden dark:bg-[#18191A] dark:text-[#E4E6EB] pb-10 '>
            <div className='fixed top-[10vh] right-[5vw] flex gap-x-4'>
                <div className=' border-[5px] border-green-600 w-[100px] h-[100px] flex items-center justify-center text-[50px] rounded-2xl text-green-700 font-[600] '>
                    {correct}
                </div>
                <div className=' border-[5px] border-red-600 w-[100px] h-[100px] flex items-center justify-center text-[50px] rounded-2xl text-red-700 font-[600] '>
                    {incorrect}
                </div>
            </div>

            <div
                id='select'
                className='w-full text-center text-red-600 text-[100px] font-extrabold my-10 '
            >
                {topicName()}
            </div>
            <select
                className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-5 text-bold '
                onChange={handleSelect}
                value={topic}
            >
                <option value='az'>AZ 900</option>
            </select>
            <div className='w-full '>
                {topic && topic.length > 0 && topic.map((v, id) => {
                    if (!v.answer[0]) {
                        return <></> ;
                    }
                    return <Question data={v} id={id} handleCheck={handleScore} key={id + "keyQ"} />
                })}
            </div>
        </div>
    );
}

export default App;
