import styles from '../App.module.css';
import React, { useEffect, useState } from 'react';
import { ManagerInputProps } from './ManagerInputContainer';
import { coursesURL, resultURL } from '..';
let unique = require('unique-array-objects');

interface Course {
    course_id: number;
    fullname: string;
    shortname: string;
}

interface Category {
    category_id: number;
    category: string;
    courses: Course[];
}

const ManagerInput: React.FC<ManagerInputProps> = (
    {
        stringChanger, setTeacher, teacher, setSelectValue,
        errorMessages, fetchRequests,
        responseData, setErrorMessages, setStudents, students
    }) => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchResult = await fetchRequests.getCourses(coursesURL);
                setCategories(fetchResult);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchData();
    }, [fetchRequests]);

    useEffect(() => {
        if (selectedCategory) {
            const selectedCategoryData = categories.find(category => category.category_id.toString() === selectedCategory);
            setCourses(selectedCategoryData ? selectedCategoryData.courses : []);
        } else {
            setCourses([]);
        }
    }, [selectedCategory, categories]);

    const sendSecondRequest = () => {
        if (!(errorMessages.filter((el) => el.errorType === 200).length === errorMessages.length)) {
            alert('Исправьте другие ошибки');
            return;
        }
        fetchRequests.addStudents(resultURL, responseData)
            .then(data => console.log(data));
        setErrorMessages([]);
    };

    return (
        <main className={styles.container}>
            <div className={styles.wrapper}>
                {errorMessages.map((error, i) => {
                    if (error.errorType >= 200) {
                        return null;
                    }
                    return <div key={i} className={styles.error}>{error.errorMessage}</div>;
                })}
                {errorMessages.map((error, i) => {
                    if (error.errorType < 200) {
                        return null;
                    } else if (error.errorType === 201) {
                        return <div key={i} className={styles.error + ' ' + styles.confirm}>{error.errorMessage}</div>;
                    } else if (error.errorType === 300) {
                        return <div key={i} className={styles.error + ' ' + styles.complete}>{error.errorMessage}</div>;
                    }
                    console.log(error);
                    return <div key={i} className={styles.error + ' ' + styles.confirm}>{error.errorMessage} <button onClick={sendSecondRequest}>Продолжить</button></div>;
                })}
                <h2>Заголовок</h2>
                <select onChange={(e) => setSelectedCategory(e.target.value)} className={styles.dropMenu}>
                    <option disabled selected>Выберите категорию</option>
                    {categories.map((category) => (
                        <option key={category.category_id} value={category.category_id}>{category.category}</option>
                    ))}
                </select>

                <select onChange={(e) => setSelectValue(e.target.value)} className={styles.dropMenu}>
                    <option disabled selected>Выберите курс</option>
                    {courses.map((course) => (
                        <option key={course.course_id} value={course.shortname}>{course.fullname}</option>
                    ))}
                </select>

                <div className={styles.teacher}>
                    <input type="checkbox" name='teacher' checked={teacher} onChange={(e) => setTeacher(e.target.checked)} />
                    <label htmlFor="teacher"> Преподаватели</label>
                </div>
                <h3 className={styles.textareaTitle}>
                    <span>Формат:</span> 
                    <div>Иванов Иван Иванович example@gmail.com 89123456789</div>
                    <div>Егоров Егор Егорович another@mail.ru 89229001234</div>
                </h3>
                <textarea value={students} onChange={(e) => setStudents(e.target.value)} className={styles.textarea} placeholder='Введите данные студентов' />
                <button onClick={() => stringChanger(students)} className={styles.textareaBtn}>Отправить</button>
            </div>
        </main>
    );
};

export default ManagerInput;
