import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function LineGraph({ data, dataKeyProperty }) {
    return (
        <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey={dataKeyProperty} />
                <YAxis />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default LineGraph