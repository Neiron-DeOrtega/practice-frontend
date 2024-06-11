import React from 'react';
import ReactDOM from 'react-dom/client';
import styles from './App.module.css';
//@ts-ignore
import reportWebVitals from './reportWebVitals';
import ManagerInputContainer, { ErrorList } from './components/ManagerInputContainer';

const root = ReactDOM.createRoot(document.getElementById('root')!);

export let resultURL = 'https://mdl4.syktsu.ru/practice-backend/manager/students';
export let coursesURL = 'https://mdl4.syktsu.ru/practice-backend/manager/courses';

const addError = (errorType: number, errors: ErrorList[], string?: string) => {
  if (errorType === 100) {
    // Пустое поле ввода
    errors.push({
      id: Math.floor(Math.random() * 10000),
      errorType: errorType,
      errorMessage: `Заполните поле ввода`
    })
  } else if (errorType === 101) {
    // Выберите курс
    errors.push({
      id: Math.floor(Math.random() * 10000),
      errorType: errorType,
      errorMessage: `Выберите курс`
    })
  } else if (errorType === 102) {
    // Неправильный формат данных
    errors.push({
      id: Math.floor(Math.random() * 10000),
      errorType: errorType,
      errorMessage: `Неправильный формат данных: ${string}`
    })
  } else if (errorType === 103) {
    // Неправильный формат почты
    errors.push({
      id: Math.floor(Math.random() * 10000),
      errorType: errorType,
      errorMessage: `Неправильный формат почты: ${string}`
    })
  } else if (errorType === 104) {
    // Неправильный формат номера
    errors.push({
      id: Math.floor(Math.random() * 10000),
      errorType: errorType,
      errorMessage: `Неправильный формат номера: ${string}`
    })
  } else if (errorType === 200) {
    // Возможно неправильно
    errors.push({
      id: Math.floor(Math.random() * 10000),
      errorType: errorType,
      errorMessage: `Возможно неправильный ввод данных: ${string} | Желаете продолжить?`
    })
  } else if (errorType === 201) {
    // Пользователи были добавлены успешно, кроме следующих
    errors.push({
      id: Math.floor(Math.random() * 10000),
      errorType: errorType,
      errorMessage: `Все пользователи были успешно добавлены, кроме уже существующих: \n${string}`  
    })
  } else if (errorType === 300) {
    // Успешно
    errors.push({
      id: Math.floor(Math.random() * 10000),
      errorType: errorType,
      errorMessage: `Пользователи были добавлены успешно!`
    })
  }
}

export interface ResponseData {
  inputString: string
  selectValue: string
  teacher: boolean
}

export class FetchRequests {
  async getCourses(URL: string) {
    let result = await fetch(URL)
      .then(response => response.json())
      .then(data => data)
      .catch(err => console.log(err))

    console.log(result)
    return result
  }
  async addStudents(URL: string, body: ResponseData) {
    let result = await fetch(URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body) 
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err))
    console.log(result)
    return result
  }
}

const fetchRequestsInstance = new FetchRequests();


root.render(
  <React.StrictMode>
    <main className={styles.container}>
      <ManagerInputContainer addError={addError} fetchRequests={fetchRequestsInstance}/>
    </main>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
