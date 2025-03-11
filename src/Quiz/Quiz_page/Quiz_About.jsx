import React from 'react'
import Quiz_Header from '../Quiz_component/Quiz_Header'
import Brain from '../Quiz_images/brain3D_transparent.gif'

const Quiz_About = () => {
    return (
        <div >
           
            <div><Quiz_Header /></div>
            <div className='hero-video-h-100  pt-5' style={{ backgroundColor: '#040508' }} >
                <div className='Rounded'>
                    <h3 className='animated-text'>About</h3>
                </div>
                <div className='d-flex '>
                    <div className='w-40  d-flex align-items-center justify-content-center animated-text delay-1'>
                        <img src={Brain} width={"70%"} height={"70%"} alt="" className='rounded' />
                    </div>
                    <div className='w-60 p-5 animated-text delay-1'>

                        <ul>
                            <li style={{ color: '#C2FFC7' }} >About QuizMaster</li>


                            <p style={{ color: '#C2FFC7', marginTop: '10px' }}> 🎉 Welcome to QuizMaster, your ultimate destination for fun, learning, and challenges!
                                <br />
                                Whether you're looking to test your knowledge, learn something new, or compete with friends,<br /> QuizMaster has got you covered.</p>
                            <li style={{ color: '#C2FFC7' }} className='animated-text delay-2'>Features</li>
                            <p style={{ color: '#C2FFC7', marginTop: '10px' }} className='animated-text delay-2'>
                                Wide Variety of Topics: Choose from multiple categories to suit your interests.
                                Solo or Multiplayer: Play on your own or challenge your friends to see who’s the trivia master!
                                Dynamic Difficulty: Questions adjust to your skill level for a personalized experience.
                                Leaderboard: Compete with players worldwide and secure your spot at the top.
                                Daily Challenges: Earn rewards by completing unique quizzes every day.
                            </p>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Quiz_About
