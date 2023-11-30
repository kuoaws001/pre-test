import React, { useEffect, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { IRoom } from '../model/Room'
import CustomInputNumber from './CustomInputNumber'

interface IProps {
    guest: number;
    room: number;
    onChange: (rooms: Array<IRoom>) => void;
}

const room_max = 4;

const RoomAllocation = ({ guest, room, onChange }: IProps) => {

    const [rooms, setRooms] = useState<Array<IRoom>>(initRooms(room))

    useEffect(() => {
        onChange(rooms);
    }, [rooms])

    const handleChange = (e: any, index: number) => {
        const { name, value } = e.target

        let room = rooms[index];
        room[name] = Number(value)

        let temp_rooms = [...rooms];
        temp_rooms.splice(index, 1, room)

        setRooms(temp_rooms)
    }

    const handleBlur = (e: any) => {
        const { name, value } = e.target
        console.log('onBlur', name, value);
    }

    const totleCount = rooms.reduce((a, b) => {
        return a + b.adult + b.child
    }, 0)

    return (
        <Box>
            <Typography>{`住客人數 : ${guest} 人 / ${room} 房 `}</Typography>
            <Box sx={{ backgroundColor: '#B0E2FF', p: 1, borderRadius: 1, mt: 1, mb: 1 }}>
                <Typography>{`尚未分配人數 ${guest - totleCount} 人`}</Typography>
            </Box>
            <Stack direction='column' spacing={8}>
                {rooms.map((r, index) => {

                    const total = r.adult + r.child;

                    return (
                        <Box key={index}>
                            <Box>{`房間 ${r.adult + r.child} 人`}</Box>

                            <Stack direction='row' spacing={10}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography>大人</Typography>
                                </Box>
                                <Box>
                                    <CustomInputNumber
                                        min={1}
                                        max={room_max}
                                        step={1}
                                        name='adult'
                                        value={r.adult}
                                        disabled={false}
                                        disableInc={total >= room_max || totleCount >= guest}
                                        onChange={(e) => handleChange(e, index)}
                                        onBlur={handleBlur}
                                    />
                                </Box>

                            </Stack>

                            <Stack direction='row' spacing={10}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography>小孩</Typography>
                                </Box>
                                <Box>
                                    <CustomInputNumber
                                        min={0}
                                        max={room_max}
                                        step={1}
                                        name='child'
                                        value={r.child}
                                        disabled={false}
                                        disableInc={total >= room_max || totleCount >= guest}
                                        onChange={(e) => handleChange(e, index)}
                                        onBlur={handleBlur}
                                    />
                                </Box>

                            </Stack>
                        </Box>
                    )
                })}

            </Stack>
        </Box>
    )
}

const initRooms = (count: number) => {
    return [...Array(count).keys()].map(x => ({ adult: 1, child: 0 }))
}

export default RoomAllocation