import { useEffect } from "react";
import ProgressBar from "./ProgressBar";

export default function DeleteConfirmation({onConfirm,onCancel}){

/**Bileşen yüklendiğinde useEffect içinde setTimeout ile 3 saniyelik bir zamanlayıcı başlatılır.
 *  Bu süre dolduğunda onConfirm fonksiyonu otomatik olarak çalışır ve silme işlemi onaylanır. */
/**
 *  Eğer kullanıcı onCancel butonuna basarak modalı kapatırsa, return ile dönen temizleme fonksiyonu
 *  çalışır ve clearTimeout kullanılarak zamanlayıcı iptal edilir.
 */
    useEffect(()=>{
        console.log('TIMER SET');
      const timer=  setTimeout(()=>{
        onConfirm();//3sn sonra onConfirm() çağrılır
           },3000)

           return ()=>{//useeffect bir temizleme fonksiyonu döndürür,bu fonksiyon useEffect tekrar çalışmadan önce çalışır
            console.log('Cleaning up timer')
            clearTimeout(timer)
           }
    },[onConfirm])//onConfirm fonksiyonu değiştiğinde useEffect'in tekrar çalışmasını sağlar
    
    return(
        <div id="delete-confirmation">
             <h2>Are you sure?</h2>
             <p>Do you really want to remove this place?</p>
             <div id="confirmation-actions">
                <button onClick={onCancel} className="button-text">No</button>
                <button onClick={onConfirm} className="button">Yes</button>
             </div>
              <ProgressBar/>
        </div>
    )
}