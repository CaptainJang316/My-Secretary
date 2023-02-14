import axios from 'axios';
import React, { useEffect, memo, useMemo } from 'react';

interface toDoItemProps {
    id: number;
    text: string; 
    isComplished: boolean;
    date: string;
};

interface feedBackProps {
    goodPoint: string; 
    badPoint: string;
};

function useToDoList(currentDate:string, taskList:toDoItemProps[]) {
    const [taskInputValue, setTaskInputValue] = React.useState("");
    const [reloadData, setReloadData] = React.useState(false);
    const [showEmptyError, setShowEmptyError] = React.useState(false);
    const [showExistingItemError, setShowExistingItemError] = React.useState(false);

    const [goodPointInputValue, setGoodPointInputValue] = React.useState("");
    const [badPointInputValue, setBadPointInputValue] = React.useState("");
    const [feedBack, setFeedBack] = React.useState<feedBackProps>();
    // const [editFeedBackflag, setEditFeedBackflag] = React.useState(false);

    const onChangeFeedBackGP = (event: any) => {
        console.log("onChangeFeedBackGP!");
        setGoodPointInputValue(event.target.value);
    }

    const onChangeFeedBackBP = (event: any) => {
        setBadPointInputValue(event.target.value);
    }

    const onChange = (event: any) => {
        setTaskInputValue(event.target.value);
    };

    const submitFeedBack = (isEdit : boolean) => {
        const params = [goodPointInputValue, badPointInputValue, currentDate];

        if(isEdit) {
            axios.post('/api/updateFeedBack', {
                params : params
            })
            .then(res => {
                console.log("update - res: ", res);
                setReloadData(!reloadData);
                setTaskInputValue("");
            })
            .catch();
        } else {
            axios.post('/api/addNewFeedBack', {
                params : params
            })
            .then(res => {
                console.log("add - res: ", res);
                setReloadData(!reloadData);
                setTaskInputValue("");
            })
            .catch();
        }
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


    const getFeedBackData = async() => {
        const feedBackResponse = await axios.get(`/api/feedback/${currentDate}`);
        
        let feedBackData : feedBackProps;
        if(feedBackResponse.data.products && feedBackResponse.data.products.length != 0) {
            feedBackData = {
                goodPoint: feedBackResponse.data.products[0].goodPoint,
                badPoint: feedBackResponse.data.products[0].badPoint
            }
            setFeedBack(feedBackData);

            setGoodPointInputValue(feedBackResponse.data.products[0].goodPoint);
            setBadPointInputValue(feedBackResponse.data.products[0].badPoint);
        } else setFeedBack(undefined);
    }


    return {
        reloadData,
        taskInputValue,
        checkValidation, 
        addNewItem, 
        onComplish, 
        onRemove,  
        onChange,
        feedBack,
        getFeedBackData,
        goodPointInputValue,
        badPointInputValue,
        onChangeFeedBackGP,
        onChangeFeedBackBP,
        submitFeedBack,
        ErrorMessage
    }
};


export default useToDoList;