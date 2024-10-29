import { useState,useEffect } from "react"

export default function ProgressBar(){
//remainingTime=kalan süre
    const [remainigTime,setRemainigTime]=useState(3000)

    useEffect(()=>{
       const interval= setInterval(()=>{
            console.log('INTERVAL')
            setRemainigTime(prevTime=>prevTime-10)
        },10)
    
        return ()=>{
         clearInterval(interval)
        }
    },[])
    
    return(

        <progress value={remainigTime} max={3000}/>//başlangıçta 3000/3000 dolu
    )
}
/**
 * setInterval gibi bir zamanlayıcı kullanırken, bileşen kaldırıldığında veya yeniden render edildiğinde bu zamanlayıcının temizlenmesi gerekir. useEffect ile
 * , bileşen DOM’dan kaldırıldığında clearInterval kullanarak bu zamanlayıcıyı temizleyebiliriz.
 * []=sayaç başlangıcını yalnızca bir kez başlatıyor ve bileşen kaldırıldığında bu zamanlayıcıyı temizliyoruz.
 */