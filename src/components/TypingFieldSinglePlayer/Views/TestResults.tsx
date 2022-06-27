
import { ITFState, ITPState } from '../../TypingField/Interfaces'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
// import faker from 'faker';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    scales: {
        yAxis: {
            min: 0,
            max: 100,
        }
    },
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Rythm Stability',
        },
    },
};


function TestResults({ ...props }: { TFstate: ITFState, TPstate: ITPState, SDList: Array<any> }) {
    const [showDetail, setShowDetail] = useState<boolean>(false)
    let reversed = props.SDList.slice().reverse()
    let sorted = [...props.SDList].sort((a: any, b: any) => {
        return a.calcStanDev - b.calcStanDev;
    }).slice().reverse()
    return (
        <>
            <div className={`h-[370px] w-[450px] p-10 ml-10 ${!(props.TFstate.timer === 0 && !props.TFstate.typingStarted) && 'translate-y-10 opacity-0 w-0 p-0 ml-0'} overflow-hidden  transition-all  text-white flex flex-col items-center justify-between border border-white rounded-xl`}>
                <h1 className='text-3xl font-semibold'>Typing Result</h1>
                {!showDetail ?

                    <>
                        <div className=" w-full p-5">
                            <p className='flex justify-between'><span>Word Typed:</span> <span>{props.TPstate.wordCount}</span></p>
                            <p className='flex justify-between'><span>Character Typed:</span> <span>{props.TPstate.charCount}</span></p>
                            <p className='flex justify-between'><span>Accuracy</span> <span>{props.TPstate.accuracy} %</span></p>
                        </div>
                        <div className="center text-6xl  font-bold text-blue-500 ">
                            <p>{props.TPstate.speed} KPM</p>
                        </div>
                    </> :

                    <>
                        <div className=" w-full p-5 overflow-y-auto">
                            <h2 className="tracking-wide font-semibold text-center">ini adalah score kelancaran dalam mengetikan kata</h2>
                            <h3 className="text-sm mb-5">score dari 1 - 5</h3>
                            <h3 className="text-sm mb-5">(makin kecil makin bagus)</h3>
                            <div className="p-2 text-left">
                                {sorted.map((w: any, i) => (
                                    <p key={i}>{w.word} : {w.calcStanDev}</p>
                                ))}
                            </div>
                        </div>
                    </>
                }
                <div onClick={() => setShowDetail(!showDetail)} className="center my-1 hover:cursor-pointer px-5 py-1 rounded-lg hover:bg-blue-900 transition-colors duration-100">
                    {!showDetail ?
                        <>
                            detail <ChevronDownIcon className='h-5 w-5 font-bold' />
                        </> :
                        <>
                            close detail <ChevronUpIcon className='h-5 w-5 font-bold' />
                        </>
                    }
                </div>

            </div>

            <div className={`h-[370px] w-[450px] px-5 ml-10 ${(props.TFstate.timer === 0 && !props.TFstate.typingStarted) && 'translate-y-10 opacity-0 w-0 p-0 ml-0'} overflow-hidden  transition-all  text-white border border-white rounded-xl`}>
                <div className='text-left w-full h-full center flex-col pt-2 overflow-y-auto'>
                    {/* <pre>{JSON.stringify(reversed, null, 1)}</pre> */}
                    {
                        reversed.length > 0 &&
                        <>
                            <Line
                                options={options}
                                data={{
                                    labels: reversed[0].rythm.map((r: number, i: number) => i),
                                    datasets: [
                                        {
                                            label: 'Dataset 1',
                                            data: reversed[0].rythm,
                                            borderColor: 'rgb(255, 99, 132)',
                                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                        },
                                    ],
                                }} />
                            <p className='text-center'>score: {reversed[0].calcStanDev}</p>
                            <p className='text-center'>score: {JSON.stringify(reversed[0].rythm)}</p>
                            <p className='text-center'>SD: {reversed[0].standDeviation}</p>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default TestResults