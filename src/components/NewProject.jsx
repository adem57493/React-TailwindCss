// NewProject.js içinde
import { useRef } from "react";
export default function NewProject({ onAdd, onCancel }) {
    const titleRef = useRef();
    const contentRef = useRef();
  
    function handleSave() {
      const enteredTitle = titleRef.current.value;
      const enteredContent = contentRef.current.value;
  
      if (!enteredTitle.trim() || !enteredContent.trim()) {
        alert("Lütfen tüm alanları doldurun.");
        return;
      }
  
      onAdd({ title: enteredTitle, content: enteredContent });
    }
  
    return (
      <div  className="border-2 border-[#0d373e] p-2 rounded-md flex flex-col gap-1 my-4">
        <input className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600" ref={titleRef} placeholder="Makale Başlığı" />
        <textarea className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600" ref={contentRef} placeholder="Makale İçeriği"></textarea>
        <button className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700
         text-stone-400 hover:bg-stone-600 hover:text-stone-100" onClick={handleSave}>Add</button>
        <button className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700
         text-stone-400 hover:bg-stone-600 hover:text-stone-100" onClick={onCancel}>Cancel</button>
      </div>
    );
  }
  