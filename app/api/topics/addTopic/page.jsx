"use client";

import { useRouter } from 'next/navigation';
import Router from 'next/router';
import React, { useState } from 'react'

const AddTopic = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const router = useRouter();
    // console.log('jho')
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!title || !description){
            alert('Title and description are required');
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/topics",{
                method : "POST",
                headers :{
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify({title,description})
            });

            if(res.ok){
                router.push('/');
            }else{
                throw new Error('Failed to create a Topic');
            }
        } catch (error) {
            console.error(error);
        }

    }
    return (
        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
            {/* <label>new form add topic</label> */}
            <input
                onChange={e => setTitle(e.target.value)}
                value={title}
                type={'text'}
                className='border border-slate-800 px-8 py-2'
                placeholder='Topic Title'
            />
            <input
                onChange={e => setDescription(e.target.value)}
                value={description}
                type={'text'}
                className='border border-slate-800 px-8 py-2'
                placeholder='Topic Description'
            />
            <button 
            type='submit'
            className='bg-green-600 font-bold text-white py-3 px-6 w-fit'>Add Topic</button>
        </form>
    )
}

export default AddTopic;