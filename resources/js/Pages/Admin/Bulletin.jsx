import React, {useEffect, useMemo, useState} from 'react';
import {useForm} from '@inertiajs/inertia-react';
import Authenticated from "@/Layouts/Authenticated";
import Table from "@/Components/Table";
import Checkbox from "@/Components/Checkbox";
import {Inertia} from "@inertiajs/inertia";
import Button from "@/Components/Button";

export default function Bulletin(props){
    const { data, setData, put, processing, erros, reset} = useForm([])

    React.useEffect(() => {
        setSkipPageReset(false);
        setData(props.posts.data);
        console.log(data);
        // console.log(props);
    },[props.posts.data]);
    const handleUpdate = async (props)=>{
        const id=props.target.id;
        await axios.get('/admin/bulletin/'+id+'/edit');
    }
    const handleDelete = async(props)=>{
        await axios.delete('/admin/bulletin/'+props.target.id);
        window.location.reload(false);
    }
    const onHandleCheckboxChange = async (e)=>{
        console.log(e.target.checked, e.target.name, e.target.id);
        // e.preventDefault();
        const body = {
            [e.target.name]:e.target.checked,
        }
        put('bulletin/'+e.target.id);
        // const req = await axios.put(route('admin.bulletin.update',e.target.id), body);
        // await console.log(req);
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
                    //     checked={ cell.value }
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
                // console.log(cell);
                return(
                    <div className='space-x-2'>
                        <a href={route('admin.bulletin.edit', cell.row.values.id)}>edit</a>
                        <button onClick={handleDelete} id={cell.row.values.id}>delete</button>
                    </div>
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
            <a href="/admin/bulletin/create" className=''><Button className='mb-6'>Create</Button></a>
            <Table columns={columns} data={data} updateMydata={updateMyData} skipPageReset={skipPageReset}/>
        </div>
        </Authenticated>
    )
}
