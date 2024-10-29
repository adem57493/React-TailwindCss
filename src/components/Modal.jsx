import { useRef ,useEffect} from "react";
import {createPortal} from 'react-dom';

 function Modal({open,children,onClose}){

    const dialog=useRef();

    useEffect(()=>{
        if(open){
            dialog.current.showModal()
          }
          else{
            dialog.current.close()
          }
    },[open])
    /**
     * useEffect'in [open] bağımlılık dizisi, open prop’u her değiştiğinde bu efektin
     *  yeniden çalışmasını sağlar. Böylece open true olduğunda modal açılır, false olduğunda kapanır
     */
 /**
  * useEffect'in bağımlılık dizisi boş ([]) olduğunda, bu efekt yalnızca bileşen ilk render
  *  edildiğinde çalışır ve sonrasında bir daha çalışmaz.
  */

    return createPortal(
        <dialog className="modal" ref={dialog} onClose={onClose} >
           {children}
        </dialog>,
        document.getElementById('modal')
    )
 


    
}
export default Modal;