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
import CSSTransition from 'react-transition-group/CSSTransition';
import useToDoList from '../hook/useToDoList';

const BoardWrappper = styled.div`
    text-align: center;
    margin: auto;
    display: flex;
    justify-content: center;
`;

const Board = styled.div`
    margin: 50px 5px 15px 5px;
    padding: 20px;
    pading-bottom: 0px;
    width: 250px;
    height: 30rem; 
    border: 1px solid black;
    border-radius: 10px;
    background-color: #F0F8FF;
    display: inline-block;
    position: relative;
    opacity: 0.90;
`;
const FeedBackBoard = styled(Board)`
    width: 0px;
    margin: 50px 0;
    padding: 0;
    background-color: #fff8dc;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, margin 0.6s, padding 0.3s, width 0.45s, visibility 0.4s;
    text-align: start;
    // font-size: 0;
`

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
    margin-left: 10px;
    padding-top: 4px;
    border-radius: 3px;
    border: none;
    color: green;
`;

const DeleteButton = styled.button`
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
    text-align: center;
`

const FeedbackTopic = styled.li`
    margin: 15px 0;
    // position: relative;
    text-align: start;
    font-weight: bold;
`
const Textarea = styled.textarea`
    width: 97%;
    height: 145px;
    font-size: 14px;
    // font-weight: bold;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    padding: 5px;
    resize: none;
    border: 1px solid #f0e68c;
    border-radius: 5px;
    &: focus {
        outline: 1px solid #ffd700;
    }
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

const BottomButtonListWrapper = styled.div`
    margin: 50px 5px;
    display: block;
    width: 100px;
    text-align: start;
`

const BottomButton = styled.button`
    opacity: 0.8;
    margin-bottom: 10px; 
    width: 70px;
    height: 40px;
    font-weight: bold;
    background-color: white;
    border: none;
    border-radius: 8px;
    color: black;
`

const ScheduleBox = styled.div`
    margin-top: 10px;
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

const SubmitButtonWrapper = styled.div`
    // margin-top: 10px;
    // text-align: center;
    width: 100%;
    position: absolute;
    bottom: 10px;
`
const SubmitButton = styled.input`
    border: none;
    border-radius: 5px;
    padding: 5px;
    width: 91%;
    background-color: #F4C430;

    &:hover {
        background-color: #FFD700;
        font-weight: bold;
    }
` 
const EditButton = styled.input`
    border: none;
    border-radius: 5px;
    padding: 6.3px;
    width: 88.6%;
    background-color: #BDB76B;
    text-align: center;
    color: white;  
    
    &:hover {
        background-color: #228B22;
        font-weight: bold;
        outline: none;
    }
