import React, { useState } from "react"
import { auth, db } from "../firebase"
import { Card, Input, Button } from "react-native-elements"

function RegisterGym() {
    const [name, setName] = useState("")
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [town, setTown] = useState("")
    const [county, setCounty] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNum, setPhoneNum] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")

    const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const numberFormat = /^[0-9]*$/

    function addGym() {
        if(name.length < 1) {
            alert("Please enter a name")
        } else if(address1.length < 1) {
            alert("Please enter an addresss")
        } else if(town.length < 1) {
            alert("Please enter a town")
        } else if(county.lenth < 1){
              alert('Plese enter a county')
        } else if(email.length < 1) {
            alert("Please enter an email")   
        } else if(!emailFormat.test(email)) {
            alert("Email badly formatted")
        } else if(phoneNum < 1) {
            alert("Please enter a phone number")
        } else if(!numberFormat.test(phoneNum)) {
            alert("Phone numbers must only contain numbers")
        } else if(password1.length < 6) {
            alert("Password must container 6 or more characters")
        } else if(password1 != password2) {
            alert("Passwords don't match")
        } else {

            auth.createUserWithEmailAndPassword(email, password1)
                .then(result => {
                    db.collection("gyms").doc(result.user.uid).set({
                        name: name.trim(),
                        address1: address1.trim(),
                        address2: address2.trim(),
                        town: town.trim(), 
                        county: county.trim()
                    })
                    alert("Success")
                }).catch(error => {
                    alert(error.message)
                })
           
        }
    }

    return (
        <Card>
            <Input onChangeText={text => setName(text)} value={name} placeholder='Name'/> 
            <Input onChangeText={text => setAddress1(text)} value={address1} placeholder='Address 1'/>
            <Input onChangeText={text => setAddress2(text)} value={address2} placeholder='Address 2'/>
            <Input onChangeText={text => setTown(text)} value={town} placeholder='Town'/>
            <Input onChangeText={text => setCounty(text)} value={county} placeholder='County'/>
            <Input onChangeText={text => setEmail(text)} value={email} keyboardType="email-address" placeholder='Email Address'/>
            <Input onChangeText={text => setPhoneNum(text)} value={phoneNum} keyboardType="numeric" placeholder='Phone Number'/>
            <Input onChangeText={text => setPassword1(text)} value={password1} secureTextEntry={true} placeholder='Password'/>
            <Input onChangeText={text => setPassword2(text)} value={password2} secureTextEntry={true} placeholder='Password 2'/>

            <Button onPress={addGym} title="Add Gym"  />   
        </Card>  
    )
}

export default RegisterGym