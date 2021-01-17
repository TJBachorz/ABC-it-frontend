import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import CaseSelection from './CaseSelection';
import CreateNewCase from './CreateNewCase';
import { NavButton } from '../Components/Button';

const Stack = createStackNavigator();

export default function UserCaseStackPage({ 
    setIsSignedIn,
    navigation, 
    account, 
    setAccount, 
    caseInfo,
    isNewCase,
    setIsNewCase,
    setCaseInfo
}) {

    return (
        <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: '#f8f8ff'},
        }}>

            <Stack.Screen 
                name="Case Selection Main"
                options={{
                    headerTitle: "",
                    headerLeft: () => (
                        <NavButton onPress={() => navigation.openDrawer()}/>
                    )                
            }}>
                    
                {(props) => <CaseSelection
                    isNewCase={isNewCase}
                    setIsSignedIn={setIsSignedIn}
                    account={account}
                    setAccount={setAccount}
                    caseInfo={caseInfo}
                    setCaseInfo={setCaseInfo} 
                    navigation={navigation}
                    {...props}
                />}
            </Stack.Screen>
            <Stack.Screen 
                name="Create New Case"
                options={{ headerTitle: ""}}
            >
                {(props) => <CreateNewCase 
                    isNewCase={isNewCase}
                    setIsNewCase={setIsNewCase}
                    navigation={navigation}
                    {...props}
                />
                }
            </Stack.Screen>
        </Stack.Navigator> 
    )
}