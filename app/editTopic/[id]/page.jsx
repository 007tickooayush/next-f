import EditTopicForm from '@/app/components/EditTopicForm'
import React from 'react'

const getTopicById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
            cache : "no-store"
        })
        if(!res.ok){
            throw new Error('Failed to fetch topic')
        }
        return res.json();
    } catch (error) {
        console.error(error);
    }
}

const EditTopic = async ({ params }) => {
    const { id } = params;
    // console.log('id :>> ', id);
    const {topic} = await getTopicById(id);

    const{title,description} = topic;

    return (
        <EditTopicForm id = {id} title={title} description={description}/>
    )
}

export default EditTopic;