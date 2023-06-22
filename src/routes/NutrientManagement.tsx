import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const DashBoard = styled.div`
    text-align: center;
    background-color: white;
    height: 100%;
    padding-top: 30px;    
`

const Board = styled.div`
    border: solid 1px lightgray;
    border-radius: 10px;
    margin: 0px 30px;
    padding: 20px;
    height: 120px;
    text-align: center;
`

const InputBoxWrapper = styled.div`
    width: 200px;
    display: inline;
    vertical-align: top;
`

const InputBox = styled.div`
    display: inline-block;
    padding: 0px 30px 0px 10px;
    vertical-align: top;
    text-align: start;
`

const InputLabel = styled.label`
    font-weight: bold;
`

const TextInput = styled.input`
    width: 100px;
`

const SearchButton = styled.button`
    border: solid 1px gray;
    border-radius: 6px;
`


function NutrientManagement() {
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedExerciseAmountOption, setSelectedExerciseAmountOption] = useState('');
    const [selectedPurposeOption, setSelectedPurposeOption] = useState('');
    const [tall, setTall] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');


    const handleChangeRadio = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const handleChangeRadioExerciseAmount = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedExerciseAmountOption(event.target.value);
    };

    const handleChangeRadioPurpose = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedPurposeOption(event.target.value);
    };

    const handleChangeTall = (event: ChangeEvent<HTMLInputElement>) => {
        setTall(event.target.value);
    };

    const handleChangeWeight = (event: ChangeEvent<HTMLInputElement>) => {
        setWeight(event.target.value);
    };

    const handleChangeAge = (event: ChangeEvent<HTMLInputElement>) => {
        setAge(event.target.value);
    };


      


    return (
        <DashBoard>
            <Board>
                <InputBoxWrapper>
                    <InputLabel>성별 :</InputLabel>
                    <InputBox>
                        <label>
                            <input
                                type='radio'
                                value="male"
                                checked={selectedOption == "male"}
                                onChange={handleChangeRadio}
                            />
                        </label> Male<br/>
                        <label>
                            <input
                                type='radio'
                                value="female"
                                checked={selectedOption == "female"}
                                onChange={handleChangeRadio}
                            />
                        </label> Female
                    </InputBox>
                </InputBoxWrapper>
                <InputBoxWrapper>
                    <InputLabel>키 :</InputLabel>
                    <InputBox>
                        <TextInput type="text" value={tall} onChange={handleChangeTall} />
                    </InputBox>
                </InputBoxWrapper>
                <InputBoxWrapper>
                    <InputLabel>체중 :</InputLabel>
                    <InputBox>
                        <TextInput type="text" value={weight} onChange={handleChangeWeight} />
                    </InputBox>
                </InputBoxWrapper>
                <InputBoxWrapper>
                    <InputLabel>나이 :</InputLabel>
                    <InputBox>
                        <TextInput type="text" value={age} onChange={handleChangeAge} />
                    </InputBox>
                </InputBoxWrapper>
                <InputBoxWrapper>
                    <InputLabel>운동량 :</InputLabel>
                    <InputBox>
                        <label>
                            <input
                                type='radio'
                                value="적음"
                                checked={selectedExerciseAmountOption == "적음"}
                                onChange={handleChangeRadioExerciseAmount}
                            />
                        </label> 적음<br/>
                        <label>
                            <input
                                type='radio'
                                value="보통"
                                checked={selectedExerciseAmountOption == "보통"}
                                onChange={handleChangeRadioExerciseAmount}
                            />
                        </label> 보통<br/>
                        <label>
                            <input
                                type='radio'
                                value="많음"
                                checked={selectedExerciseAmountOption == "많음"}
                                onChange={handleChangeRadioExerciseAmount}
                            />
                        </label> 많음
                    </InputBox>
                </InputBoxWrapper>
                <InputBoxWrapper>
                    <InputLabel>목표 :</InputLabel>
                    <InputBox>
                    <label>
                            <input
                                type='radio'
                                value="체중 감량"
                                checked={selectedPurposeOption == "체중 감량"}
                                onChange={handleChangeRadioPurpose}
                            />
                        </label> 체중 감량<br/>
                        <label>
                            <input
                                type='radio'
                                value="체중 유지"
                                checked={selectedPurposeOption == "체중 유지"}
                                onChange={handleChangeRadioPurpose}
                            />
                        </label> 체중 유지<br/>
                        <label>
                            <input
                                type='radio'
                                value="체중 증량"
                                checked={selectedPurposeOption == "체중 증량"}
                                onChange={handleChangeRadioPurpose}
                            />
                        </label> 체중 증량(벌크업)
                    </InputBox>
                </InputBoxWrapper>
                <SearchButton className="search-button">
                    <FontAwesomeIcon icon={faSearch} />
                    작성 완료
                </SearchButton>
            </Board>
        </DashBoard>
    );
}

export default NutrientManagement;