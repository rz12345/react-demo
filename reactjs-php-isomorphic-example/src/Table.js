const Table = ({data}) => (
    <table>
        <tbody>{data.map((row, i) => (
                <tr key={i}>
                    {row.map((cell, j) => (
                        <td key={j}>{cell}</td>
                    ))}
                </tr>
            ))}</tbody>
    </table>
)

export default Table
