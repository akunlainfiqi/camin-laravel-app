import React from "react";
import {Head, useForm} from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import Button from "@/Components/Button"
import ValidationErrors from "@/Components/ValidationErrors";
import Checkbox from "@/Components/Checkbox";

export default function Update(props){
    const { data, setData, put, processing, errors, reset } = useForm({
        id: props.id,
        title: props.title,
        text: props.text,
        pinned: props.pinned,
        show: props.show,
    });

    console.log(data);
    const onHandleChange = (event)=>{
        setData(event.target.name, event.target.value);
    }

    const onHandleCheckboxChange = (event)=>{
        setData(event.target.name, event.target.checked);
    }

    const submit=(e)=>{
        e.preventDefault();
        console.log(e);
        put('/admin/bulletin/'+props.id);
    }
    return(
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin</h2>}>
            <Head title="Admin test"/>

            <ValidationErrors errors={errors}/>

            <form onSubmit={submit} className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-4">
                <div>
                    <Label forInput="title" value="Title"/>
                    <Input
                        type="text"
                        name="title"
                        value={data.title}
                        isFocused={true}
                        handleChange={onHandleChange}
                        className="w-full"
                        required
                    />
                </div>

                <div className="">
                    <Label forInput="text" value="Text"/>
                    <Input
                        type="text"
                        name="text"
                        value={data.text}
                        handleChange={onHandleChange}
                        className="w-full max-h-48 h-full"
                    />
                </div>

                <div className="">
                    <Label forInput="show" value="Show"/>
                    <Checkbox
                        name="show"
                        value={data.show}
                        handleChange={onHandleCheckboxChange}
                        checked={ data.show }
                    />
                </div>

                <div className="">
                    <Label forInput="pinned" value="pinned"/>
                    <Checkbox
                        name="pinned"
                        value={ data.pinned }
                        handleChange={onHandleCheckboxChange}
                        className=""
                        checked={ data.pinned }
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
