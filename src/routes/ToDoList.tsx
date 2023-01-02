import React, { useEffect, memo, useMemo } from 'react';
import styled from 'styled-components';
import { BsCheckLg } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { MdRemoveCircleOutline } from "react-icons/md";
import { text } from 'node:stream/consumers';
import { selector } from 'recoil';
import Modal from 'react-modal';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useForm } from "react-hook-form";
import axios from 'axios';


const BoardWrappper = styled.div`
    text-align: center;
    margin: auto;
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
    opacity: 0.90;
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
    width: 80%;
    line-height: 1.2;
    margin: 5px;
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

const DeleteScheduleButton = styled(DeleteButton) `
    position: absolute;
    right: 0;
`

const ScheduleLi = styled.li`
    position: relative;
    margin-bottom: 3px;
    padding-bottom: 2px;
    border-bottom: 1px solid rgb(204, 204, 204);
`

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
    // margin-bottom: 20px;
    border: 1px solid #a0a096;
    height: 155px;
    padding: 10px;
    overflow: auto;
`;

const NoScheduleDiv = styled.div`
    text-align: center;
`
const ErrorMessageDiv = styled.div` 
    text-align: start;
    padding-left: 12px;
    color: red;
    font-size: 0.8rem;
    position: absolute;
    bottom: 5px;
    left: 10px;
`

const ScheduleInputWrapper = styled.div`
    position: absolute;
    bottom: 20px;
    left: 15px;
    width: 96.2%;
`


interface toDoItemProps {
    text: string; 
    isComplished: boolean;
};

interface scheduleProps {
    date: string;
    content: string;
}

