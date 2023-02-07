import axios from 'axios';
import React, { useEffect, memo, useMemo } from 'react';

interface toDoItemProps {
    id: number;
    text: string; 
    isComplished: boolean;
    date: string;
};

function useToDoList(currentDate:string, taskList:toDoItemProps[]) {
    const [taskInputValue, setTaskInputValue] = React.useState("");
    const [reloadData, setReloadData] = React.useState(false);
    const [showEmptyError, setShowEmptyError] = React.useState(false);
    const [showExistingItemError, setShowExistingItemError] = React.useState(false);


    const onChange = (event: any) => {
        console.log("onChangeㅇㅇㅇ");
        setTaskInputValue(event.target.value);
    };

    const addNewItem = () => {
        const params = [taskInputValue, false, currentDate];
        axios.post('/api/addNewTask', {
            params : params
        })
        .then(res => {
            setReloadData(!reloadData);
            setTaskInputValue("");
        })
        .catch();
    };

    const checkValidation = () => {
        var flag = false;

        if(taskInputValue.replace(/(\s*)/g, "") == "") {
            setShowEmptyError(true);
            return true;
        } else {
            taskList.forEach((taskItem) => {
                if(taskItem.text.trim() == taskInputValue.trim()) {
                    setShowEmptyError(false);
                    setShowExistingItemError(true);
                    flag = true;
                    return false;
                }
            })
        }
        
        return flag; 
    };


    const onComplish = (selectedTask : toDoItemProps) => {
        // const currentTaskList = taskList;

        const params = selectedTask.isComplished == false ? [true, selectedTask.id] : [false, selectedTask.id];
        
        axios.post('/api/toggleIsComplishTask', {
            params : params
          })
        .then(res => setReloadData(!reloadData))
        .catch()
    };


    const onRemove = (selectedTask : toDoItemProps) => {

        axios.post('/api/deleteTask', {
            params: selectedTask.id
        }).then(() => setReloadData(!reloadData))
        .catch();

        // setTaskList(
        //     taskList.filter(task => {
        //     return task.text !== selectedTask.text;
        //   })
        // );
    };


    const ErrorMessage = useMemo(()=>{
        return <>{showEmptyError? "내용을 입력하세요." 
                    : showExistingItemError? "해당 항목은 이미 존재합니다." : ""}</>;
    }, [showEmptyError, showExistingItemError]);


    return {
        reloadData,
        taskInputValue,
        checkValidation, 
        addNewItem, 
        onComplish, 
        onRemove,  
        onChange,
        ErrorMessage
    }
};


export default useToDoList;