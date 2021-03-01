import React, {useState} from 'react';
import {View, Button, Platform, Text, TouchableOpacity} from 'react-native';
import { Input } from "react-native-elements"
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate } from "functions/helpers"

export default function DateTimeInput({date, setDate, mode}) {
  const [show, setShow] = useState(false);
    
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  }

  return (
    <View>
        <TouchableOpacity onPress={() => setShow(true)}>
          <Input label="Date" value={formatDate(date)} disabled /> 
        </TouchableOpacity>
        {show && (
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
            /> 
        )}
    </View>
  )
}
