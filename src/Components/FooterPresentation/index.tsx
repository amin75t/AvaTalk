/* eslint-disable @typescript-eslint/no-explicit-any */
import React , {useEffect, useState} from "react";
import { VoiceRecorder } from "symphony-ui";
import annyang from 'annyang';

interface FooterPresentationProps {
  theme?: string;
  onSendVector : (value: string) => void;
  isLoading: boolean
}
const FooterPresentation: React.FC<FooterPresentationProps> = ({ theme , onSendVector,isLoading}) => {
  const [mode,setMode] = useState<'profile'|'review'>('profile')
  const [isRecording,setIsRecording] = useState(false);
  const [resolvedText,setResolvedText] = useState('');
  const startSpeetchToText = () => {
    // setResolveText('')
    annyang.start({ autoRestart: true, continuous: false });
    setIsRecording(true)
    // console.log(annyang.isListening())
  }   
  const stopSpeetchToText = () => {
    annyang.abort()
    setIsRecording(false)
    // onSendVector(resolvedText)
  }  
  // send chat input
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  };
  const handleKeyPress = (event: any) => {
      // setIsTalking(false)
      if (event.key === "Enter" && inputValue.length > 0) {
          setInputValue('') 
          onSendVector(inputValue)
      }
  };  
  const handleSendClick = () => {
    // Call the callback function from the parent component with the input value
    if(onSendVector){
      onSendVector(inputValue);
    }

    // Clear the input field if needed
    setInputValue('');
  };
  useEffect(() => {
    if(annyang){
      annyang.addCallback('result', function (phrases: any[]) {
        setResolvedText(phrases[0])
        // console.log(phrases[0])
        // onSendVector(phrases[0])
      });        
    }

  })
  useEffect(() =>{
    if(resolvedText.length > 0){
      setTimeout(() => {
        onSendVector(resolvedText)
        setResolvedText('')
        setIsRecording(false)
        stopSpeetchToText()          
      }, 500);
    }
  })  
  return (
    <div className={`${theme}-FooterPresentation-Container`}>
      {
        mode == 'profile' ?
        <>
        <div onClick={() => {setMode('review')}} data-mode="profile-review-button" className={`${theme}-FooterPresentation-BackgroundItems ${theme}-FooterPresentation-VectorSection`}>
          <div className={`${theme}-FooterPresentation-Vectors ${theme}-FooterPresentation-MicVector`}></div>
        </div>
        <div className={`${theme}-FooterPresentation-BackgroundItems px-3 py-2`}>
          <input onKeyDown={handleKeyPress} className={`${theme}-FooterPresentation-Input`} value={inputValue}
            onChange={handleInputChange} placeholder="Message..." type="text" />
          <div className={`${theme}-FooterPresentation-Vectors ${theme}-FooterPresentation-SendVector`}
            onClick={handleSendClick}></div>
        </div>
        </>
        :
        <>
        <div onClick={() => {setMode('profile')}} data-mode="profile-profile-button" className={`${theme}-FooterPresentation-BackgroundItems ${theme}-FooterPresentation-VectorSection`}>
          <div className={`${theme}-FooterPresentation-Vectors ${theme}-FooterPresentation-KeyboardVector`}></div>
        </div>
        <div className={`${theme}-FooterPresentation-SectionSelected`}>
            <VoiceRecorder disabled={isLoading} theme="Carbon" isRecording={isRecording} isLoading={false} isTalking={false} onStart={() => {
              startSpeetchToText()
            }} 
            onStop={() => {
              stopSpeetchToText()
            }} onTalkingClick={() => {}}></VoiceRecorder>
        </div>
        </>
      }

    </div>
  );
};

export default FooterPresentation;