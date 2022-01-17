import React from "react";
import MaterialTable from "material-table";
import './_table.scss';

export default function Table({tableData, copyTable, removeTable, tableKey, editRow, deleteRow, windowWidth}) {

    const columns = [
        {title: "Name", field: "name", filtering: false,},
        {title: "Surname", field: "surname", filtering: false,},
        {title: "Age", field: "age", filtering: false,},
        {title: "City", field: "city", filtering: false,},
        {
            render: rowData => (<div className={'actions-column'}>
                <div className="actions-edit" onClick={() => onEditRow(rowData)}>
                    Edit
                </div>
                <div className="action-delete" onClick={() => onDeleteRow(rowData)}>
                    Delete
                </div>
            </div>)
        }
    ]

    function onCopyHandler() {
        copyTable(tableKey)
    }

    function onRemoveHandler() {
        removeTable(tableKey)
    }

    function onEditRow(row) {
        editRow(tableKey, row)
    }

    function onDeleteRow(row) {
        deleteRow(tableKey, row?.tableData?.id)
    }

    return (
        <div className={'table-wrapper'}>
            <div className="table-tools">
                <div className="copy-table" onClick={onCopyHandler}>
                    Copy table
                </div>
                <div className="remove-table" onClick={onRemoveHandler}>
                    <img src={require("../../assets/images/remove.png")} alt="remove"/>
                </div>
            </div>
            <MaterialTable
                columns={columns}
                data={tableData}
                style={{
                    width: '100%',
                    maxWidth: "600px",
                    marginBottom: '20px'
                }}
                options={{
                    actionsCellStyle: {
                        backgroundColor: "white",
                        color: "#FF00dd"
                    },
                    filtering: false,
                    sorting: false,
                    showTitle: false,
                    paging: false,
                    search: false,
                    actionsColumnIndex: -1,
                    headerStyle: {backgroundColor: "#0A508B", color: "#84A6C4"},
                    fixedColumns: {
                        left: windowWidth < 600 ? 1 : null,
                    }
                }}
            />
        </div>
    );
}

