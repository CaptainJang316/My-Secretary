import React, { useEffect, memo, useMemo } from 'react';
import styled from 'styled-components';
import { BsCheckLg } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
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
    background: black;
    color: white;
`
const CalendarInput = styled.input`
    box-sizing : border-box; 
    width: 80.5%;
    line-height: 1.2;
    margin-left: 8px;
    margin-right: 3px;
    background: black;
    color: white;
`

const TaskItem = styled.span`
    border-bottom: solid 1px lavender;
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
    position: relative;
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
    height: 122px;
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
    bottom: 4px;
    left: 10px;
`

const ScheduleInputWrapper = styled.div`
    position: absolute;
    bottom: 22px;
    left: 12px;
    width: 97%;
`

const CustomIoMdArrowDropleft = styled(IoMdArrowDropleft)`  
    position: absolute;
    left: 6px;
    top: -3px;
    font-size: 2rem;
`;
const CustomIoMdArrowDropright = styled(IoMdArrowDropright)`
    position: absolute;
    right: 6px;
    top: -3px;
    font-size: 2rem;
`;



interface toDoItemProps {
    id: number;
    text: string; 
    isComplished: boolean;
    date: string;
};

// interface taskInputProps {
//     text: string; 
// };

// interface scheduleProps {
//     date: string;
//     content: string;
// }

function ToDoList() {
    const { register, handleSubmit, watch, formState: {errors}, setError, setValue, getValues } = useForm<scheduleProps>();

    // const [taskList, setTaskList] = React.useState<toDoItemProps[]>([]);
    const [newTask, setNewTask] = React.useState<toDoItemProps>();
    const [taskInputValue, setTaskInputValue] = React.useState("");
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isCalendarModalOpen, setIsCalendarModalOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    // const [scheduleItem, setScheduleItem] = React.useState<scheduleProps>();
    // const [scheduleList, setScheduleList] = React.useState<scheduleProps[]>([]);
    // const [selectedDateScheduleList, setSelectedDateScheduleList] = React.useState<scheduleProps[]>([]);
    const [showEmptyError, setShowEmptyError] = React.useState(false);
    const [showExistingItemError, setShowExistingItemError] = React.useState(false);
    // const [taskCount, setTaskCount] = React.useState(0);

    const [taskList, setTaskList] = React.useState<toDoItemProps[]>([]);
    const [reloadData, setReloadData] = React.useState(false);
    const [yesterdayFlag, setYesterdayFlag] = React.useState(false);
    const [tomorrowFlag, setTomorrowFlag] = React.useState(false);
    const [currentDate, setCurrentDate] = React.useState("");

    const getCurrentDate = (dateData = new Date) => {
        const date = dateData;
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let mm = month >= 10 ? month : '0' + month;
        let dd = day >= 10 ? day : '0' + day;

        return date.getFullYear() + '-' + mm + '-' + dd;
    }

    useEffect(() => {
        const today = getCurrentDate();
        setCurrentDate(today);
        // console.log("today: ", currentDate);
    }, [])

    useEffect(() => {
        (async() => {
            const res = await axios.get('/api/getDateData');

            const selectedDate = new Date(currentDate);
            const today = new Date();

            await res.data.products.map(function(date : any) {
                const DateOfCurrentData = new Date(date.date);
                if(!yesterdayFlag && DateOfCurrentData < selectedDate) {
                    setYesterdayFlag(true);
                }
                if(!tomorrowFlag && selectedDate < today) {
                    setTomorrowFlag(true);
                }
            });
        })()
    }, [currentDate]);

    useEffect(() => {
        (async() => {
            const res = await axios.get(`/api/todolist/${currentDate}`);

            const toDoListData = await res.data.products && res.data.products.map((rowData : toDoItemProps) => (
                {
                    id : rowData.id,
                    text : rowData.text,
                    isComplished : rowData.isComplished,
                    date: rowData.date,
                }
            ));

            setTaskList(toDoListData);
        })()
      }, [reloadData, currentDate]);

    
    interface scheduleProps {
        id: string,
        text: string,
        date: string,
    }
    const [scheduleList, setScheduleList] = React.useState<scheduleProps[]>([]);
    const [reloadScheduleData, setReloadScheduleData] = React.useState(false);
    useEffect(() => {
        const date = getCurrentDate(selectedDate);
        axios.get(`/api/scheduleList/${date}`)
        .then(async (res) => {
            const scheduleListData = await res.data.products && res.data.products.map((rowData : scheduleProps) => (
                {
                    id : rowData.id,
                    text : rowData.text,
                    date: rowData.date,
                }
            ));
            setScheduleList(scheduleListData);
        });
    }, [reloadScheduleData])

    // useEffect(() => {
    //     setSelectedDateScheduleList(
    //         scheduleList.filter(element => Intl.DateTimeFormat('kr').format(selectedDate) == element.date)
    //     )
    // }, [selectedDate, scheduleList]); 
    
    const ErrorMessage = useMemo(()=>{
        return <>{showEmptyError? "????????? ???????????????." 
                    : showExistingItemError? "?????? ????????? ?????? ???????????????." : ""}</>;
    }, [showEmptyError, showExistingItemError]);


      
    const onChange = (event: any) => {
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


    const getYesterDayData = () => {
        let date = new Date(currentDate);
        date.setDate(date.getDate() - 1);
        const result = getCurrentDate(date);    
        setCurrentDate(result);
        setYesterdayFlag(false);
    };
    const getTomorrowData = () => {
        let date = new Date(currentDate);
        date.setDate(date.getDate() + 1);
        const result = getCurrentDate(date); 
        setCurrentDate(result)
        setTomorrowFlag(false);
    };


    const onValid = (data: any) => {
        // setValue("date", Intl.DateTimeFormat('kr').format(selectedDate));
        setValue('date', getCurrentDate(selectedDate))
        if(checkExistingScheduleItem()) {
            setError("text", { message: "?????? ????????? ?????? ???????????????."}); 
        } 
        else addNewSchedule();
    }

    const checkExistingScheduleItem = () => {
        var flag = false;
        
        scheduleList.forEach((taskItem) => {
            if(taskItem.text.trim() == getValues("text").trim()) {
                flag = true;
                return false;
            }
        })
        return flag;
    };

    const addNewSchedule = () => {
        console.log("watch?: ", watch());
        // setScheduleList ([...scheduleList, {
        //     date: getValues("date"),
        //     content: getValues("content"),
        // }]);
        const text = getValues('text');
        const date = getValues('date');
        const params = [text, date];
        axios.post("/api/addNewScheduleItem", {
            params: params
        }).then(() => {
            setValue("text", '');
            setReloadScheduleData(!reloadScheduleData);
        })
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

        
    const handleOnKeyPress = (e: { key: string; }) => {
        if (e.key === 'Enter') {// Enter ????????? ?????? ?????? ????????? ??????
            
            if(!checkValidation())
                addNewItem(); 
            else setIsModalOpen(true);
        }
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


    const onRemoveSchedule = (selectedItem : scheduleProps ) => {
        axios.post("api/deleteScheduleItem", {
            params: selectedItem.id
        }).then(res => setReloadScheduleData(!reloadScheduleData));

        // setScheduleList(
        //     scheduleList.filter(task => {
        //         return (task.content != selectedItem.content) || (task.date != selectedItem.date);
        //     })
        // );
    };


    const getDay = () => { 

        const week = ['???', '???', '???', '???', '???', '???', '???'];
        const dayOfWeek = week[new Date(currentDate).getDay()];
        var date = new Date(currentDate);
        const getDay = date.getMonth()+1 + "/" + date.getDate() + "(" + dayOfWeek + ")";

        return getDay;
    }

    const onClickCloseModalButton = () => {
        setIsModalOpen(false);
        setIsCalendarModalOpen(false);
    }

    const onClickCalendarButton = () => {
        setReloadScheduleData(!reloadScheduleData);
        setIsCalendarModalOpen(true)
    }

    const changeCalendarDate = (changedValue: any) => {
        setSelectedDate(changedValue);
        setReloadScheduleData(!reloadScheduleData);
    }
    

    var complishedItemCount = 0;
    const toDoList = taskList && taskList.map((task) => {
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
                        onClick={() => onRemove(task)}
                    ><MdRemoveCircleOutline/></DeleteButton>
                </span>
            </TaskItem>
            );
    })

    // const scheduleItemList = selectedDateScheduleList.map((item) => {
    const scheduleItemList = scheduleList.map((item) => {
        return (
            <ScheduleLi>{item.text}
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
                    <BoardTitle>
                        {yesterdayFlag? <CustomIoMdArrowDropleft
                            onClick={getYesterDayData}
                        /> : <></>}
                        {getDay()} - ToDoList
                        {tomorrowFlag? <CustomIoMdArrowDropright
                            onClick={getTomorrowData}
                        /> : <></>}
                    </BoardTitle>
                    new: <CustomInput 
                        type="String"
                        value={taskInputValue}
                        onKeyPress={handleOnKeyPress}
                        onChange={onChange}
                        />
                    {toDoList}
                    {taskList == undefined? "" : <Progress className={complishedItemCount == taskList.length? "completion" : ""}>{taskList.length != 0? (complishedItemCount / taskList.length * 100).toFixed(1)+" %" : ""}</Progress>}
                    <ProgressBar value={taskList == undefined? 0 : (complishedItemCount / taskList.length * 100).toFixed(0)} max="100"></ProgressBar>
                </Board>
                <div>
                    <CalendarButton onClick={onClickCalendarButton}>??????</CalendarButton>
                </div>
                <Modal className="calendar-modal-component" isOpen={isCalendarModalOpen} onRequestClose={() => setIsCalendarModalOpen(false)}>
                    <Calendar className="calendar" value={selectedDate} onChange={changeCalendarDate}/>
                    <ModalButton onClick={onClickCloseModalButton}>
                        <WhiteIoClose/>
                    </ModalButton>
                    <ScheduleBox>
                        {scheduleItemList}<br/> 
                        <NoScheduleDiv>
                            {scheduleList.length == 0 ? <><br/>????????? ????????????.<br/></> : ""}
                        </NoScheduleDiv>    
                    </ScheduleBox>
                    <ScheduleInputWrapper>
                        <form onSubmit={handleSubmit(onValid)}>
                            <CalendarInput
                                {...register("text", {
                                    required: "????????? ??????????????????.",
                                    pattern: {
                                        value:  /[^\s]/,
                                        message: "????????? ??????????????????."
                                    }
                                })} 
                                type="String"
                            />
                            <button type='submit'>??????</button>
                        </form>
                        </ScheduleInputWrapper>
                    <ErrorMessageDiv><>{errors?.text?.message}</></ErrorMessageDiv>
                </Modal>
            </BoardWrappper>
        </>
    );
}

export default ToDoList;

