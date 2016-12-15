import React from 'react'
import Table from './Table'
import Heading from './Heading'

const App = ({data}) => (
    <div>
        <Heading/>
        <Table data={data}/>
    </div>
)

global.App = App
