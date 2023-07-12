import { useRef, useState } from "react";
import { postProduct } from "../api/productAPI";

const initState = {
    pname:'',
    pdesc: '',
    price: 0
 
}



const ProductInput = () => {
    // document.getElementById 처럼 쓰고싶을때 사용
    const fileRef = useRef()

    const[product,setProduct] =useState({...initState})
    
    const handleChage = (e) =>{

        product[e.target.name] = e.target.value
        setProduct({...product})
    }
    const handleClickSave = (e) =>{

     const formData = new FormData();

     formData.append("pname",product.pname)
     formData.append("pdesc",product.pdesc)
     formData.append("price",product.price)

     console.dir(fileRef.current)
     
     const arr =fileRef.current.files

     for(let file of arr){
        formData.append("files",file)
     }
     
     postProduct(formData).then( e=>{

        setProduct({...initState})
     })

    }
    const handleClickClear = (e) =>{

        fileRef.current.value = ''
    }

    return (  
        <div>
            <h1>Input</h1>
            <div>
                <input type="text" name="pname" value={product.pname} onChange={handleChage}></input>
            </div>
            <div>
                <input type="text" name="pdesc" value={product.pdesc} onChange={handleChage}></input>
            </div>
            <div>
                <input type="number" name="price" value={product.price} onChange={handleChage} ></input>
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