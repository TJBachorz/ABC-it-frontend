import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isEmpty } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';

import { authFetch } from '../../Components/FetchList';
import { DropDownCases } from '../../Components/DropDown';
import { BigButton } from '../../Components/Button';
import { Styles } from '../../Components/Styles';
import { currentYear } from '../../Components/DateFunctions';

export default function CaseSelection({ navigation }) {

    const cases = useSelector(state => state.cases)

    const dispatch = useDispatch()

    const setIsSignedIn = (value) => {
        dispatch({type: "CHANGE_SIGN_IN", payload: value})
    }

    const setCases = (value) => {
        dispatch({type: "CHANGE_CASES", payload: value})
    }

    const setCaseProfile = (value) => {
        dispatch({type: "CHANGE_CASE_PROFILE", payload: value})
    }

    const [selectedCase, setSelectedCase] = useState({})

    useEffect(() => fetchCases(), [isEmpty(cases), cases.length])

    const fetchCases = () => {
        AsyncStorage.getItem("token")
            .then(token => authFetch("accounts/", "GET", token))
            .then(userAccount => setCases(userAccount.cases))
    }

    const renderCases = () => {
        return cases.map(child => {
            return ({
                label: `${child.name}, age: ${currentYear - +(child.dob.split("-")[0])}`, 
                value: {id: child.id, name: child.name, dob: child.dob}
            })
        })
    }

    const makeCaseProfile = () => {
        if (selectedCase.hasOwnProperty("id")) {
            const { id, name, dob } = selectedCase
            setCaseProfile({id, name, dob})
            setSelectedCase({})
            setIsSignedIn(true) 
            navigation.navigate("Home");         
        }
    }

    return (
        <View style={Styles.pageContainer}>
            {!isEmpty(cases) ?  // add !== null
                <>
                    <Text style={Styles.promptText}>Please Select a Case:</Text>
                    <DropDownCases
                        placeholder="Select a Case"
                        items={renderCases()}
                        onChangeItem={(item) => setSelectedCase({
                            id: item.value.id, 
                            name: item.value.name,
                            dob: item.value.dob
                        })}
                    />
                    <BigButton
                        buttonText={"Select Case"}
                        handlePress={makeCaseProfile}
                    /> 
                </> 
                : <Text style={Styles.noCases}>No cases Associated with this account</Text>
            }

            <BigButton
                buttonText={"Create New Case"}
                handlePress={() => navigation.navigate('Create New Case')}
            /> 
        </View>
    )
}