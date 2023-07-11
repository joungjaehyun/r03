import { useRef, useState } from "react";
import { postProduct } from "../api/productAPI";

const initState = {
    title:'',
    content: '',
    writer: '',
    images:[]
}



const ProductInput = () => {
    // document.getElementById 처럼 쓰고싶을때 사용
    const fileRef = useRef()

    const[board,setBoard] =useState({...initState})
    
    const handleChage = (e) =>{

        board[e.target.name] = e.target.value
        setBoard({...board})
    }
    const handleClickSave = (e) =>{

     const formData = new FormData();

     formData.append("title",board.title)
     formData.append("content",board.content)
     formData.append("writer",board.writer)

     console.dir(fileRef.current)
     
     const arr =fileRef.current.files

     for(let file of arr){
        formData.append("files",file)
     }
     
     postProduct(formData).then( e=>{
        alert('업로드 성공')
        setBoard({...initState})
     })

    }
    const handleClickClear = (e) =>{

        fileRef.current.value = ''
    }

    return (  
        <div>
            <h1>Input</h1>
            <div>
                <input type="text" name="title" value={board.title} onChange={handleChage}></input>
            </div>
            <div>
                <input type="text" name="content" value={board.content} onChange={handleChage}></input>
            </div>
            <div>
                <input type="text" name="writer" value={board.writer} onChange={handleChage} ></input>
            </div>
            {/* 첨부파일은 기존의 처리방식과 확연히 달라진다. 
                처리시에 ref를 처리한다.
                Form data만들어서 처리해주어야된다.
            */}
            <div>
                <input type="file" ref={fileRef} multiple name="images"  onChange={handleChage} ></input>
            </div>
            <div>
                <button onClick={handleClickSave}>SAVE</button>
                <button onClick={handleClickClear}>CLEARFILES</button>
            </div>

        </div>
    );
}
 
export default ProductInput;