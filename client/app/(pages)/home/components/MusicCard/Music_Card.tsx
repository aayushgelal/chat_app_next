import React from 'react'
import { MusicGenreProps } from '../../../../types'

export default function MusicGenre_Card({name,link,color}:MusicGenreProps) {
  let num=0;
  return (
    <div className='flex flex-col items-center w-min'>
    <div style={{backgroundColor:`${color}`}} className='p-2 h-52 w-52 rounded-lg '>


    </div>
    <p className='font-medium text-xl '>{name}</p>

    </div>
  )
}
