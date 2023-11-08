import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { db } from './firebase-config';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

function Addtitle() {
    const[alldoc,setalldoc]=useState([])
    const[title,settitle]=useState("")
    const[content,setcontent]=useState("")

    const [show, setShow] = useState(false);

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
        }
        else{
            alert("Please enter a valid title")
        }
    }
const userCollectionRef=collection(db, "docs")


const createtitle=async()=>{

    await addDoc(userCollectionRef,{title:title,content:""})

}

    useEffect(()=>{

      const getdocs=async()=>{
        const data = await getDocs(userCollectionRef);
        setalldoc(data.docs.map((doc)=>({...doc.data(), id: doc.id})))
        

      }
      getdocs()

    },[])


  return (
    <div className='d-flex flex-column justify-content-center' >

        <div className='d-flex justify-content-center'>
        <button onClick={handleShow} className='btn btn-light ' style={{marginTop:'150px'}}><span>Add Docs</span><i className="fa-solid fa-plus ms-2"></i></button>
        </div>
       
     
        <Row className='mt-5 mb-5 ms-2 me-2'>
     {alldoc.map((items)=>{
         return(
          
                 <Col className='mt-5 d-flex justify-content-center'  lg={3} md={4} sm={6} xs={12}>
                     <Card className='bg-transparent shadow border rounded' style={{ width: '22rem',height:'350px' }}>
      <Card.Body>
        <Card.Title className="mb-2 text-center text-light">{items.title}</Card.Title>
        <Card.Text className=' ' style={{height:'200px'}}>
          {items.content} 
        </Card.Text>
        <div className='d-flex justify-content-evenly'>
        <button className='btn btn-danger'>Delete</button>
        <button className='btn btn-primary '>Edit</button>
        </div>
      </Card.Body>
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
  )
}

export default Addtitle