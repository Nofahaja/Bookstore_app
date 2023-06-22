import React,{useState,useEffect} from 'react'
import "./Home.css"
import axios from 'axios'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,

    bgcolor: '#111',
    border: '2px solid #000',
    boxShadow: 24,
    
    
    
    
   
    p: 4,
  };



export default function Home() {
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

const [state,setState]=useState([])
const [search,setSearch]=useState([])
const [newbook,setNewbook]=useState([])
const [Favourite,setFavourite]=useState(JSON.parse(localStorage.getItem('Favourite')) || []);

const Register=()=>{
    setFavourite([...Favourite,{...state}])
     
  }
  
useEffect(()=>{
    localStorage.setItem('Favourite',JSON.stringify(Favourite))
    },[Favourite])
    

    const Search=(e)=>{
        e.preventDefault();
        const {name,value}=e.target
              setState({
                  ...state,
                  [name]:value
        })
           
       
      }

      const booklist=()=>{
        axios.get(`https://api.itbook.store/1.0/search/${state.value}`).then(response=>{
            console.log("response", response.data.books);
            setSearch(response.data.books);
        
          })}
          

useEffect(() => {
  axios.get(`https://api.itbook.store/1.0/new`).then(response => {
    console.log("response=>", response.data.books);
    setNewbook(response.data.books)
  })

}, [])
console.log(newbook);


        
  return (
    <div>
       <div className='banner'>

<div className='ban'>
<img className='bookban' src='https://assets.weforum.org/article/image/6apR635BgdZXA-aVn2gjC3icxV9qr8W2Xxg5HOnWN_A.jpg' alt=''></img>
<div className='write'>
<p className='quo'><b>"A Reader lives a thousand lives before he dies...The man who never reads lives only one!!!"</b> </p>
</div>
<div>
  <link href="https://fonts.googleapis.com/css2?family=Pangolin&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap" rel="stylesheet" />
  
  <div className="search">
    <input className="search-txt" type="text" name="value" placeholder="Find Your Books" onChange={Search} />
    <a className="search-btn" href="#">
      <i className="fas fa-search" onClick={()=>{{handleOpen();booklist()}}} />
    </a>
  </div>
</div>
</div>
</div> 
<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div class="card-deck" style={{overflowY:'scroll',height:"80vh"}}>
{search.map((books)=>(
  <div class="card8">
    <img src={books.image} class="card-img-top" alt="..."/>
    <div class=">card-body8">
    <p class="card-title1" ><span className='rty'><b>ISBN:</b> </span>{books.isbn13}</p>
    <p class="card-title1" ><span className='rty'> <b>Price:</b></span> {books.price}</p>

      <p class="card-title1"><span className='rty'><b>Subtitle:</b> </span>{books.subtitle}</p>

      <p class="card-title1"><span className='rty'><b>Title:</b> </span>{books.title}</p>  
      <button className='butnew' onClick={Register}>Add Book</button>
</div>
  
  </div>

  ))}
  </div>
  </Typography>
        </Box> 
       </Modal>
       <section className="articles">
        {/* <p className='hed'>New Books</p> */}
       {newbook.map((New)=>(

      
       <article>
    <div className="article-wrapper">
      <figure>
        <img src={New.image} alt />
      </figure>
      <div className="article-body">
        <p><b>Title: </b>{New.title}</p>
        <p>
         <b> Subtitle:</b>{New.subtitle}
        </p>
        <p>
        <b> Price:</b>{New.subtitle}

        </p>
        <p>
        <b> Isbn:</b>{New.isbn13}

        </p>
      </div>
    </div>
  </article>
    ))}
  </section>
    </div>
  )
}
