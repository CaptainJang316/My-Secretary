import React from 'react';
import styled from 'styled-components';
import { BsCheckLg } from "react-icons/bs";
import { MdRemoveCircleOutline } from "react-icons/md";

const BoardWrappper = styled.div`
    text-align: center;
    margin: auto;
    // background-color: black;
    // opacity: 0.2;
`;

const Board = styled.div`
    margin: 50px 50px 50px 50px;
    padding: 20px;
    width: 250px;
    height: 28rem; 
    border: 1px solid black;
    border-radius: 10px;
    background-color: #F0F8FF;
    display: inline-block;
`;

const TaskListOl = styled.ol`
    text-align: start;
`;

const TaskItemLi = styled.li`
    padding-top: 5px;
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

function ToDoList() {
    const [taskList, setTaskList] = React.useState<string[]>([]);
    const [newTask, setNewTask] = React.useState('');

    const onChange = (event: any) => {
        setNewTask(event.target.value);
    };

    const handleOnClick = () => {
        const currentTaskList = taskList;
        currentTaskList.push(newTask)
        setTaskList(currentTaskList);
        setNewTask("");
        console.log(currentTaskList);
    };
        
    const handleOnKeyPress = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            handleOnClick(); // Enter 입력이 되면 클릭 이벤트 실행
        }
    };

    // const onClickDeleteButton = (selectedTask : String) => {
    //     setTaskList.
    // }

    const onRemove = (selectedTask : String) => {
        setTaskList(
            taskList.filter(task => {
            return task !== selectedTask;
          })
        );
      };

    const menuList = taskList.map((task) => (
        <TaskItemLi>
            {task} 
            <CompleteButton><BsCheckLg/></CompleteButton>
            <DeleteButton
                onClick={() => onRemove(task)}
            ><MdRemoveCircleOutline/></DeleteButton>
        </TaskItemLi>
        ));

    return(
        <BoardWrappper>
            <Board>
                new: <input 
                    type="String"
                    value={newTask}
                    onKeyPress={handleOnKeyPress}
                    onChange={onChange}
                    />
                <TaskListOl>
                    {menuList}
                </TaskListOl>
            </Board>
        </BoardWrappper>
    );
}

export default ToDoList;