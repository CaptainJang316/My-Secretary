import React from 'react';
import styled from 'styled-components';
import { BsCheckLg } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { MdRemoveCircleOutline } from "react-icons/md";
import { text } from 'node:stream/consumers';
import { selector } from 'recoil';
import Modal from 'react-modal';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const BoardWrappper = styled.div`
    text-align: center;
    margin: auto;
    background-color: black;
    height: 40.2rem;
    // opacity: 0.2;
`;

const Board = styled.div`
    margin: 50px 50px 15px 50px;
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

const BoardTitle = styled.h3`
    margin-top: 0px;
`

const ModalButton = styled.button`
    position: absolute;
    padding: 0;
    background-color: black;
    top: 2px;
    right: 2px;
    width: 16.5px;
    height: 16.5px;
    border-radius: 2px;

    &:hover {
        cursor:pointer;
    }
`

const WhiteIoClose = styled(IoClose)`
    color: white;
`;

const CalendarButton = styled.button`
    margin-left: 220px;
`

const ScheduleBox = styled.div`
    margin-top: 10px;
    border: 1px solid #a0a096;
    height: 175px;
    padding: 10px;
`;

interface toDoItemProps {
    text: string;
    isComplished: boolean;
};

function ToDoList() {
    const [taskList, setTaskList] = React.useState<toDoItemProps[]>([]);
    const [newTask, setNewTask] = React.useState<toDoItemProps>({text: '', isComplished: false});
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isCalendarModalOpen, setIsCalendarModalOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date());

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

    const checkValidation = () => {
        var flag = false;

        taskList.forEach((taskItem) => {
            console.log("taskItem: ", taskItem.text);
            console.log("newTask: ", newTask.text);
            if(taskItem.text == newTask.text) {
                flag = true;
                return false;
            }
        })
        return flag;
    };
        
    const handleOnKeyPress = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            if(!checkValidation())
                addNewItem(); // Enter 입력이 되면 클릭 이벤트 실행
            else setIsModalOpen(true);
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

    const getDay = () => { 

        const week = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = week[new Date().getDay()];
        var date = new Date();
        const getDay = date.getMonth()+1 + "/" + date.getDate() + "(" + dayOfWeek + ")";

        return getDay;
    }

    const onClickCloseModalButton = () => {
        setIsModalOpen(false);
        setIsCalendarModalOpen(false);
    }

    const onClickCalendarButton = () => {
        setIsCalendarModalOpen(true);
    }
    
    
    console.log();

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
        <>
            <Modal className="modal-component" isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                해당 항목은 이미 존재합니다.
                <ModalButton onClick={onClickCloseModalButton}>
                    <WhiteIoClose/>
                </ModalButton>
            </Modal>
            <BoardWrappper>
                <Board>
                    <BoardTitle>{getDay()} - ToDoList</BoardTitle>
                    new: <CustomInput 
                        type="String"
                        value={newTask.text}
                        onKeyPress={handleOnKeyPress}
                        onChange={onChange}
                        />
                    {menuList}
                    <Progress className={complishedItemCount == taskList.length? "completion" : ""}>{taskList.length != 0? (complishedItemCount / taskList.length * 100).toFixed(1)+" %" : ""}</Progress>
                    <ProgressBar value={(complishedItemCount / taskList.length * 100).toFixed(0)} max="100"></ProgressBar>
                </Board>
                <div>
                    <CalendarButton onClick={onClickCalendarButton}>일정</CalendarButton>
                </div>
                <Modal className="calendar-modal-component" isOpen={isCalendarModalOpen} onRequestClose={() => setIsCalendarModalOpen(false)}>
                    <Calendar className="calendar" value={selectedDate} onChange={setSelectedDate}/>
                    <ModalButton onClick={onClickCloseModalButton}>
                        <WhiteIoClose/>
                    </ModalButton>
                    <ScheduleBox>
                        일정이 없습니다.
                    </ScheduleBox>
                </Modal>
            </BoardWrappper>
        </>
    );
}

export default ToDoList;