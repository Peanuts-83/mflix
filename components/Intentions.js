import React from 'react'

// Intentions component with forwarded ref // Unabled with function component
const Intentions = React.forwardRef((props, intentions) => {
    const {toggle} = props
    return (
        <div className='intentions' ref={intentions}>
            <div className='container'>
                <div className='close' onClick={toggle}>X</div>
                <h1>Production of a Single Page Application to exploit the Atlas MongoDB service.</h1>

                <em>The objective of this project is to create an application "from scratch" providing ratings and reviews on cinema movies, using API self-made routes implemented with aggregate mongo's requests.</em>
                
                <ul>
                    <li><strong>Framework :</strong> React / NextJS</li>
                    <li><strong>Routes API :</strong> NextJS</li>
                    <li><strong>UI Design :</strong> Figma</li>
                    <li><strong>Database :</strong> Atlas MongoDB</li>
                </ul>

                <h3>Figma</h3> Quick development of the application's UI design, its functionalities, and the articulation of responsive elements.

                <h3>React</h3> CLassical base components are used, with special components required from NextJS (_app.js & layout.js). The use of Style with Sass requires modules, because of the way NextJS manages style as an object.

                <h3>NextJS</h3> API routes are defined in the same project. A default route (index) can be defined, and a more specific route can be built with specific arguments to query.

                <h3>Atlas MongoDB</h3> Mongo gives access to a free online database service called Atlas, provided with some data collections to be used for experimentation.

            </div>
        </div>
    )
}
)

export default Intentions