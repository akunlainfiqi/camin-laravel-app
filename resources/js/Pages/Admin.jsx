import Authenticated from "@/Layouts/Authenticated";
import { Head } from '@inertiajs/inertia-react';
export default function Admin(props){
    return(
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin</h2>}>
            <Head title="Admin test"/>
            <h1>tes</h1>
        </Authenticated>
    )
}