`



interface toDoItemProps {
    id: number;
    text: string; 
    isComplished: boolean;
    date: string;
};

interface scheduleProps {
    id: string,
    text: string,
    date: string,
}

function ToDoList() {

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isCalendarModalOpen, setIsCalendarModalOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [yesterdayFlag, setYesterdayFlag] = React.useState(false);
    const [tomorrowFlag, setTomorrowFlag] = React.useState(false);
    const [currentDate, setCurrentDate] = React.useState("");
    const [scheduleList, setScheduleList] = React.useState<scheduleProps[]>([]);
    const [reloadScheduleData, setReloadScheduleData] = React.useState(false);
    const [feedbackBoardClass, setFeedbackBoardClass] = React.useState("");
    const [editFeedBackflag, setEditFeedBackflag] = React.useState(false);
    const { register, handleSubmit, watch, formState: {errors}, setError, setValue, getValues } = useForm<scheduleProps>();
    const { reloadData, taskList, taskInputValue, checkValidation, getToDoListData, addNewItem, onComplish, onRemove, onChange, feedBack, getFeedBackData, goodPointInputValue, badPointInputValue, onChangeFeedBackGP, onChangeFeedBackBP, submitFeedBack, ErrorMessage } = useToDoList(currentDate);



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

            getFeedBackData();
        })()
    }, [currentDate]);
    
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
    }, [reloadScheduleData]);

    useEffect(() => {
        (async() => {
            getToDoListData();
            getFeedBackData();
            setEditFeedBackflag(false);
        })()
      }, [reloadData, currentDate]);

      console.log("feedBack: ", feedBack);
    // useEffect(() => {
    //     setSelectedDateScheduleList(
    //         scheduleList.filter(element => Intl.DateTimeFormat('kr').format(selectedDate) == element.date)
    //     )
    // }, [selectedDate, scheduleList]); 
        


    const handleOnKeyPress = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            
            if(!checkValidation())
                addNewItem(); 
            else setIsModalOpen(true);
        }
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
            setError("text", { message: "해당 항목은 이미 존재합니다."}); 
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

        const week = ['일', '월', '화', '수', '목', '금', '토'];
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

    const onClickFeedbackButton = () => {
        feedbackBoardClass == "" ? setFeedbackBoardClass("show-board") : setFeedbackBoardClass("");
    }

    const changeCalendarDate = (changedValue: any) => {
        setSelectedDate(changedValue);
        setReloadScheduleData(!reloadScheduleData);
    }
    

    var complishedItemCount = 0;
    const toDoList = taskList && taskList.map((task) => {
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
                <FeedBackBoard className={feedbackBoardClass}>
                    <BoardTitle>
                        Today's Feedback
                    </BoardTitle>
                    <form onSubmit={(event) => submitFeedBack(editFeedBackflag, event)}>
                        <FeedbackTopic>
                            Good Point
                        </FeedbackTopic>
                        {editFeedBackflag? <Textarea
                                value={goodPointInputValue}
                                onChange={onChangeFeedBackGP}
                            />
                            : feedBack? feedBack.goodPoint
                                : <Textarea
                                    value={goodPointInputValue}
                                    onChange={onChangeFeedBackGP}
                                />}
                        <FeedbackTopic>
                            Bad Point
                        </FeedbackTopic>
                        {editFeedBackflag? <Textarea
                                    value={badPointInputValue}
                                    onChange={onChangeFeedBackBP}
                                />
                            : feedBack? feedBack.badPoint
                                : <Textarea
                                    value={badPointInputValue}
                                    onChange={onChangeFeedBackBP}
                                />}
                        <SubmitButtonWrapper>
                            {editFeedBackflag? <SubmitButton type="submit" value="완료" /> 
                                : feedBack? <EditButton onClick={() => setEditFeedBackflag(true)} value="수정하기"/> : <SubmitButton type="submit" value="완료" />}
                        </SubmitButtonWrapper>
                    </form>
                </FeedBackBoard>
                <div>
                    <BottomButtonListWrapper>
                        <BottomButton onClick={onClickFeedbackButton}>{feedbackBoardClass == "" ? "피드백" : "닫기"}</BottomButton>
                        <BottomButton onClick={onClickCalendarButton}>일정</BottomButton>
                    </BottomButtonListWrapper>
                </div>
                <Modal className="calendar-modal-component" isOpen={isCalendarModalOpen} onRequestClose={() => setIsCalendarModalOpen(false)}>
                    <Calendar className="calendar" value={selectedDate} onChange={changeCalendarDate}/>
                    <ModalButton onClick={onClickCloseModalButton}>
                        <WhiteIoClose/>
                    </ModalButton>
                    <ScheduleBox>
                        {scheduleItemList}<br/> 
                        <NoScheduleDiv>
                            {scheduleList.length == 0 ? <><br/>일정이 없습니다.<br/></> : ""}
                        </NoScheduleDiv>    
                    </ScheduleBox>
                    <ScheduleInputWrapper>
                        <form onSubmit={handleSubmit(onValid)}>
                            <CalendarInput
                                {...register("text", {
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
                    <ErrorMessageDiv><>{errors?.text?.message}</></ErrorMessageDiv>
                </Modal>
            </BoardWrappper>
        </>
    );
}

export default ToDoList;

