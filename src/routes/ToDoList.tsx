import React from 'react';
import styled from 'styled-components';
import { BsCheckLg } from "react-icons/bs";
import { MdRemoveCircleOutline } from "react-icons/md";
import { text } from 'node:stream/consumers';
import { selector } from 'recoil';

const BoardWrappper = styled.div`
    text-align: center;
    margin: auto;
    background-color: black;
    // opacity: 0.2;
`;

const Board = styled.div`
    margin: 50px 50px 50px 50px;
    padding: 20px;
    pading-bottom: 0px;
    width: 250px;
    height: 28rem; 
    border: 1px solid black;
    border-radius: 10px;
    background-color: #F0F8FF;
    display: inline-block;
    position: relative;
`;

const Progress = styled.span`
    position: absolute;
    right: 20px;
    bottom: 20px;
    font-size: 1.2rem;
`
const ProgressBar = styled.progress`
    position: absolute;
    left: 0px;
    bottom: -1px;
    padding: 0px;
    margin: 0px;
    width: 100%;

    appearance: none;
    &::-webkit-progress-bar {
        background:#f0f0f0;
        border-radius:0px 0px 10px 10px;
        box-shadow: inset 3px 3px 10px #ccc;
    }
    &::-webkit-progress-value {
        border-radius:0px 10px 10px 10px;
        background: #1D976C;
        background: -webkit-linear-gradient(to right, #93F9B9, #1D976C);
        background: linear-gradient(to right, #93F9B9, #1D976C);
    }
`

const CustomInput = styled.input`
    box-sizing : border-box;
    margin-bottom: 15px;
    width: 85%;
`

const TaskItem = styled.span`
    border-bottom: solid 1px white;
    padding-bottom: 5px;
    padding-top: 12px;
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const CompleteButton = styled.button`
    // width: 10px;
    // height: 10px;
    margin-left: 10px;
    padding-top: 4px;
    border-radius: 3px;
    border: none;
    color: green;
`;

const DeleteButton = styled.button`
    // width: 10px;
    // height: 10px;
    margin-left: 5px;
    padding-top: 4px;
    border-radius: 3px;
    border: none;
    color: red;
`;

interface toDoItemProps {
    text: string;
    isComplished: boolean;
};

function ToDoList() {
    const [taskList, setTaskList] = React.useState<toDoItemProps[]>([]);
    const [newTask, setNewTask] = React.useState<toDoItemProps>({text: '', isComplished: false});

    const onChange = (event: any) => {
        setNewTask({
            text: event.target.value,
            isComplished: false,
        });
    };

    const addNewItem = () => {
        // const currentTaskList = taskList;
        // currentTaskList.push(newTask)
        setTaskList([...taskList, newTask]);
        setNewTask({
            text: '',
            isComplished: false,
        });
        console.log(taskList);
    };
        
    const handleOnKeyPress = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            addNewItem(); // Enter 입력이 되면 클릭 이벤트 실행
        }
    };

    const onComplish = (selectedTask : toDoItemProps) => {
        const currentTaskList = taskList;
        currentTaskList.map(task => {
            if(task.text == selectedTask.text)
                task.isComplished = !task.isComplished; 
        });
        setTaskList([...currentTaskList]);
        console.log("currentTaskList: ", currentTaskList);
    };


    const onRemove = (selectedTask : toDoItemProps) => {
        setTaskList(
            taskList.filter(task => {
            return task.text !== selectedTask.text;
          })
        );
      };

    var complishedItemCount = 0;
    const menuList = taskList.map((task) => {
        if(task.isComplished) complishedItemCount++;

        return (
            <TaskItem className={task.isComplished? "complished-item" : ''}>
                {task.text} 
                <span>
                    <CompleteButton
                        onClick={() => onComplish(task)}
                    ><BsCheckLg/></CompleteButton>
                    <DeleteButton
                        onClick={() => onRemove(task)}
                    ><MdRemoveCircleOutline/></DeleteButton>
                </span>
            </TaskItem>
            );
    })

    return(
        <BoardWrappper>
            <Board>
                new: <CustomInput 
                    type="String"
                    value={newTask.text}
                    onKeyPress={handleOnKeyPress}
                    onChange={onChange}
                    />
                {menuList}
                <Progress className={complishedItemCount == taskList.length? "completion" : ""}>{(complishedItemCount / taskList.length * 100).toFixed(1)} %</Progress>
                <ProgressBar value={(complishedItemCount / taskList.length * 100).toFixed(0)} max="100"></ProgressBar>
            </Board>
        </BoardWrappper>
    );
}

export default ToDoList;