import React from 'react'
import Header from '../Quiz_component/Quiz_Header'
import Camel from '../Quiz_video/Camel.mp4'

const Fun = () => {
    return (
        <div>
            <div>
                <Header />
            </div>
            <div className=''>
                <video autoPlay loop muted width={"100%"} style={{height:'89.3vh'}}>
                    <source src={Camel} type='video/mp4' />
                </video>
            </div>
        </div>
    )
}

export default Fun
