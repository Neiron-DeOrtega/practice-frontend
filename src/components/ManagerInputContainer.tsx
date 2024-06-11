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

    let errors: ErrorList[] = [];

    let responseData = {
        inputString: result,
        selectValue: selectValue,
        teacher: teacher
    }

    const sendResult = async () => {
        fetchRequests.addStudents(resultURL, responseData)
            .then(data => {
                setErrorMessages(data)
                if (data.filter((el: ErrorList) => el.errorType < 200).length === 0) {
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
        if(errors.length > 0) {
            return
        }
        setResult(input)

        // const peopleArray = input.split('\n').map(line => line.trim().replace(/ +/g, ' ')).filter(str => str !== '');
        // if (!selectValue) {
        //     addError(101, errors)
        // }
        // if (peopleArray.length === 0) {
        //     addError(100, errors)
        // }
        // const superNewString = peopleArray.map((line: string, i: number) => {
        //     const parts = line.split(' ');
        //     if (parts.length < 5) {
        //         addError(102, errors, line)
        //     } else if (parts.length > 5) {
        //         addError(200, errors, line)
        //     }
        //     let lastName: string;
        //     try {
        //         parts[0] = parts[0][0].toUpperCase() + parts[0].slice(1);
        //         const email = parts.find(part => part.includes('@') && part.includes('.'))
        //         console.log(email)
        //         if (!email) {
        //             console.log('email')
        //             addError(103, errors, line)
        //             throw 'Ошибка ввода почты'
        //         }
        //         const phoneIndex = parts.indexOf(email!) + 1;
        //         if (!parts[phoneIndex] || parts[phoneIndex].length !== 11) {
        //             addError(104, errors, line)
        //             throw 'Ошибка ввода номера'
        //         }
        //         parts[phoneIndex] = parts[phoneIndex].replace(/^\+?7/, '8');
        //         lastName = parts.shift()!; 
        //         const middleNameParts = parts.slice(0, -2); 
        //         const middleName = middleNameParts.join(' '); 
        //         parts.splice(0, parts.length - 2)
        //         parts.unshift(middleName); 


        //         parts.splice(1, 0, 'P@s*w0rd');
        //         parts.splice(7, 0, `${selectValue}`);

        //         if (errors.length === 0) {
        //             if (teacher === false) {
        //                 parts.push('Слушатель');
        //                 parts.push('Слушатель');
        //             } else {
        //                 parts.push('Преподаватель');
        //                 parts.push('Преподаватель');
        //                 parts.push('editingteacher');
        //             }
        //             let strResult = [lastName!, ...parts]
        //             return strResult.join(';');
        //         }
        //     } catch (error) {
        //         // console.log(error)
        //     }
        //     return [lastName!, ...parts].join(';');
        // });

        // superNewString.unshift('lastname;firstname;password;email;username;course1;cohort1;department');
        // if (teacher === true) {
        //     superNewString[0] += ';role';
        // }
        // console.log(errors)
        // setErrorMessages(errors);
        // if (errors.length === 0) {
        //     setResult(superNewString.join('\n'))
        // }
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
        />
    );
};

export default ManagerInputContainer;
