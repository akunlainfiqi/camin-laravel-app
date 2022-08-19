import React from "react";
import {Head, useForm} from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import Button from "@/Components/Button"
import ValidationErrors from "@/Components/ValidationErrors";

export default function Update(props){
    const { data, setData, patch, processing, errors, reset } = useForm({
        id: props.id,
        title: props.title,
        text: props.text,
        pinned: props.pinned,
        show: props.show,
    });
    console.log(props);

    const onHandleChange = (event)=>{
        setData(event.target.name, event.target.value);
    }

    const submit=(e)=>{
        e.preventDefault();
        axios.patch('http://localhost:8000/api/bulletin/'+props.id);
    }
    return(
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin</h2>}>
            <Head title="Admin test"/>

            <ValidationErrors errors={errors}/>

            <form onSubmit={submit}>
                <div>
                    <Label forInput="title" value="Title"/>
                    <Input
                        type="text"
                        name="title"
                        value={data.title}
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="text" value="Text"/>
                    <Input
                        type="text"
                        name="text"
                        value={data.text}
                        handleChange={onHandleChange}
                    />
                </div>
                <div>
                    <Button processing={processing}>
                        Post
                    </Button>
                </div>
            </form>
        </Authenticated>
    )
}
