import React, { useEffect, useRef, useState } from 'react';
import ManagerInput from './ManagerInput';
import { FetchRequests, ResponseData, resultURL } from '..';

export interface ManagerInputProps {
    stringChanger: React.Dispatch<React.SetStateAction<any>>;
    setTeacher: React.Dispatch<React.SetStateAction<boolean>>;
    teacher: boolean;
    setSelectValue: React.Dispatch<React.SetStateAction<string>>;
    errorMessages: ErrorList[];
    fetchRequests: FetchRequests;
    responseData: ResponseData
    setErrorMessages: React.Dispatch<React.SetStateAction<ErrorList[]>>
    students: string,
    setStudents: React.Dispatch<React.SetStateAction<string>>
    setChecked: React.Dispatch<React.SetStateAction<boolean>>;
    checked: boolean
    firstRender: boolean
}

type AddErrorFunction = (errorType: number, errors: ErrorList[], string?: string) => void;

interface ManagerInputContainerProps {
    fetchRequests: FetchRequests;
    addError: AddErrorFunction;
}

export interface ErrorList {
    id: number,
    errorType: number,
    errorMessage: string
}

const ManagerInputContainer: React.FC<ManagerInputContainerProps> = ({ fetchRequests, addError }) => {
    const [teacher, setTeacher] = useState<boolean>(false);
    const [selectValue, setSelectValue] = useState<string>('');
    const [errorMessages, setErrorMessages] = useState<ErrorList[]>([]);
    const [result, setResult] = useState<string>('')
    const [firstRender, setFirstRender] = useState<boolean>(false)
    const [students, setStudents] = useState('');
    const [checked, setChecked] = useState<boolean>(false)

    let errors: ErrorList[] = [];

    let responseData = {
        inputString: result,
        selectValue: selectValue,
        teacher: teacher,
        isChecked: checked
    }

    const sendResult = async () => {
        fetchRequests.addStudents(resultURL, responseData)
            .then(data => {
                setErrorMessages(data)
                if (data.filter((el: ErrorList) => el.errorType <= 200).length === 0) {
                    setStudents('')
                }
            })
        
    }

    useEffect(() => {
        setFirstRender(true)
    }, [])

    useEffect(() => {
        if (firstRender) {
            sendResult()
        } 
    }, [result])

    const stringChanger: (input: string) => any = async (input) => {

        if (!selectValue) {
            addError(101, errors)
            setErrorMessages(errors)
        } else if (!input) {
            addError(100, errors)
            setErrorMessages(errors)
        }
        console.log(errors)
        if(errors.length > 0) {
            return
        }
        setResult(input)

    };

    return (
        
        <ManagerInput
            stringChanger={stringChanger}
            setTeacher={setTeacher}
            teacher={teacher}
            setSelectValue={setSelectValue}
            errorMessages={errorMessages}
            fetchRequests={fetchRequests}
            responseData={responseData}
            setErrorMessages={setErrorMessages}
            setStudents={setStudents}
            students={students}
            setChecked={setChecked}
            checked={checked}
            firstRender={firstRender}
        />
    );
};

export default ManagerInputContainer;
