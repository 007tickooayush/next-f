import Link from 'next/link';
import React from 'react'
import RemoveBtn from './RemoveBtn';
import { HiPencilAlt } from 'react-icons/hi'

const getTopics = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/topics', {
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error('failed to fetch topics');
        }

        return res.json();
    } catch (error) {
        console.error('Error loading topics')

    }
}

const TopicsList = async () => {

    const { topics } = await getTopics();

    // console.log(topics)
    return (
        <>
            {
                topics.map((t) => {
                    return (<div key={t._id} className='p-4 border border-slate-800 my-3 flex justify-between gap-5 items-start'>
                        <div>
                            <h2>{t.title}</h2>
                            <div> {t.description}</div>
                        </div>

                        <div>
                            <RemoveBtn id={t._id}/>
                            <Link href={`/editTopic/${t._id}`} >
                                <HiPencilAlt size={24} />
                            </Link>
                        </div>
                    </div>)
                })
            }
        </>
    )
}

export default TopicsList;