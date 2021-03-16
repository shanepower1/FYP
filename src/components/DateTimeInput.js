import React, {useState} from 'react';
import {View, Button, Platform, Text, TouchableOpacity} from 'react-native';
import { Input } from "react-native-elements"
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate } from "functions/helpers"

export default function DateTimeInput({date, setDate, mode}) {
  const [show, setShow] = useState(false);
   //https://github.com/react-native-datetimepicker/datetimepicker
   //COde got for the data time picker from the above link. 
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  }

  return (
    <View>
      {Platform.OS != 'android' &&
        <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
        /> 
      }
    </View>
  )
}
