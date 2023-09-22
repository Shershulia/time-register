import React from 'react';

const TimeTrackersList = ({ array =[] }) => {
    return (
        <div className=' w-full flex justify-center items-center'>
            <table className=' border-collapse w-2/3 font-normal'>
                <tr className=' border bg-white'>
                    <th>#</th>
                    <th>Description</th>
                    <th>Time</th>
                    <th>Category</th>
                    <th>Github</th>
                </tr>
                {array?.map((item, key) => (
                    <tr key={key} className={`border ${key%2==0 ? "bg-s-blue" : " bg-s-mint"}`}>
                        <th>{key + 1}</th>
                        <th>{item.desc}</th>
                        <th>{item.time.toFixed(2)}</th>
                        <th>{item.category}</th>
                        <th>{item.gitHub?.slice(0,3).toString()}</th>

                    </tr>
                ))}
            </table>
        </div>
    );
};

export default TimeTrackersList;
