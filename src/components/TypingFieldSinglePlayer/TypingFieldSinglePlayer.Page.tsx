import React, { useEffect, useState } from 'react'
import { storage } from '../../utils/storage'
import TypingField from '../TypingField/TypingField.Page'
import SetName from './Views/SetName'
import TestResults from './Views/TestResults'
import TypingTest from './Views/TypingTest'

function TypingFieldSinglePlayer() {

    return (
        <TypingField>

            {(props: any) => (
                <>
                    <SetName {...props.username} />
                    <TypingTest {...props} />
                    <TestResults {...props.states} />
                </>
            )}
        </TypingField>
    )
}

export default TypingFieldSinglePlayer