import React from 'react'
import '@/styles/index.css'
import CustomInputNumber from './components/CustomInputNumber'

const App = () => {

    const handleChange = (e: any) => {
        const { name, value } = e.target
        console.log('onChange', name, value);
    }

    const handleBlur = (e: any) => {
        const { name, value } = e.target
        console.log('onBlur', name, value);
    }

    return (
        <>
            <CustomInputNumber
                min={0}
                max={15}
                step={2}
                name='qty'
                value={1}
                disabled={false}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </>
    )
}

export default App;