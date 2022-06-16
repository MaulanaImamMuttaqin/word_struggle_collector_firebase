import React, { useContext, useEffect, useState } from 'react'
import TypingField from '../TypingField/TypingField.Page'
import TestResults from './Views/TestResults'
import TypingTest from './Views/TypingTest'

function TypingFieldSinglePlayer() {

    return (
        // <div></div>
        <TypingField>

            {(props: any) => (
                <>
                    <TypingTest {...props} />
                    <TestResults {...props.states} />
                </>
            )}
        </TypingField>
    )
}

export default TypingFieldSinglePlayer