"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'


const EditTopicForm = ({id,title, description}) => {
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description)
    const router = useRouter();

    // console.log('newTitle, newDescription', newTitle, newDescription)
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3000/api/topics/${id}`,{
                method: "PUT",
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify({newTitle,newDescription})
            })
            
            if(!res.ok){
                throw new Error('Failed to update topic');
            }

            router.refresh();
            router.push('/')

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
            <input
                onChange={e => setNewTitle(e.target.value)}
                value={newTitle}
                type={'text'}
                className='border border-slate-800 px-8 py-2'

            />
            <input
                onChange={e => setNewDescription(e.target.value)}
                value={newDescription}
                type={'text'}
                className='border border-slate-800 px-8 py-2'
            />
            <button type='submit' className='bg-green-600 font-bold text-white py-3 px-6 w-fit'>Update Topic</button>
        </form>
    )
}

export default EditTopicForm;