function ToDoList() {
    const { register, handleSubmit, watch, formState: {errors}, setError, setValue, getValues } = useForm<scheduleProps>();

    const [taskList, setTaskList] = React.useState<toDoItemProps[]>([]);
    const [newTask, setNewTask] = React.useState<toDoItemProps>({text: '', isComplished: false});
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isCalendarModalOpen, setIsCalendarModalOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [scheduleItem, setScheduleItem] = React.useState<scheduleProps>({date: '', content: ''});
    const [scheduleList, setScheduleList] = React.useState<scheduleProps[]>([]);
    const [selectedDateScheduleList, setSelectedDateScheduleList] = React.useState<scheduleProps[]>([]);
    const [showEmptyError, setShowEmptyError] = React.useState(false);
    const [showExistingItemError, setShowExistingItemError] = React.useState(false);

    interface testItemProps {
        id: number;
        text: string; 
        isComplished: number;
        date: string;
    };
    const [test, setTest] = React.useState<testItemProps[]>([]);
    const [reloadData, setReloadData] = React.useState(false);

    useEffect(() => {
        (async() => {
            const res = await axios.get('/api/todolist');
            console.log("res?!: ", res);

            const _inputData = await res.data.products.map((rowData : testItemProps) => (
                {
                    id : rowData.id,
                    text : rowData.text,
                    isComplished : rowData.isComplished,
                    date: rowData.date.toString().substring(0, 10),
                }
            ));
            console.log("_inputData:", _inputData);
            setTest(_inputData);
        })()
        // axios.get('/api/test')
        //   .then(res => console.log("res??: ", res))
        //   .catch()
      }, [reloadData]);

    useEffect(() => {
        setSelectedDateScheduleList(
            scheduleList.filter(element => Intl.DateTimeFormat('kr').format(selectedDate) == element.date)
        )
    }, [selectedDate, scheduleList]); 
    
    const ErrorMessage = useMemo(()=>{
        return <>{showEmptyError? "내용을 입력하세요." 
                    : showExistingItemError? "해당 항목은 이미 존재합니다." : ""}</>;
    }, [showEmptyError, showExistingItemError]);

    const onChange = (event: any) => {
        setNewTask({
            text: event.target.value,
            isComplished: false,
        });
    };


    const addNewItem = () => {
        setTaskList([...taskList, newTask]);
        setNewTask({
            text: '',
            isComplished: false,
        });
        console.log(taskList);
    };

    const addNewSchedule = () => {
        console.log("watch?: ", watch());
        setScheduleList ([...scheduleList, {
            date: getValues("date"),
            content: getValues("content"),
        }]);
        console.log("scheduleList?@: ", scheduleList);
        setValue("content", '');
    };

    const checkValidation = () => {
        var flag = false;

        if(newTask.text.replace(/(\s*)/g, "") == "") {
            console.log("newTask.text: ", newTask.text);
            setShowEmptyError(true);
            return true;
        } else {
            taskList.forEach((taskItem) => {
                console.log("taskItem: ", taskItem.text);
                if(taskItem.text.trim() == newTask.text.trim()) {
                    setShowEmptyError(false);
                    setShowExistingItemError(true);
                    flag = true;
                    return false;
                }
            })
        }
        
        return flag; 
    };


    const checkExistingScheduleItem = () => {
        var flag = false;
        
        selectedDateScheduleList.forEach((taskItem) => {
            if(taskItem.content.trim() == getValues("content").trim()) {
                flag = true;
                return false;
            }
        })
        return flag;
    };
        
    const handleOnKeyPress = (e: { key: string; }) => {
        if (e.key === 'Enter') {// Enter 입력이 되면 클릭 이벤트 실행
            
            if(!checkValidation())
                addNewItem(); 
            else setIsModalOpen(true);
        }
    };

    const onValid = (data: any) => {
        console.log("onValid 진입");
        setValue("date", Intl.DateTimeFormat('kr').format(selectedDate));
        if(checkExistingScheduleItem()) {
            setError("content", { message: "해당 항목은 이미 존재합니다."}); 
        } else addNewSchedule();
    }


    const onComplish = (selectedTask : testItemProps) => {
        // const currentTaskList = taskList;

        const sql = "UPDATE `todolist`.`dailytodolist_table` SET `isComplished` = ? WHERE `id` = ?";
        const params = selectedTask.isComplished == 0 ? [1, selectedTask.id] : [0, selectedTask.id];
        
        axios.post('/api/updateTodolist', {
            sql: sql,
            params : params
          })
        .then(res => setReloadData(!reloadData))
        .catch()
        // currentTaskList.map(task => {
        //     if(task.text == selectedTask.text)
        //         task.isComplished = !task.isComplished; 
        // });

        // setTaskList([...currentTaskList]);
        //이 시점에서 useEffect 다시 돌릴 변수 setState
        // console.log("currentTaskList: ", currentTaskList);
    };


    const onRemove = (selectedTask : toDoItemProps) => {
        setTaskList(
            taskList.filter(task => {
            return task.text !== selectedTask.text;
          })
        );
      };

    const onRemoveSchedule = (selectedItem : scheduleProps ) => {
        setScheduleList(
            scheduleList.filter(task => {
                return (task.content != selectedItem.content) || (task.date != selectedItem.date);
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
    const menuList = test.map((task) => {
    // const menuList = taskList.map((task) => {
        if(task.isComplished) complishedItemCount++;

        return (
            <TaskItem className={task.isComplished? "complished-item" : ''}>
                {task.text}  
                <span>
                    <CompleteButton
                        onClick={() => onComplish(task)}
                    ><BsCheckLg/></CompleteButton>
                    <DeleteButton
                        // onClick={() => onRemove(task)}
                    ><MdRemoveCircleOutline/></DeleteButton>
                </span>
            </TaskItem>
            );
    })

    const scheduleItemList = selectedDateScheduleList.map((item) => {
        return (
            <ScheduleLi>{item.content}
            <span>
            <DeleteScheduleButton
                onClick={() => onRemoveSchedule(item)}
            ><MdRemoveCircleOutline/></DeleteScheduleButton>
            </span>
            </ScheduleLi>
        );
    });


    return(
        <>
            <Modal className="modal-component" isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                {ErrorMessage}
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
                        {scheduleItemList}<br/> 
                        <NoScheduleDiv>
                            {selectedDateScheduleList.length == 0 ? <><br/>일정이 없습니다.<br/></> : ""}
                        </NoScheduleDiv>    
                    </ScheduleBox>
                    <ScheduleInputWrapper>
                        <form onSubmit={handleSubmit(onValid)}>
                            <CustomInput
                                {...register("content", {
                                    required: "내용을 입력해주세요.",
                                    pattern: {
                                        value:  /[^\s]/,
                                        message: "내용을 입력해주세요."
                                    }
                                })} 
                                type="String"
                            />
                            <button type='submit'>추가</button>
                        </form>
                        </ScheduleInputWrapper>
                    <ErrorMessageDiv><>{errors?.content?.message}</></ErrorMessageDiv>
                </Modal>
            </BoardWrappper>
        </>
    );
}

export default ToDoList;

