import React, {useEffect, useMemo, useState} from 'react';
import {useForm} from '@inertiajs/inertia-react';
import Authenticated from "@/Layouts/Authenticated";
import Table from "@/Components/Table";
import Checkbox from "@/Components/Checkbox";
import {Inertia} from "@inertiajs/inertia";
import Button from "@/Components/Button";

export default function Bulletin(props){
    const { data, setData, post, processing, erros, reset} = useForm([{
        id: '',
        text: '',
        title: '',
        pinned: false,
        show: true,
    }])

    React.useEffect(() => {
        setSkipPageReset(false);
        setData(props.posts.data);
        console.log(props);
    });
    const handleUpdate = (props)=>{
        const id=props.target.id;
        axios.get('/admin/bulletin/'+id+'/edit');
    }
    const handleDelete = (props)=>{
        console.log(props);
    }
    const onHandleCheckboxChange = async (e)=>{
        console.log(e.target.checked, e.target.name, e.target.id);
        // e.preventDefault();
        const body = {
            [e.target.name]:e.target.checked,
        }
        const req = await axios.put('/admin/bulletin/'+e.target.id, body);
        await console.log(req);
    }

    const columns = useMemo(
        () => [{
            Header: "id",
            accessor: "id",
        },
        {
            Header: "Judul",
            accessor: "title",
        },{
            Header:"Isi",
            accessor: "text"
        },{
            Header:"show",
            accessor: "show",
            Cell: ({cell}) => {
                // console.log(cell.value);
                return (
                    <h1>{cell.value.toString()}</h1>
                    // <Checkbox
                    //     name="show"
                    //     id={cell.row.values.id}
                    //     handleChange={onHandleCheckboxChange}
                    //     Checked={ cell.value }
                    // />
                )
            }
        },{
            Header:"pinned",
            accessor: "pinned",
                Cell: ({cell}) => {
                    // console.log(cell.value);
                    return (
                        <h1>{cell.value.toString()}</h1>
                        // <Checkbox
                        //     name="show"
                        //     id={cell.row.values.id}
                        //     handleChange={onHandleCheckboxChange}
                        //     Checked={ cell.value }
                        // />
                    )
                }
        },{
            Header:"action Button",
                Cell: ({cell})=>{
                console.log(cell);
                return(
                    <a href={route('admin.bulletin.edit', cell.row.values.id)}>tes</a>
                    // <div className="space-x-2">
                    //     <button id={cell.row.values.id} onClick={handleDelete}>delete</button>
                    //     <button id={cell.row.values.id} onClick={handleUpdate}>update</button>
                    // </div>
                )
                }
            }
    ],[]);

    const [skipPageReset, setSkipPageReset] = React.useState(false)

    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    }
                }
                return row
            })
        )
    }

    return(
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h1>Bulletin Admin</h1>}>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <Table columns={columns} data={data} updateMydata={updateMyData} skipPageReset={skipPageReset}/>
        </div>
        </Authenticated>
    )
}
