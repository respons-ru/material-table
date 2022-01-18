import React, {useState, useEffect} from "react";
import Table from "./Components/table/Table";
import Form from "./Components/form/Form";
import Overlay from "./Components/form/Overlay";

export default function App() {

    // Table state
    const [tables, setTable] = useState([
        {
            tableKey: Date.now(),
            tableData: [
                {name: "Sten", surname: "Millie", age: 18, city: 'Riga'}
            ]
        }
    ])

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        age: '',
        city: '',
        isEdit: false,
        meta: {}
    })

    const [windowWidth, setWindowWidth] = useState(0)

    window.addEventListener('resize', () => {
        setWindowWidth(window.innerWidth)
    })

    useEffect(() => {
        setWindowWidth(window.innerWidth)
    }, []);

    // Table function
    function copyTable(tableIdKey) {
        const newTable = [{
            tableKey: Date.now(),
            tableData: tables.find(table => table.tableKey === tableIdKey).tableData
        }]

        setTable(
            tables.concat(newTable)
        )
    }

    function removeTable(tableIdKey) {
        const index = tables.findIndex(table => table.tableKey === tableIdKey)
        if (index === 0) {
            alert('Root table cannot be removed')
            return
        }
        setTable(
            tables.filter(table => table.tableKey !== tableIdKey)
        )
    }

    function editRow(tableIndex, row) {
        const {name, surname, age, city} = row
        // Fill form data
        setFormData({
            name,
            surname,
            age,
            city,
            isEdit: true,
            meta: {
                tableIndex,
                rowIndex: row?.tableData?.id
            }
        })
    }

    function deleteRow(tableKey, rowId) {
        const newTable = JSON.parse(JSON.stringify(tables))
        const tableIndex = newTable.findIndex(table => table.tableKey === tableKey)
        newTable[tableIndex].tableData.splice(rowId, 1)
        // Change key
        newTable[tableIndex].tableKey = Date.now()
        setTable(newTable)
    }

    function changeValueHandler(event) {
        const fd = JSON.parse(JSON.stringify(formData))
        fd[event.target.name] = event.target.value
        setFormData(fd)
    }

    function saveHandler(form = null) {
        const {name, surname, age, city, meta} = form || formData
        const newTable = JSON.parse(JSON.stringify(tables))

        if (!formData.isEdit) {
            newTable[0].tableData.push({
                name,
                surname,
                age,
                city
            })
            newTable[0].tableKey = Date.now()
        } else {
            const tableIndex = tables.findIndex(table => table.tableKey === meta.tableIndex)
            newTable[tableIndex].tableData[meta.rowIndex] = {
                name,
                surname,
                age,
                city
            }
            newTable[tableIndex].tableKey = Date.now()
        }
        setTable(newTable)
        setFormData({
            name: '',
            surname: '',
            age: '',
            city: '',
            isEdit: false,
            meta: {}
        })
    }

    return (
        <div className={'container'}>
            <Form formData={formData} changeHandler={changeValueHandler} saveHandler={saveHandler}/>
            {tables.map(table => <Table
                tableData={table.tableData}
                tableKey={table.tableKey}
                copyTable={copyTable}
                removeTable={removeTable}
                windowWidth={windowWidth}
                editRow={editRow}
                deleteRow={deleteRow}
                key={table.tableKey}
            />)}
            <Form formData={formData} changeHandler={changeValueHandler} saveHandler={saveHandler}/>
            {formData.isEdit ? <Overlay formData={formData} saveHandler={saveHandler}/> : null}
        </div>
    )
}