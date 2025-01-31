import React from "react";

export default function page({ params }: { params : { id: string }}) {
    const { id } = params;
  return (
    <div>
      <h1 className='text-3xl'>user deatils {id}</h1>
    </div>
  )
}
