import React from 'react'
import { Container, Stack, Box, Divider, Typography } from '@mui/material'
import '@/styles/index.css'
import CustomInputNumber from './components/CustomInputNumber'
import RoomAllocation from './components/RoomAllocation'
import { IRoom } from './model/Room'

const App = () => {

    const handleChange = (e: any) => {
        const { name, value } = e.target
        console.log('onChange', name, value);
    }

    const handleBlur = (e: any) => {
        const { name, value } = e.target
        console.log('onBlur', name, value);
    }

    const handleRoomChange = (rooms: Array<IRoom>) => {
        const total = rooms.reduce((a, b) => {
            return a + b.adult + b.child
        }, 0)
        console.log('result', rooms)
        console.log('total', total)
    }

    return (
        <Container sx={{ width: 400 }}>

            <Stack direction='column' spacing={2}>
                <Box>
                    <Typography>min:0 max:10 value:1</Typography>
                    <CustomInputNumber
                        min={0}
                        max={10}
                        step={1}
                        name='qty'
                        value={1}
                        disabled={false}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Box>

                <Box>
                    <Typography>min:0 max:10 value:1 step:2</Typography>
                    <CustomInputNumber
                        min={0}
                        max={10}
                        step={2}
                        name='qty'
                        value={1}
                        disabled={false}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Box>

                <Box>
                    <Typography>disabled:true</Typography>
                    <CustomInputNumber
                        min={0}
                        max={10}
                        step={2}
                        name='qty'
                        value={1}
                        disabled={true}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Box>

            </Stack>

            <Divider sx={{ m: 1 }} />

            <RoomAllocation
                guest={10}
                room={3}
                onChange={handleRoomChange}
            />

        </Container>
    )
}

export default App;