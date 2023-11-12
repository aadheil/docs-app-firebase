import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { db } from './firebase-config';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import './App.css'

function Addtitle() {
  var total=""
  const[totals,settotals]=useState("")
  const [htmlString, setHtmlString] = useState("");
    const[idforedit,setidforedit]=useState()
    const[contentforedit,setcontentforedit]=useState()
    const [valueEditor, setValueEditor] = useState("");
    const[titleforedit,settitleforedit]=useState()
    const[editdiv,seteditdiv]=useState(false)
    const[alldoc,setalldoc]=useState([])
    const[title,settitle]=useState("")
    const[contentt,setcontentt]=useState("")
    const[saverefresher,setsaverefresher]=useState(1)
    const [show, setShow] = useState(false);
    const[indexforheight,setindexforheight]=useState()
    var indexx
    // const [code, setCode] = useState();

    // const handleProcedureContentChange = (content, delta, source, editor) => {
    //   setCode(content);
      
    // }



    function handleChange(content, delta, source, editor) {
      setValueEditor(editor.getContents()); //JSON do Quill
      var converter = new QuillDeltaToHtmlConverter(editor.getContents().ops, {});
      setHtmlString(converter.convert());
      
  }




    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const titleupdate=(e)=>{
     settitle(e)
    }
    const handlesave=()=>{
        if(title){
           handleClose()
           createtitle(title)
           settitle("")
           setsaverefresher(saverefresher+1)
           var lenofall=alldoc?.length
           setindexforheight(lenofall)
          //  setindexforheight(indexforheight+1)
        }
        else{
            alert("Please enter a valid title")
        }
    }
const userCollectionRef=collection(db, "docs")


const createtitle=async()=>{

    await addDoc(userCollectionRef,{title:title,content:""})

}

const oneditclick=(e)=>{
    setidforedit(e.id)
    settitleforedit(e.title)
    setcontentforedit(e.content)
    seteditdiv(true)
    setValueEditor(e.content)

    
    
}

const handlecloseeditdiv=()=>{
    seteditdiv(false)
    setidforedit()
    settitleforedit()
    setcontentforedit()
    setValueEditor("")
}

const justedit=async()=>{
    // var ido="6RHa9uNI2UXfqNHbfvyc"
  //  var ithanid= alldoc.filter((item=>{return item.id==idforedit}))
  
  var initia=""
      
  var leng=valueEditor.ops?.length
  for(var i=0;i<=leng-1;i++){
   
   initia=initia+valueEditor.ops[i].insert
   
   
   
  }
  total=initia
  // alert(total);
  // var con= contentforedit
  // var tit=titleforedit
  // var id=idforedit
  //  console.log(ithanid);
  //  alert(content)
  console.log(idforedit);
  var id=idforedit
  console.log(contentt);
  console.log(titleforedit);

  const alreadydoc=doc(db,"docs",id)
   const newField = {content:total}
   await updateDoc(alreadydoc,newField)
   setsaverefresher(saverefresher+1)
   seteditdiv(false)
  //  alert(code)
  //  console.log(alldoc[0]);
      //  valueEditor.ops.map((item=>{
      //   var i =item
      //   console.log(item);
      //  }))
      
}

const deleteacard=async(id)=>{
  seteditdiv(false)
  const alreadydoc=doc(db,"docs",id)
  await deleteDoc(alreadydoc)
  setsaverefresher(saverefresher+1)
  setindexforheight(indexforheight-1)



}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ size: [] }],
    [{ font: [] }],
    [{ align: ["right", "center", "justify"] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [{ color: ["red", "#785412"] }],
    [{ background: ["red", "#785412"] }]
  ]
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "color",
  "image",
  "background",
  "align",
  "size",
  "font"
];

    useEffect(()=>{

      const getdocs=async()=>{
        const data = await getDocs(userCollectionRef);
        setalldoc(data.docs.map((doc)=>({...doc.data(), id: doc.id})))
        

      }
      getdocs()

    },[saverefresher])
    useEffect(()=>{
      var lenofall=alldoc?.length
           setindexforheight(lenofall)
    })


  return (
    <>{!editdiv?
    <div className='d-flex flex-column justify-content-center ' style={{height:indexforheight>1?'100%':'100vh'}}>

        <div className='d-flex justify-content-center'>
        <button onClick={handleShow} className='btn btn-outline-danger ' style={{marginTop:'150px'}}><span>Add Notes</span><i className="fa-solid fa-plus ms-2"></i></button>
        </div>
       
     
        <Row className='mt-5 mb-5 ms-2 me-2  d-flex justify-content-center'>
     {alldoc.map((items,index)=>{
         return(
          
                 <Col className='mt-5 d-flex justify-content-center'  lg={3} md={4} sm={6} xs={12}>
                     <Card  className='crd shadow' style={{ width: '22rem',height:'350px' ,backgroundColor:'lightyellow'}}>
      <Card.Body>
        <Card.Title className="mb-2 text-center text-light" style={{fontSize:'35px'}}>{items.title}</Card.Title>
        <Card.Text className='cdtxt' style={{height:'200px',fontSize:'25px'}}>
          {items.content} 
          
        </Card.Text>
        
      </Card.Body>
      <div className='d-flex justify-content-evenly'>
        <button className='btn btn-outline-danger' onClick={(e)=>deleteacard(items.id)}>Delete</button>
        <button className='btn btn-outline-danger  '   onClick={(e)=>oneditclick({id:items.id,title:items.title,content:items.content})}>Edit</button>
        </div>
    </Card>
                 
                 </Col>
                 

                
         )
         
           
         
         
        })} 
         </Row>


    

        <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter a title for your document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input type="text" className='form-control' placeholder='Enter title' onChange={(e)=>titleupdate(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlesave}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>



    </div>
    :


<div className='w-100' style={{height:'100vh'}}>
    {/* <h2>{idforedit}</h2>
    <h2>{titleforedit}</h2>
    <h2>{contentforedit}</h2>
<input type="text" placeholder='enter content' onChange={(e)=>setcontentt(e.target.value)}/>
    <button className='btn btn-danger' onClick={handlecloseeditdiv}>Close</button>
    <button className='btn btn-warning' onClick={justedit}>Save Changes</button> */}
<div className='d-flex flex-column justify-content-center align-items-center w-100' style={{height:'100%'}} >
  
<div style={{marginTop:'-100px'}}>
<ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={valueEditor}
        onChange={handleChange}
     
      />
</div>
      

     <div style={{marginTop:'100px'}} >
      <div className='d-flex justify-content-between'>
     <button className='btn btn-outline-danger me-5 ' onClick={handlecloseeditdiv}>Discard</button>
    <button className='btn btn-outline-success ms-5' onClick={justedit}>Save</button>
    </div>
     </div>
      </div>

    {/* {code} */}
</div>
     }
     {indexforheight==1&&<div style={{height:'100px'}}></div>}
     {indexforheight==2&&<div style={{height:'100px'}}></div>}
     {indexforheight==3&&<div style={{height:'100px'}}></div>}
     {indexforheight==4&&<div style={{height:'100px'}}></div>}
    
    </>
  )
}

export default Addtitle