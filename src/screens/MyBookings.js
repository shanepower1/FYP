import React, {useEffect, useState} from "react"
import { Text, Card } from "react-native-elements"
import { useAuth } from "components/AuthContext"
import { getUser, getScheduledClass, getClass } from "functions/database"
import MyView from "components/MyView"
import {formatDate, formatTime} from "functions/helpers"

function MyBookings({route}) {
    const { userId } = useAuth()
    const [bookingInfo, setBookingInfo] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    async function loadData() {
        let user = await getUser(userId)

        let info = []

        user.schedule.forEach(id => {
            getScheduledClass(id)
                .then(booking => {
                    getClass(booking.classId)
                        .then(classInfo => {
                            let temp = {
                                name: classInfo.name,
                                date: booking.date,      
                            }

                            info.push(temp)
                        })
                })
        })

        await delay(1000)

        setBookingInfo(info)
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

    return (
        <MyView>
            {
                bookingInfo.map(item => (
                    <Card key={item.id}>
                        <Text>{item.name}</Text>
                        <Text>{formatDate(item.date)}</Text>
                        <Text>{formatTime(item.date)}</Text>
                    </Card>
                ))
            }
        </MyView>
    )
}

export default MyBookings