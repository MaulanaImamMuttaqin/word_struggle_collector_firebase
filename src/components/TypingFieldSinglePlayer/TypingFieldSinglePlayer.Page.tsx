import React, { useContext, useEffect, useState } from 'react'
import { storage } from '../../utils/storage'
import { AuthContext } from '../AuthContext/AuthContextProvider'
import TypingField from '../TypingField/TypingField.Page'
import SetName from './Views/SetName'
import TestResults from './Views/TestResults'
import TypingTest from './Views/TypingTest'

function TypingFieldSinglePlayer() {
    const { username } = useContext(AuthContext)

    return (
        <TypingField>

            {(props: any) => (
                <>
                    <SetName {...username} />
                    <TypingTest {...props} />
                    <TestResults {...props.states} />
                </>
            )}
        </TypingField>
    )
}

export default TypingFieldSinglePlayer